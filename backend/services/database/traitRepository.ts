import { connectDB } from "../../database/db";

export class TraitRepository {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL = 2 * 60 * 1000;

  static async getAll(ranks: string[]): Promise<{ totalGames: number; traitData: any[] }> {
    const cacheKey = `traits:${ranks.join(",")}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    try {
      const db = await connectDB();
      const traitsCollection = db.db("SET15").collection("traits");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const projection: any = {
        traitId: 1,
        totalGames: 1,
        wins: 1,
        winrate: 1,
        averagePlacement: 1,
      };
      ranks.forEach((rank) => (projection[`ranks.${rank}`] = 1));

      const [traitsDocs, totalGamesDoc] = await Promise.all([
        traitsCollection.find({}, { projection }).toArray(),
        totalGamesCollection.findOne({ id: "totalGames" }, { projection: { count: 1 } }),
      ]);

      const traitsData = traitsDocs.map((trait): any => {
        if (!ranks.includes("all")) {
          const rankItemData: Record<string, any> = {};
          ranks.forEach((rank) => {
            rankItemData[rank] = trait.ranks?.[rank] || {};
          });

          const specifiedRankTotals = Object.values(rankItemData).reduce(
            (acc: any, rankStats: any) => {
              if (!rankStats) return acc;

              acc.wins += rankStats.wins ?? 0;
              acc.totalGames += rankStats.totalGames ?? 0;
              acc.totalPlacement += (rankStats.averagePlacement ?? 0) * (rankStats.totalGames ?? 0);
              return acc;
            },
            { wins: 0, totalGames: 0, totalPlacement: 0 }
          );

          const winrate = specifiedRankTotals.totalGames
            ? Number(((specifiedRankTotals.wins / specifiedRankTotals.totalGames) * 100).toFixed(2))
            : 0;

          const averagePlacement = specifiedRankTotals.totalGames
            ? Number(
                (specifiedRankTotals.totalPlacement / specifiedRankTotals.totalGames).toFixed(2)
              )
            : 0;

          return {
            trait: trait.traitId,
            wins: specifiedRankTotals.wins,
            totalGames: specifiedRankTotals.totalGames,
            averagePlacement: averagePlacement,
            winrate: winrate,
          };
        } else {
          return trait;
        }
      });

      const filteredItems = traitsData
        .sort((a, b) => Number(a.averagePlacement) - Number(b.averagePlacement))
        .filter((trait) => trait.totalGames > 0);

      const result = { totalGames: totalGamesDoc?.count || 0, traitData: filteredItems };
      this.cache.set(cacheKey, { data: result, timestamp: Date.now() });

      return result;
    } catch (error) {
      console.error("Error fetching trait data from DB:", error);
      return { traitData: [], totalGames: 0 };
    }
  }

  static async updateMany(ranks: string[], traitRanking: any[]) {
    try {
      this.cache.clear();
      const db = await connectDB();
      const traitCollection = db.db("SET15").collection("traits");

      const updatedTraits = await Promise.all(
        traitRanking.map((trait) =>
          Promise.all(
            ranks.map((rank) => this.updateSingleTrait(traitCollection, rank, trait))
          ).then(() => trait)
        )
      );

      const totalGamesProcessed = traitRanking.reduce(
        (sum, trait) => sum + (trait.totalGames || 0),
        0
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
      { projection: { traitId: 1, totalGames: 1, wins: 1, averagePlacement: 1, ranks: 1 } }
    );

    const globalStats = this.calculateGlobalStats(existingTrait, trait);
    const rankStats = this.calculateRankStats(existingTrait, trait, rank);

    await collection.updateOne(
      { traitId: trait.traitId },
      { $set: { traitId: trait.traitId, ...globalStats, [`ranks.${rank}`]: rankStats } },
      { upsert: true }
    );

    console.log(`Updated stats for trait ${trait.traitId} (rank: ${rank})`);
    return { traitId: trait.traitId, ...globalStats };
  }

  private static calculateGlobalStats(existingTrait: any, newTrait: any) {
    const wins = (existingTrait?.wins || 0) + (newTrait.wins || 0);
    const totalGames = (existingTrait?.totalGames || 0) + (newTrait.totalGames || 0);

    const averagePlacement =
      totalGames > 0
        ? Number(
            (
              ((newTrait.placement ?? newTrait.averagePlacement ?? 0) * (newTrait.totalGames || 0) +
                (existingTrait?.averagePlacement || 0) * (existingTrait?.totalGames || 0)) /
              totalGames
            ).toFixed(2)
          )
        : 0;

    const winrate = totalGames > 0 ? Number(((wins / totalGames) * 100).toFixed(2)) : 0;

    return { wins, winrate, averagePlacement, totalGames };
  }

  private static calculateRankStats(existingTrait: any, newTrait: any, rank: string) {
    const prev = existingTrait?.ranks?.[rank] || { wins: 0, totalGames: 0, averagePlacement: 0 };
    const wins = prev.wins + (newTrait.wins || 0);
    const totalGames = prev.totalGames + (newTrait.totalGames || 0);

    const averagePlacement =
      totalGames > 0
        ? Number(
            (
              ((newTrait.placement ?? newTrait.averagePlacement ?? 0) * (newTrait.totalGames || 0) +
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
    console.log("Trait cache cleared");
  }
}
