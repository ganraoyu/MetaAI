import { connectDB } from "../../database/db";

export class ChampionRepository {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL = 2 * 60 * 1000; // 2 minutes

  // Fetch champion data for multiple ranks
  static async getAll(ranks: string[]) {
    const cacheKey = `champions:${ranks.join(",")}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    try {
      const db = await connectDB();
      const championCollection = db.db("SET15").collection("champions");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const projection: any = { championId: 1, totalGames: 1, wins: 1, winrate: 1, averagePlacement: 1, cost: 1 };
      ranks.forEach(rank => projection[`ranks.${rank}`] = 1);

      const [championsDocs, totalGamesDoc] = await Promise.all([
        championCollection.find({}, { projection }).toArray(),
        totalGamesCollection.findOne({ id: "totalGames" }, { projection: { count: 1 } }),
      ]);

      const totalGames = totalGamesDoc?.count || 0;

      // Map champion data for each rank
      const championsData = championsDocs.map(champion => {
        const rankData: Record<string, any> = {};
        ranks.forEach(rank => {
          rankData[rank] = champion.ranks?.[rank] || {
            totalGames: 0,
            wins: 0,
            winrate: 0,
            averagePlacement: 0,
          };
        });

        return {
          championId: champion.championId,
          cost: champion.cost,
          averagePlacement: champion.averagePlacement || 0,
          ...rankData,
        };
      });

      // Sort by global averagePlacement
      const sortedChampions = championsData.sort((a, b) => Number(a.averagePlacement) - Number(b.averagePlacement));

      const result = { totalGames, championData: sortedChampions };
      this.cache.set(cacheKey, { data: result, timestamp: Date.now() });

      return result;
    } catch (error) {
      console.error("Error fetching champion data from DB:", error);
      return { championData: [], totalGames: 0 };
    }
  }

  // Update multiple ranks
  static async updateMany(ranks: string[], championsRanking: any[]) {
    try {
      this.cache.clear();
      const db = await connectDB();
      const championsCollection = db.db("SET15").collection("champions");

      const updatedChampions = await Promise.all(
        championsRanking.map(champion =>
          Promise.all(ranks.map(rank => this.updateSingleChampion(championsCollection, rank, champion)))
            .then(() => champion)
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
      { projection: { championId: 1, totalGames: 1, wins: 1, averagePlacement: 1, ranks: 1, cost: 1 } }
    );

    const globalStats = this.calculateGlobalStats(existingChampion, champion);
    const rankStats = this.calculateRankStats(existingChampion, champion, rank);

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

    console.log(`Updated stats for champion ${champion.championId} (rank: ${rank})`);
    return { championId: champion.championId, ...globalStats };
  }

  private static calculateGlobalStats(existingChampion: any, champion: any) {
    const totalGames = (existingChampion?.totalGames || 0) + champion.totalGames;
    const wins = (existingChampion?.wins || 0) + champion.wins;
    const averagePlacement = Number(
      (
        (champion.placement * champion.totalGames + (existingChampion?.averagePlacement || 0) * (existingChampion?.totalGames || 0)) /
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
        (champion.placement * champion.totalGames + (existingChampion?.ranks?.[rank]?.averagePlacement || 0) * (existingChampion?.ranks?.[rank]?.totalGames || 0)) /
        totalGamesRank
      ).toFixed(2)
    );

    return { totalGames: totalGamesRank, wins: winsRank, winrate: winrateRank, averagePlacement: averagePlacementRank };
  }

  private static async updateTotalGamesCount(db: any, increment: number) {
    const totalGamesCollection = db.db("SET15").collection("totalGames");
    await totalGamesCollection.updateOne({ id: "totalGames" }, { $inc: { count: increment } }, { upsert: true });
  }

  static clearCache() {
    this.cache.clear();
    console.log("🗑️ Champion cache cleared");
  }
}
