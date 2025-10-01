import { connectDB } from "../../database/db";

export class ItemRepository {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL = 2 * 60 * 1000; 

  static async getAll(rank: string) {
    const cacheKey = `items:${rank}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    try {
      const db = await connectDB();
      const itemsCollection = db.db("SET15").collection("items");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const isAllRanks = rank === "all";
      const projection = isAllRanks 
        ? { itemId: 1, totalGames: 1, wins: 1, winrate: 1, averagePlacement: 1 }
        : { 
            itemId: 1, 
            [`ranks.${rank}`]: 1 
          };

      const [itemsDocs, totalGamesDoc] = await Promise.all([
        itemsCollection.find({}, { projection }).toArray(),
        totalGamesCollection.findOne({ id: "totalGames" }, { projection: { count: 1 } })
      ]);

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

      const sortedItemRanking = itemsData.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      const result = { 
        totalGames: totalGamesDoc?.count || 0, 
        itemData: sortedItemRanking 
      };

      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });

      return result;
    } catch (error) {
      console.error("Error fetching item data from DB:", error);
      return { itemData: [], totalGames: 0 };
    }
  }

  static async updateMany(rank: string, itemRanking: any[]) {
    try {
      this.cache.clear();
      
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
    const existingItem = await collection.findOne(
      { itemId: item.itemId },
      { 
        projection: { 
          itemId: 1, 
          totalGames: 1, 
          wins: 1, 
          averagePlacement: 1,
          ranks: 1 
        } 
      }
    );

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

  static async getByItemIds(itemIds: string[], rank: string) {
    try {
      const db = await connectDB();
      const itemsCollection = db.db("SET15").collection("items");

 
      const itemDocs = await itemsCollection
        .find(
          { itemId: { $in: itemIds } }, 
          { 
            projection: { 
              itemId: 1, 
              totalGames: 1, 
              wins: 1, 
              winrate: 1, 
              averagePlacement: 1,
              [`ranks.${rank}`]: 1
            } 
          }
        )
        .toArray();

      return { itemData: itemDocs };
    } catch (error) {
      console.error("Error fetching specific items:", error);
      return { itemData: [] };
    }
  }

  static async getTopPerformers(rank: string, limit: number = 10) {
    try {
      const db = await connectDB();
      const itemsCollection = db.db("SET15").collection("items");

      const isAllRanks = rank === "all";
      
      if (isAllRanks) {
        const topItems = await itemsCollection
          .find(
            { averagePlacement: { $exists: true, $gt: 0 } },
            { 
              projection: { 
                itemId: 1, 
                averagePlacement: 1, 
                winrate: 1, 
                totalGames: 1
              } 
            }
          )
          .sort({ averagePlacement: 1 }) 
          .limit(limit)
          .toArray();

        return { itemData: topItems };
      } else {
        const topItems = await itemsCollection
          .aggregate([
            { $match: { [`ranks.${rank}`]: { $exists: true } } },
            { 
              $project: {
                itemId: 1,
                rankStats: `$ranks.${rank}`,
                averagePlacement: `$ranks.${rank}.averagePlacement`
              }
            },
            { $match: { averagePlacement: { $gt: 0 } } },
            { $sort: { averagePlacement: 1 } },
            { $limit: limit }
          ])
          .toArray();

        return { itemData: topItems };
      }
    } catch (error) {
      console.error("Error fetching top performing items:", error);
      return { itemData: [] };
    }
  }

  static clearCache() {
    this.cache.clear();
    console.log("Item cache cleared");
  }
}