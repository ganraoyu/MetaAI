import { connectDB } from "../../database/db";

export class ItemRepository {
  static async getAll(rank: string) {
    try {
      const db = await connectDB();

      const itemsCollection = db.db("SET15").collection("items");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const itemsDocs = await itemsCollection.find().toArray();
      let itemsData;

      if (rank !== "all") {
        itemsData = itemsDocs.map((item) => ({
          itemId: item.itemId,
          ...(item.ranks?.[rank] || {
            totalGames: 0,
            wins: 0,
            winrate: 0,
            averagePlacement: 0,
          }),
        }));
      } else {
        itemsData = itemsDocs;
      }

      const totalGamesDoc = await totalGamesCollection.findOne({ id: "totalGames" });

      const sortedItemRanking = itemsData.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      return { totalGames: totalGamesDoc?.count || 0, itemData: sortedItemRanking };
    } catch (error) {
      console.error("Error fetching item data from DB:", error);
      return { itemData: [], totalGames: 0 };
    }
  }

  static async updateMany(rank: string, itemRanking: any[]) {
    try {
      const db = await connectDB();
      const itemsCollection = db.db("SET15").collection("items");

      const updatedItems = await Promise.all(
        itemRanking.map((item) => this.updateSingleItem(itemsCollection, rank, item))
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
    } catch (error: any) {
      console.error("Error updating items:", error);
      return { updatedItems: [], totalGames: 0 };
    }
  }

  private static async updateSingleItem(collection: any, rank: string, item: any) {
    const existingItem = await collection.findOne({ itemId: item.itemId });

    const globalStats = this.calculateGlobalStats(existingItem, item);
    const rankStats = this.calculateRankStats(existingItem, item, rank);

    await collection.updateOne(
      { itemId: item.itemId },
      {
        $set: {
          itemId: item.itemId,
          ...globalStats,
          [`ranks.${rank}`]: rankStats,
        },
      },
      { upsert: true }
    );

    console.log(`Updated stats for item ${item.itemId}`);
    return { itemId: item.itemId, ...globalStats };
  }

  private static calculateGlobalStats(existingItem: any, newItem: any) {
    const prevStats = {
      wins: existingItem?.wins || 0,
      totalGames: existingItem?.totalGames || 0,
      averagePlacement: existingItem?.averagePlacement || 0,
    };

    const wins = prevStats.wins + (newItem.wins || 0);
    const totalGames = prevStats.totalGames + (newItem.totalGames || 0);

    const averagePlacement =
      totalGames > 0
        ? Number(
            (
              ((newItem.placement ?? newItem.averagePlacement ?? 0) * (newItem.totalGames || 0) +
                prevStats.averagePlacement * prevStats.totalGames) /
              totalGames
            ).toFixed(2)
          )
        : 0;

    const winrate = totalGames > 0 ? Number(((wins / totalGames) * 100).toFixed(2)) : 0;

    return { wins, winrate, averagePlacement, totalGames };
  }

  private static calculateRankStats(existingItem: any, newItem: any, rank: string) {
    const prevStats = {
      wins: existingItem?.ranks?.[rank]?.wins || 0,
      totalGames: existingItem?.ranks?.[rank]?.totalGames || 0,
      averagePlacement: existingItem?.ranks?.[rank]?.averagePlacement || 0,
    };

    const wins = prevStats.wins + (newItem.wins || 0);
    const totalGames = prevStats.totalGames + (newItem.totalGames || 0);

    const averagePlacement =
      totalGames > 0
        ? Number(
            (
              ((newItem.placement ?? newItem.averagePlacement ?? 0) * (newItem.totalGames || 0) +
                prevStats.averagePlacement * prevStats.totalGames) /
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
}
