import { connectDB } from "../../database/db";

export class ChampionRepository {
  static async getAll(rank: string) {
    try {
      const db = await connectDB();
      const championCollection = db.db("SET15").collection("champions");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      // Get all champions
      const championsDocs = await championCollection.find().toArray();
      const totalGamesDoc = await totalGamesCollection.findOne({ id: "totalGames" });
      const totalGames = totalGamesDoc?.count || 0;

      let championsData;
      if (rank !== "all") {
        championsData = championsDocs.map((champion) => ({
          championId: champion.championId,
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

      return {
        totalGames: totalGames,
        championData: sortedChampions,
      };
    } catch (error) {
      console.error("Error fetching champion data from DB:", error);
      return { champions: [], totalGames: 0 };
    }
  }

  static async updateMany(rank: string, championsRanking: any[]) {
    try {
      const db = await connectDB();
      const championsCollection = db.db("SET15").collection("champions");

      const updatedChampions = await Promise.all(
        championsRanking.map((champion) =>
          this.updateSingleChampion(championsCollection, rank, champion)
        )
      );

      await this.updateTotalGamesCount(db, championsRanking.length);

      const sortedUpdatedChampions = updatedChampions.sort(
        (a, b) => a.averagePlacement - b.averagePlacement
      );

      return { updatedChampions: sortedUpdatedChampions, totalGames: 0 };
    } catch (error) {
      console.error("Error updating champion data in DB:", error);
      return { updatedChampions: [], totalGames: 0 };
    }
  }

  // Extract champion update logic
  private static async updateSingleChampion(collection: any, rank: string, champion: any) {
    const existingChampion = await collection.findOne({ championId: champion.championId });

    const globalStats = this.calculateGlobalStats(existingChampion, champion);
    const rankStats = this.calculateRankStats(existingChampion, champion, rank);

    // Single update operation combining both global and rank stats
    await collection.updateOne(
      { championId: champion.championId },
      {
        $set: {
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

  // Extract global stats calculation
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

  // Extract rank-specific stats calculation
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

  // Extract total games update logic
  private static async updateTotalGamesCount(db: any, increment: number) {
    const totalGamesCollection = db.db("SET15").collection("totalGames");

    await totalGamesCollection.updateOne(
      { id: "totalGames" },
      { $inc: { count: increment } },
      { upsert: true }
    );
  }
}
