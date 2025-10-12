import { connectDB } from "../../database/db";

export class ChampionItemRepository {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL = 2 * 60 * 1000;

  static async getAll(ranks: string[]) {
    const cacheKey = `championItems:${ranks.join(",")}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      console.log("Returning cached data for", cacheKey);
      return cached.data;
    }

    try {
      const db = await connectDB();
      const championItemCollection = db.db("SET15").collection("championItems");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const projection: any = { championId: 1, items: 1, BIS: 1 };
      ranks.forEach((rank) => (projection[`${rank.toLowerCase()}BIS`] = 1));

      const [championItemDocs, totalGamesDoc] = await Promise.all([
        championItemCollection.find({}, { projection }).toArray(),
        totalGamesCollection.findOne({ id: "totalGames" }, { projection: { count: 1 } }),
      ]);

      const totalGames = totalGamesDoc?.count || 0;

      const championData: any[] = championItemDocs.map((champion) => {
        if (!ranks.includes("all")) {
          // Create rank-specific BIS data
          const rankBISData: Record<string, any> = {};
          ranks.forEach((rank) => {
            const rankBIS = `${rank.toLowerCase()}BIS`;
            rankBISData[rankBIS] = champion?.[rankBIS];
          });

          const specifiedRankTotals = Object.values(rankBISData).reduce(
            (acc: any, bisArray: any) => {
              if (Array.isArray(bisArray)) {
                bisArray.forEach((item: any) => {
                  if (!item) return;

                  if (!acc[item.itemId]) {
                    acc[item.itemId] = {
                      itemId: item.itemId,
                      wins: 0,
                      totalGames: 0,
                      totalPlacement: 0,
                    };
                  }
                  acc[item.itemId].wins += item.wins ?? 0;
                  acc[item.itemId].totalGames += item.totalGames ?? 0;
                  acc[item.itemId].totalPlacement +=
                    (item.averagePlacement ?? 0) * (item.totalGames ?? 0);
                });
              }
              return acc;
            },
            {}
          );

          for (const item of Object.values(specifiedRankTotals) as any[]) {
            item.winrate = item.totalGames ? ((item.wins / item.totalGames) * 100).toFixed(2) : 0;
            item.averagePlacement = item.totalGames
              ? (item.totalPlacement / item.totalGames).toFixed(2)
              : 0;
          }

          return {
            championId: champion.championId,
            ...(ranks.includes("all") && { BIS: champion.BIS }),
            ...rankBISData,
            rankBISTotal: Object.values(specifiedRankTotals).slice(0, 6),
            items: champion.items?.map((item: any) => ({
              itemId: item.itemId,
              ranks: item.ranks,
              wins: item.wins,
              totalGames: item.totalGames,
              winrate: item.winrate,
              averagePlacement: item.averagePlacement,
            })),
          };
        } else {
          return {
            championId: champion.championId,
            BIS: champion.BIS,
            items: champion.items,
          };
        }
      });

      const result = { championData };
      this.cache.set(cacheKey, { data: result, timestamp: Date.now() });

      return result;
    } catch (error) {
      console.error("Error fetching champion items:", error);
      return { championData: [], totalGames: 0 };
    }
  }

  static async updateMany(ranks: string[], championRanking: any[]) {
    try {
      this.cache.clear();
      const db = await connectDB();
      const championItemCollection = db.db("SET15").collection("championItems");

      let updatedChampionItems: any[] = [];
      await Promise.all(
        championRanking.map(async (champion) => {
          for (const rank of ranks) {
            await this.updateSingleItem(championItemCollection, rank, champion);
          }
          updatedChampionItems.push(champion);
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

      const BISItems = await this.calculateBISItems(championItemCollection, updatedChampionItems);

      // Update BIS items for each champion and each rank
      await Promise.all(
        updatedChampionItems.map((champion) =>
          Promise.all(
            ranks.map((rank) =>
              this.updateBISItems(championItemCollection, champion.championId, BISItems, rank)
            )
          )
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
    const existingChampion = await collection.findOne(
      { championId: champion.championId },
      { projection: { championId: 1, items: 1 } }
    );

    // Ensure only valid items and capitalize itemId
    const existingItems = (existingChampion?.items || [])
      .filter((item: any) => item && item.itemId)
      .map((item: any) => ({
        ...item,
        itemId: item.itemId.toUpperCase(),
      }));

    const newItems = (champion?.items || [])
      .filter((item: any) => item && item.itemId)
      .map((item: any) => ({
        ...item,
        itemId: item.itemId.toUpperCase(),
      }));

    const mergedItems = newItems.map((newItem: any) => {
      const existingItem = existingItems.find((item: any) => item.itemId === newItem.itemId);
      const globalStats = this.calculateGlobalStats(existingItem, newItem);
      const rankStats = this.calculateRankStats(existingItem, newItem, rank);
      return {
        itemId: newItem.itemId,
        ...globalStats,
        ranks: {
          ...existingItem?.ranks,
          [rank]: rankStats,
        },
      };
    });

    const allItems = [
      ...mergedItems,
      ...existingItems.filter(
        (existingItem: any) =>
          !newItems.some((newItem: any) => newItem.itemId === existingItem.itemId)
      ),
    ];

    await collection.updateOne(
      { championId: champion.championId },
      { $set: { championId: champion.championId, items: allItems } },
      { upsert: true }
    );

    return {
      championId: champion.championId,
      items: allItems.map(({ itemId, wins, totalGames, winrate, averagePlacement }: any) => ({
        itemId,
        wins,
        totalGames,
        winrate,
        averagePlacement,
      })),
    };
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

  private static async calculateBISItems(collection: any, updatedChampionItems: any[]) {
    const bisMap = new Map();
    for (const champion of updatedChampionItems) {
      const fullDoc = await collection.findOne(
        { championId: champion.championId },
        { projection: { items: 1 } }
      );
      const allItems = fullDoc?.items || [];
      const topItems = allItems
        .sort((a: any, b: any) => Number(b.totalGames) - Number(a.totalGames))
        .slice(0, 6);
      bisMap.set(champion.championId, topItems);
    }
    return bisMap;
  }

  private static async updateBISItems(
    collection: any,
    championId: string,
    bisMap: Map<string, any[]>,
    rank: string
  ) {
    const championBIS = bisMap.get(championId) || [];
    const update = { BIS: championBIS, [`${rank.toLowerCase()}BIS`]: championBIS };
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

  static async getByChampionIds(championIds: string[], ranks: string[]) {
    try {
      const db = await connectDB();
      const championItemCollection = db.db("SET15").collection("championItems");

      const projection: any = { championId: 1, items: 1, BIS: 1 };
      ranks.forEach((rank) => (projection[`${rank.toLowerCase()}BIS`] = 1));

      const championItemDocs = await championItemCollection
        .find({ championId: { $in: championIds } }, { projection })
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
