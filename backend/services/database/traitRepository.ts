import { connectDB } from "../../database/db";

export class TraitRepository {
  private static cache = new Map<string, { data: any; timestamp: number}>();
  private static CACHE_TTL = 2 * 60 * 1000;

  static async getAll(rank: string): Promise<{ totalGames: number; traitData: any[] }> {
    const cacheKey = `traits:${rank}`
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    try {
      const db = await connectDB();
      const traitsCollection = db.db("SET15").collection("traits");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const isAllRanks = rank === "all";
      const projection = isAllRanks 
        ? { traitId: 1, totalGames: 1, wins: 1, winrate: 1, averagePlacement: 1 }
        : { 
            traitId: 1, 
            [`ranks.${rank}`]: 1 
          };

      const [traitsDocs, totalGamesDoc] = await Promise.all([
        traitsCollection.find({}, { projection }).toArray(),
        totalGamesCollection.findOne({ id: "totalGames" }, { projection: { count: 1 } })
      ]);

      let traitsData;
      if (rank !== "all") {
        traitsData = traitsDocs.map((trait) => ({
          traitId: trait.traitId,
          ...(trait.ranks?.[rank] || {
            totalGames: 0,
            wins: 0,
            winrate: 0,
            averagePlacement: 0,
          }),
        }));
      } else {
        traitsData = traitsDocs;
      }

      const sortedTraitRanking = traitsData.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      const result = { 
        totalGames: totalGamesDoc?.count || 0, 
        traitData: sortedTraitRanking 
      };

      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });

      return result;
    } catch (error) {
      console.error("Error fetching trait data from DB:", error);
      return { traitData: [], totalGames: 0 };
    }
  }

  static async updateMany(rank: string, traitRanking: any[]) {
    try {
      this.cache.clear();
      
      const db = await connectDB();
      const traitCollection = db.db("SET15").collection("traits");
      
      const updatedTraits = await Promise.all(
        traitRanking.map((trait) => this.updateSingleTrait(traitCollection, rank, trait))
      );

      const totalGamesProcessed = traitRanking.reduce(
        (sum, trait) => sum + (trait.totalGames || 0), 0
      );

      await this.updateTotalGamesCount(db, totalGamesProcessed);

      const sortedUpdatedTraits = updatedTraits.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      return { updatedTraits: sortedUpdatedTraits, totalGames: totalGamesProcessed };
    } catch (error: any) {
      console.error("Error updating traits:", error);
      return { updatedTraits: [], totalGames: 0 };
    }
  }

  private static async updateSingleTrait(collection: any, rank: string, trait: any) {
    const existingTrait = await collection.findOne(
      { traitId: trait.traitId },
      { 
        projection: { 
          traitId: 1, 
          totalGames: 1, 
          wins: 1, 
          averagePlacement: 1,
          ranks: 1 
        } 
      }
    );

    const globalStats = this.calculateGlobalStats(existingTrait, trait);
    const rankStats = this.calculateRankStats(existingTrait, trait, rank);

    await collection.updateOne(
      { traitId: trait.traitId },
      {
        $set: {
          traitId: trait.traitId,
          ...globalStats,
          [`ranks.${rank}`]: rankStats,
        },
      },
      { upsert: true }
    );
    
    console.log(`Updated stats for trait ${trait.traitId}`);
    return { traitId: trait.traitId, ...globalStats };
  }

  private static calculateGlobalStats(existingTrait: any, newTrait: any) {
    const prevStats = {
      wins: existingTrait?.wins || 0,
      totalGames: existingTrait?.totalGames || 0,
      averagePlacement: existingTrait?.averagePlacement || 0,
    };

    const wins = prevStats.wins + (newTrait.wins || 0);
    const totalGames = prevStats.totalGames + (newTrait.totalGames || 0);

    const averagePlacement =
      totalGames > 0
        ? Number(
            (
              ((newTrait.placement ?? newTrait.averagePlacement ?? 0) * (newTrait.totalGames || 0) +
                prevStats.averagePlacement * prevStats.totalGames) /
              totalGames
            ).toFixed(2)
          )
        : 0;

    const winrate = totalGames > 0 ? Number(((wins / totalGames) * 100).toFixed(2)) : 0;

    return { wins, winrate, averagePlacement, totalGames };
  }

  private static calculateRankStats(existingTrait: any, newTrait: any, rank: string) {
    const prevStats = {
      wins: existingTrait?.ranks?.[rank]?.wins || 0,
      totalGames: existingTrait?.ranks?.[rank]?.totalGames || 0,
      averagePlacement: existingTrait?.ranks?.[rank]?.averagePlacement || 0,
    };

    const wins = prevStats.wins + (newTrait.wins || 0);
    const totalGames = prevStats.totalGames + (newTrait.totalGames || 0);

    const averagePlacement =
      totalGames > 0
        ? Number(
            (
              ((newTrait.placement ?? newTrait.averagePlacement ?? 0) * (newTrait.totalGames || 0) +
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

  static async getByTraitIds(traitIds: string[], rank: string) {
    try {
      const db = await connectDB();
      const traitsCollection = db.db("SET15").collection("traits");

      const traitDocs = await traitsCollection
        .find(
          { traitId: { $in: traitIds } }, 
          { 
            projection: { 
              traitId: 1, 
              totalGames: 1, 
              wins: 1, 
              winrate: 1, 
              averagePlacement: 1,
              [`ranks.${rank}`]: 1
            } 
          }
        )
        .toArray();

      return { traitData: traitDocs };
    } catch (error) {
      console.error("Error fetching specific traits:", error);
      return { traitData: [] };
    }
  }

  static async getTopPerformers(rank: string, limit: number = 10) {
    try {
      const db = await connectDB();
      const traitsCollection = db.db("SET15").collection("traits");

      const isAllRanks = rank === "all";
      
      if (isAllRanks) {
        const topTraits = await traitsCollection
          .find(
            { averagePlacement: { $exists: true, $gt: 0 } },
            { 
              projection: { 
                traitId: 1, 
                averagePlacement: 1, 
                winrate: 1, 
                totalGames: 1
              } 
            }
          )
          .sort({ averagePlacement: 1 }) 
          .limit(limit)
          .toArray();

        return { traitData: topTraits };
      } else {
        const topTraits = await traitsCollection
          .aggregate([
            { $match: { [`ranks.${rank}`]: { $exists: true } } },
            { 
              $project: {
                traitId: 1,
                rankStats: `$ranks.${rank}`,
                averagePlacement: `$ranks.${rank}.averagePlacement`
              }
            },
            { $match: { averagePlacement: { $gt: 0 } } },
            { $sort: { averagePlacement: 1 } },
            { $limit: limit }
          ])
          .toArray();

        return { traitData: topTraits };
      }
    } catch (error) {
      console.error("Error fetching top performing traits:", error);
      return { traitData: [] };
    }
  }

  static clearCache() {
    this.cache.clear();
    console.log("Trait cache cleared");
  }
}