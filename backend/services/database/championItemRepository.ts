import { connectDB } from "../../database/db";

export class ChampionItemRepository {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL = 2 * 60 * 1000; 

  static async getAll(rank: string) {
    const cacheKey = `championItems:${rank}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      console.log("Returning cached data for", cacheKey);
      return cached.data;
    }

    try {
      const db = await connectDB();
      const championItemCollection = db.db("SET15").collection("championItems");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      
      const isAllRanks = rank === "all";
      const projection = isAllRanks 
        ? { championId: 1, items: 1, BIS: 1 }
        : { 
            championId: 1, 
            items: 1, 
            [`rankBIS.${rank.toLowerCase()}BIS`]: 1 
          };

      const [championItemDocs, totalGamesDoc] = await Promise.all([
        championItemCollection.find({}, { projection }).toArray(),
        totalGamesCollection.findOne({ id: "totalGames" }, { projection: { count: 1 } })
      ]);

      const totalGames = totalGamesDoc?.count || 0;

      const championData = championItemDocs.map((champion) => {
        const rankBIS = rank + "BIS";

        return {
          championId: champion.championId,
          ...(isAllRanks && { BIS: champion.BIS }),
          ...(!isAllRanks && { [rankBIS]: champion?.rankBIS?.[rankBIS] }),
          items: champion.items?.map((item: any) => {
            if (!isAllRanks) {
              const rankStats = item.ranks?.[rank];
              return {
                itemId: item.itemId,
                stats: rankStats || {
                  wins: 0,
                  totalGames: 0,
                  winrate: 0,
                  averagePlacement: 0,
                },
              };
            }

            // For "all" ranks, return both global stats and rank distribution
            return {
              itemId: item.itemId,
              wins: item.wins,
              totalGames: item.totalGames,
              winrate: item.winrate,
              averagePlacement: item.averagePlacement,
              ranks: item.ranks || {},
            };
          }),
        };
      });

      const result = { championData };
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });

      return result;
    } catch (error) {
      console.error("Error fetching champion items:", error);
      return { championData: [], totalGames: 0 };
    }
  }

  static async updateMany(rank: string, championRanking: any[]) {
    try {
      // Clear cache when updating
      this.cache.clear();
      
      const db = await connectDB();
      const championItemCollection = db.db("SET15").collection("championItems");

      let updatedChampionItems: any[] = [];
      await Promise.all(
        championRanking.map(async (champion) => {
          const { championId, items } = await this.updateSingleItem(
            championItemCollection,
            rank,
            champion
          );
          updatedChampionItems.push({ championId, items });
        })
      );

      const totalGamesProcessed = championRanking.reduce(
        (sum, champion) =>
          sum +
          (champion.items?.reduce(
            (itemSum: number, item: any) => itemSum + (item.totalGames || 0),
            0
          ) || 0),
        0
      );

      const BISItems = await this.calculateBISItems(updatedChampionItems);

      // Update BIS items for each champion
      await Promise.all(
        updatedChampionItems.map((champion) =>
          this.updateBISItems(championItemCollection, champion.championId, BISItems, rank)
        )
      );
      await this.updateTotalGamesCount(db, totalGamesProcessed);

      const sortedUpdatedItems = updatedChampionItems.sort((a, b) => {
        const aItems = a.items || [];
        const bItems = b.items || [];

        const aAvgPlacement =
          aItems.reduce((sum: number, item: any) => sum + (item.averagePlacement || 0), 0) /
          (aItems.length || 1);
        const bAvgPlacement =
          bItems.reduce((sum: number, item: any) => sum + (item.averagePlacement || 0), 0) /
          (bItems.length || 1);

        return aAvgPlacement - bAvgPlacement;
      });

      return { updatedChampionItems: sortedUpdatedItems, totalGames: totalGamesProcessed };
    } catch (error) {
      console.error("Error updating champion items:", error);
      return { updatedChampionItems: [], totalGames: 0 };
    }
  }

  private static async updateSingleItem(collection: any, rank: string, champion: any) {
    // This query uses the championId index
    const existingChampion = await collection.findOne(
      { championId: champion.championId },
      { projection: { championId: 1, items: 1 } } // Only fetch needed fields
    );

    const updatedItems = await Promise.all(
      (champion?.items ?? []).map(async (item: any) => {
        const existingItem = existingChampion?.items?.find((i: any) => i.itemId === item.itemId);

        const globalStats = this.calculateGlobalStats(existingItem, item);
        const rankStats = this.calculateRankStats(existingItem, item, rank);

        if (!existingChampion) {
          // This uses the championId index for upsert
          await collection.updateOne(
            { championId: champion.championId },
            {
              $set: {
                championId: champion.championId,
                items: [
                  {
                    itemId: item.itemId,
                    ...globalStats,
                    ranks: { [rank]: rankStats },
                  },
                ],
              },
            },
            { upsert: true }
          );
        } else if (!existingItem) {
          // This uses the championId index
          await collection.updateOne(
            { championId: champion.championId },
            {
              $push: {
                items: {
                  itemId: item.itemId,
                  ...globalStats,
                  ranks: { [rank]: rankStats },
                },
              },
            }
          );
        } else {
          // This uses both championId and items.itemId indexes
          await collection.updateOne(
            { championId: champion.championId, "items.itemId": item.itemId },
            {
              $set: {
                "items.$.wins": globalStats.wins,
                "items.$.totalGames": globalStats.totalGames,
                "items.$.winrate": globalStats.winrate,
                "items.$.averagePlacement": globalStats.averagePlacement,
                [`items.$.ranks.${rank}`]: rankStats,
              },
            }
          );
        }

        return { itemId: item.itemId, ...globalStats };
      })
    );

    return { championId: champion.championId, items: updatedItems };
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

    return { totalGames, wins, winrate, averagePlacement };
  }

  private static calculateRankStats(existingItem: any, newItem: any, rank: string) {
    const prevRankStats = {
      wins: existingItem?.ranks?.[rank]?.wins || 0,
      totalGames: existingItem?.ranks?.[rank]?.totalGames || 0,
      averagePlacement: existingItem?.ranks?.[rank]?.averagePlacement || 0,
    };

    const winsRank = prevRankStats.wins + (newItem.wins || 0);
    const totalGamesRank = prevRankStats.totalGames + (newItem.totalGames || 0);

    const averagePlacementRank =
      totalGamesRank > 0
        ? Number(
            (
              ((newItem.placement ?? newItem.averagePlacement ?? 0) * (newItem.totalGames || 0) +
                prevRankStats.averagePlacement * prevRankStats.totalGames) /
              totalGamesRank
            ).toFixed(2)
          )
        : 0;

    const winrateRank =
      totalGamesRank > 0 ? Number(((winsRank / totalGamesRank) * 100).toFixed(2)) : 0;

    return {
      totalGames: totalGamesRank,
      wins: winsRank,
      winrate: winrateRank,
      averagePlacement: averagePlacementRank,
    };
  }

  // BIS is "Best In Slot", a term used in TFT to mean best items to place on a champion
  private static async calculateBISItems(updatedChampionItems: any[]) {
    const bisMap = new Map();

    updatedChampionItems.forEach((champion) => {
      const topItems = champion.items
        .sort((a: any, b: any) => Number(a.averagePlacement) - Number(b.averagePlacement))
        .slice(0, 6); 

      bisMap.set(champion.championId, topItems);
    });

    return bisMap;
  }

  private static async updateBISItems(
    collection: any,
    championId: string,
    bisMap: Map<string, any[]>,
    rank: string
  ) {
    const championBIS = bisMap.get(championId) || [];

    const update = {
      BIS: championBIS,
      [`${rank.toLowerCase()}BIS`]: championBIS, 
    };

    await collection.updateOne({ championId }, { $set: update });
  }

  private static async updateTotalGamesCount(db: any, increment: number) {
    const totalGamesCollection = db.db("SET15").collection("totalGames");

    await totalGamesCollection.updateOne(
      { id: "totalGames" },
      { $inc: { count: increment } },
      { upsert: true }
    );
  }


  static async getByChampionIds(championIds: string[], rank: string) {
    try {
      const db = await connectDB();
      const championItemCollection = db.db("SET15").collection("championItems");

      const championItemDocs = await championItemCollection
        .find(
          { championId: { $in: championIds } }, 
          { 
            projection: { 
              championId: 1, 
              items: 1, 
              BIS: 1,
              [`${rank.toLowerCase()}BIS`]: 1
            } 
          }
        )
        .toArray();

      return { championData: championItemDocs };
    } catch (error) {
      console.error("Error fetching specific champions:", error);
      return { championData: [] };
    }
  }

  static clearCache() {
    this.cache.clear();
    console.log("Cache cleared");
  }
}