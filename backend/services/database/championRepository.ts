import { connectDB } from "../../database/db";

export class ChampionRepository {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL = 2 * 60 * 1000; 

  static async getAll(rank: string) {
    const cacheKey = `champions:${rank}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    try {
      const db = await connectDB();
      const championCollection = db.db("SET15").collection("champions");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const isAllRanks = rank === "all";
      const projection = isAllRanks 
        ? { championId: 1, totalGames: 1, wins: 1, winrate: 1, averagePlacement: 1, cost: 1 }
        : { 
            championId: 1, 
            cost: 1,
            [`ranks.${rank}`]: 1 
          };

      const [championsDocs, totalGamesDoc] = await Promise.all([
        championCollection.find({}, { projection }).toArray(),
        totalGamesCollection.findOne({ id: "totalGames" }, { projection: { count: 1 } })
      ]);

      const totalGames = totalGamesDoc?.count || 0;

      let championsData;
      if (rank !== "all") {
        championsData = championsDocs.map((champion) => ({
          championId: champion.championId,
          cost: champion.cost,
          ...(champion.ranks?.[rank] || {
            totalGames: 0,
            wins: 0,
            winrate: 0,
            averagePlacement: 0,
          }),
        }));
      } else {
        championsData = championsDocs;
      }

      // Sort by averagePlacement (best placement = lowest number)
      const sortedChampions = championsData.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      const result = {
        totalGames: totalGames,
        championData: sortedChampions,
      };

      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });

      return result;
    } catch (error) {
      console.error("Error fetching champion data from DB:", error);
      return { championData: [], totalGames: 0 };
    }
  }

  static async updateMany(rank: string, championsRanking: any[]) {
    try {
      this.cache.clear();
      
      const db = await connectDB();
      const championsCollection = db.db("SET15").collection("champions");

      const updatedChampions = await Promise.all(
        championsRanking.map((champion) =>
          this.updateSingleChampion(championsCollection, rank, champion)
        )
      );

      await this.updateTotalGamesCount(db, 5);

      const sortedUpdatedChampions = updatedChampions.sort(
        (a, b) => a.averagePlacement - b.averagePlacement
      );

      return { updatedChampions: sortedUpdatedChampions, totalGames: 0 };
    } catch (error) {
      console.error("Error updating champion data in DB:", error);
      return { updatedChampions: [], totalGames: 0 };
    }
  }

  private static async updateSingleChampion(collection: any, rank: string, champion: any) {
    const existingChampion = await collection.findOne(
      { championId: champion.championId },
      { 
        projection: { 
          championId: 1, 
          totalGames: 1, 
          wins: 1, 
          averagePlacement: 1,
          ranks: 1,
          cost: 1
        } 
      }
    );

    const globalStats = this.calculateGlobalStats(existingChampion, champion);
    const rankStats = this.calculateRankStats(existingChampion, champion, rank);

    // Single update operation combining both global and rank stats
    // This uses the championId index for the update
    await collection.updateOne(
      { championId: champion.championId },
      {
        $set: {
          championId: champion.championId,
          cost: champion.cost || existingChampion?.cost || 1,
          ...globalStats,
          [`ranks.${rank}`]: rankStats,
        },
      },
      { upsert: true }
    );

    console.log(`Updated stats for champion ${champion.championId}`);
    return {
      championId: champion.championId,
      ...globalStats,
    };
  }

  private static calculateGlobalStats(existingChampion: any, champion: any) {
    const totalGames = (existingChampion?.totalGames || 0) + champion.totalGames;
    const wins = (existingChampion?.wins || 0) + champion.wins;

    const averagePlacement = Number(
      (
        (champion.placement * champion.totalGames +
          (existingChampion?.averagePlacement || 0) * (existingChampion?.totalGames || 0)) /
        totalGames
      ).toFixed(2)
    );

    const winrate = Number(((wins / totalGames) * 100).toFixed(2));

    return { totalGames, wins, winrate, averagePlacement };
  }


  private static calculateRankStats(existingChampion: any, champion: any, rank: string) {
    const winsRank = (existingChampion?.ranks?.[rank]?.wins || 0) + champion.wins;
    const totalGamesRank = (existingChampion?.ranks?.[rank]?.totalGames || 0) + champion.totalGames;

    const winrateRank = Number(((winsRank / totalGamesRank) * 100).toFixed(2));

    const averagePlacementRank = Number(
      (
        (champion.placement * champion.totalGames +
          (existingChampion?.ranks?.[rank]?.averagePlacement || 0) *
            (existingChampion?.ranks?.[rank]?.totalGames || 0)) /
        totalGamesRank
      ).toFixed(2)
    );

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

  // Additional helper methods for better performance
  static async getByChampionIds(championIds: string[], rank: string) {
    try {
      const db = await connectDB();
      const championCollection = db.db("SET15").collection("champions");

      const championDocs = await championCollection
        .find(
          { championId: { $in: championIds } }, // Uses championId index
          { 
            projection: { 
              championId: 1, 
              totalGames: 1, 
              wins: 1, 
              winrate: 1, 
              averagePlacement: 1,
              cost: 1,
              [`ranks.${rank}`]: 1
            } 
          }
        )
        .toArray();

      return { championData: championDocs };
    } catch (error) {
      console.error("Error fetching specific champions:", error);
      return { championData: [] };
    }
  }

  // Get top performing champions using averagePlacement index
  static async getTopPerformers(rank: string, limit: number = 10) {
    try {
      const db = await connectDB();
      const championCollection = db.db("SET15").collection("champions");

      const isAllRanks = rank === "all";
      
      if (isAllRanks) {
        // For "all" ranks, sort by global averagePlacement
        const topChampions = await championCollection
          .find(
            { averagePlacement: { $exists: true, $gt: 0 } },
            { 
              projection: { 
                championId: 1, 
                averagePlacement: 1, 
                winrate: 1, 
                totalGames: 1,
                cost: 1
              } 
            }
          )
          .sort({ averagePlacement: 1 }) // Uses averagePlacement index
          .limit(limit)
          .toArray();

        return { championData: topChampions };
      } else {
        // For specific ranks, use aggregation
        const topChampions = await championCollection
          .aggregate([
            { $match: { [`ranks.${rank}`]: { $exists: true } } },
            { 
              $project: {
                championId: 1,
                cost: 1,
                rankStats: `$ranks.${rank}`,
                averagePlacement: `$ranks.${rank}.averagePlacement`
              }
            },
            { $match: { averagePlacement: { $gt: 0 } } },
            { $sort: { averagePlacement: 1 } },
            { $limit: limit }
          ])
          .toArray();

        return { championData: topChampions };
      }
    } catch (error) {
      console.error("Error fetching top performers:", error);
      return { championData: [] };
    }
  }


  static clearCache() {
    this.cache.clear();
    console.log("🗑️ Champion cache cleared");
  }

  // Get champion statistics by cost (useful for meta analysis)
  static async getChampionsByCost(cost: number, rank: string) {
    try {
      const db = await connectDB();
      const championCollection = db.db("SET15").collection("champions");

      const isAllRanks = rank === "all";
      const projection = isAllRanks 
        ? { championId: 1, cost: 1, totalGames: 1, wins: 1, winrate: 1, averagePlacement: 1 }
        : { 
            championId: 1, 
            cost: 1,
            [`ranks.${rank}`]: 1 
          };

      const champions = await championCollection
        .find({ cost: cost }, { projection })
        .sort({ averagePlacement: 1 })
        .toArray();

      return { championData: champions };
    } catch (error) {
      console.error("Error fetching champions by cost:", error);
      return { championData: [] };
    }
  }
}