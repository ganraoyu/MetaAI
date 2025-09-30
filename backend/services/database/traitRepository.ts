import { connectDB } from "../../database/db";

export class TraitRepository {
  static async getAll(rank: string) {
    try {
      const db = await connectDB();

      const traitsCollection = db.db("SET15").collection("traits");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const traitsDocs = await traitsCollection.find().toArray();
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
      
      const totalGamesDoc = await totalGamesCollection.findOne({ id: "totalGames" });

      const sortedTraitRanking = traitsData.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      return { totalGames: totalGamesDoc?.count || 0, traitData: sortedTraitRanking };
    } catch (error) {
      console.error("Error fetching trait data from DB:", error);
      return { traitData: [], totalGames: 0 };
    }
  }

  static async updateMany(rank: string, traitRanking: any[]) {
    try {
      const db = await connectDB();
      // Fix: Use correct collection name
      const traitCollection = db.db("SET15").collection("traits");
      
      const updatedTraits = await Promise.all(
        traitRanking.map((trait) => this.updateSingleTrait(traitCollection, rank, trait))
      );

      // Fix: Calculate actual total games
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
    // Fix: Use correct field name
    const existingTrait = await collection.findOne({ traitId: trait.traitId });

    const globalStats = this.calculateGlobalStats(existingTrait, trait);
    const rankStats = this.calculateRankStats(existingTrait, trait, rank);

    // Fix: Use updateOne instead of deprecated update
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

    // Fix: Use updateOne instead of deprecated update
    await totalGamesCollection.updateOne(
      { id: "totalGames" },
      { $inc: { count: increment } },
      { upsert: true }
    );
  }
}