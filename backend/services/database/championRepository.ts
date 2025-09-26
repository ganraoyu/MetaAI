import { connectDB } from "../../database/db";

export class ChampionRepository {
  static async getAll() {
    try {
      const db = await connectDB();

      const championCollections = db.db("SET15").collection("champions");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const championData = await championCollections.find().toArray();
      const totalGamesDoc = await totalGamesCollection.findOne({ id: "totalGames" });

      const sortedChampionRanking = championData.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      return { totalGames: totalGamesDoc || 0, championData: sortedChampionRanking };
    } catch (error) {
      console.error("Error fetching champion data from DB:", error);
      return { champions: [], totalGames: 0 };
    }
  }

  static async updateMany(championRanking: any[]) {
    const updatedChampions: any[] = [];
    try {
      const db = await connectDB();
      const championsCollection = db.db("SET15").collection("champions");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const totalGamesDoc = (await totalGamesCollection.findOne({ id: "totalGames" })) || 0;

      for (const championStats of championRanking) {
        const champ = await championsCollection.findOne({ championId: championStats.championId });

        const totalGames = (champ?.totalGames || 0) + championStats.totalGames;

        const averagePlacement =
          (Number(championStats.placement) * championStats.totalGames +
            (champ?.averagePlacement || 0) * (champ?.totalGames || 0)) /
          totalGames;

        const wins = Number(championStats.wins) + (champ?.wins || 0);
        const winrate = Number(((wins / totalGames) * 100).toFixed(2));

        await championsCollection.updateOne(
          { championId: championStats.championId },
          {
            $set: {
              totalGames,
              averagePlacement: Number(averagePlacement.toFixed(2)),
              wins,
              winrate,
            },
          },
          { upsert: true }
        );

        console.log(`Updated stats for champion ${championStats.championId}`);
        updatedChampions.push({
          championId: championStats.championId,
          totalGames,
          averagePlacement: Number(averagePlacement.toFixed(2)),
          wins,
          winrate,
        });
      }

      await totalGamesCollection.updateOne(
        { id: "totalGames" },
        { $inc: { count: 5 } }, // hardcoded since we fetch 5 games at a time
        { upsert: true }
      );

      console.log("Successfully pushed 5 matches worth of champion data to DB");

      const sortedUpdatedChampions = updatedChampions.sort(
        (a, b) => a.averagePlacement - b.averagePlacement
      );

      return { updatedChampions: sortedUpdatedChampions, totalGames: totalGamesDoc || 0 };
    } catch (error) {
      console.error("Error pushing champion data to DB:", error);
      return { updatedChampions: [], totalGames: 0 };
    }
  }
}
