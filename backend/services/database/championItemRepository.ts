import { connectDB } from "../../database/db";

export class ChampionItemRepository {
  static async getAll(rank: string) {
    try {
      const db = await connectDB();
      const championItemCollection = db.db("SET15").collection("championItems");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const championItemDocs = await championItemCollection.find().toArray();
      const totalGamesDoc = await totalGamesCollection.findOne({ id: "totalGames" });
      const totalGames = totalGamesDoc?.count || 0;

      const championData = championItemDocs.map((champion) => ({
        championId: champion.championId,
        items: champion.items?.map((item: any) => {
          if (rank !== "all") {
            const rankStats = item.ranks?.[rank];
            return {
              itemId: item.itemId,
              stats: rankStats || { wins: 0, totalGames: 0, winrate: 0, averagePlacement: 0 },
            };
          } else {
            return {
              itemId: item.itemId,
              wins: item.wins,
              totalGames: item.totalGames,
              winrate: item.winrate,
              averagePlacement: item.averagePlacement,
            };
          };
        }),
      }));

      return { totalGames, championData };
    } catch (error) {
      console.error("Error fetching champion items:", error);
      return { championData: [], totalGames: 0 };
    }
  }

  static async updateMany(rank: string, championRanking: any[]) {
    try {
      const db = await connectDB();
      const championItemCollection = db.db("SET15").collection("championItems");

      const updatedChampionItems = await Promise.all(
        championRanking.map((champion) =>
          this.updateSingleItem(championItemCollection, rank, champion)
        )
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

      await this.updateTotalGamesCount(db, totalGamesProcessed);

      const sortedUpdatedItems = updatedChampionItems.sort((a, b) => {
        const aItems = a.items || [];
        const bItems = b.items || [];

        const aAvgPlacement =
          aItems.reduce((sum, item) => sum + (item.averagePlacement || 0), 0) /
          (aItems.length || 1);
        const bAvgPlacement =
          bItems.reduce((sum, item) => sum + (item.averagePlacement || 0), 0) /
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
    const existingChampion = await collection.findOne({ championId: champion.championId });

    const updatedItems = await Promise.all(
      (champion?.items ?? []).map(async (item: any) => {
        const existingItem = existingChampion?.items?.find((i: any) => i.itemId === item.itemId);

        const globalStats = this.calculateGlobalStats(existingItem, item);
        const rankStats = this.calculateRankStats(existingItem, item, rank);

        if (!existingChampion) {
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

  private static async updateTotalGamesCount(db: any, increment: number) {
    const totalGamesCollection = db.db("SET15").collection("totalGames");

    await totalGamesCollection.updateOne(
      { id: "totalGames" },
      { $inc: { count: increment } },
      { upsert: true }
    );
  }
}
