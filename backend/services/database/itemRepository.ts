import { connectDB } from "../../database/db";

export class ItemRepository {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL = 2 * 60 * 1000;

  static async getAll(ranks: string[]) {
    const cacheKey = `items:${ranks.join(",")}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) return cached.data;

    try {
      const db = await connectDB();
      const itemsCollection = db.db("SET15").collection("items");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const projection: any = {
        itemId: 1,
        totalGames: 1,
        wins: 1,
        winrate: 1,
        averagePlacement: 1,
      };
      ranks.forEach((rank) => (projection[`ranks.${rank}`] = 1));

      const [itemsDocs, totalGamesDoc] = await Promise.all([
        itemsCollection.find({}, { projection }).toArray(),
        totalGamesCollection.findOne({ id: "totalGames" }, { projection: { count: 1 } }),
      ]);

      const itemsData = itemsDocs.map((item) => {
        const rankData: Record<string, any> = {};
        ranks.forEach((rank) => {
          rankData[rank] = item.ranks?.[rank] || {
            totalGames: 0,
            wins: 0,
            winrate: 0,
            averagePlacement: 0,
          };
        });
        return { itemId: item.itemId, ...rankData };
      });

      const sortedItemRanking = itemsData.sort((a, b) => {
        const aAvgPlacement =
          ranks.length > 0 ? Number((a as any)[ranks[0]]?.averagePlacement || 0) : 0;
        const bAvgPlacement =
          ranks.length > 0 ? Number((b as any)[ranks[0]]?.averagePlacement || 0) : 0;
        return aAvgPlacement - bAvgPlacement;
      });

      const result = { totalGames: totalGamesDoc?.count || 0, itemData: sortedItemRanking };
      this.cache.set(cacheKey, { data: result, timestamp: Date.now() });

      return result;
    } catch (error) {
      console.error("Error fetching item data from DB:", error);
      return { itemData: [], totalGames: 0 };
    }
  }

  static async updateMany(ranks: string[], itemRanking: any[]) {
    try {
      this.cache.clear();
      const db = await connectDB();
      const itemsCollection = db.db("SET15").collection("items");

      const updatedItems = await Promise.all(
        itemRanking.map((item) =>
          Promise.all(ranks.map((rank) => this.updateSingleItem(itemsCollection, rank, item))).then(
            () => item
          )
        )
      );

      const totalGamesProcessed = itemRanking.reduce(
        (sum, item) => sum + (item.totalGames || 0),
        0
      );
      await this.updateTotalGamesCount(db, totalGamesProcessed);

      const sortedUpdatedItems = updatedItems.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      return { updatedItems: sortedUpdatedItems, totalGames: totalGamesProcessed };
    } catch (error) {
      console.error("Error updating items:", error);
      return { updatedItems: [], totalGames: 0 };
    }
  }

  private static async updateSingleItem(collection: any, rank: string, item: any) {
    const existingItem = await collection.findOne(
      { itemId: item.itemId },
      { projection: { itemId: 1, totalGames: 1, wins: 1, averagePlacement: 1, ranks: 1 } }
    );

    const globalStats = this.calculateGlobalStats(existingItem, item);
    const rankStats = this.calculateRankStats(existingItem, item, rank);

    await collection.updateOne(
      { itemId: item.itemId },
      { $set: { itemId: item.itemId, ...globalStats, [`ranks.${rank}`]: rankStats } },
      { upsert: true }
    );

    console.log(`Updated stats for item ${item.itemId} (rank: ${rank})`);
    return { itemId: item.itemId, ...globalStats };
  }

  private static calculateGlobalStats(existingItem: any, newItem: any) {
    const wins = (existingItem?.wins || 0) + (newItem.wins || 0);
    const totalGames = (existingItem?.totalGames || 0) + (newItem.totalGames || 0);

    const averagePlacement =
      totalGames > 0
        ? Number(
            (
              ((newItem.placement ?? newItem.averagePlacement ?? 0) * (newItem.totalGames || 0) +
                (existingItem?.averagePlacement || 0) * (existingItem?.totalGames || 0)) /
              totalGames
            ).toFixed(2)
          )
        : 0;

    const winrate = totalGames > 0 ? Number(((wins / totalGames) * 100).toFixed(2)) : 0;
    return { wins, winrate, averagePlacement, totalGames };
  }

  private static calculateRankStats(existingItem: any, newItem: any, rank: string) {
    const prev = existingItem?.ranks?.[rank] || { wins: 0, totalGames: 0, averagePlacement: 0 };
    const wins = prev.wins + (newItem.wins || 0);
    const totalGames = prev.totalGames + (newItem.totalGames || 0);

    const averagePlacement =
      totalGames > 0
        ? Number(
            (
              ((newItem.placement ?? newItem.averagePlacement ?? 0) * (newItem.totalGames || 0) +
                prev.averagePlacement * prev.totalGames) /
              totalGames
            ).toFixed(2)
          )
        : 0;

    const winrate = totalGames > 0 ? Number(((wins / totalGames) * 100).toFixed(2)) : 0;
    return { wins, winrate, averagePlacement, totalGames };
  }

  private static async updateTotalGamesCount(db: any, increment: number) {
    const totalGamesCollection = db.db("SET15").collection("totalGames");
    await totalGamesCollection.updateOne(
      { id: "totalGames" },
      { $inc: { count: increment } },
      { upsert: true }
    );
  }

  static clearCache() {
    this.cache.clear();
    console.log("Item cache cleared");
  }
}
