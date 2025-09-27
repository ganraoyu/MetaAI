import { connectDB } from "../../database/db";

export class ChampionRepository {
  static async getAll() {
    try {
      const db = await connectDB();

      const traitCollection = db.db("SET15").collection("traits");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const traitData = await traitCollection.find().toArray();
      const totalGamesDoc = await totalGamesCollection.findOne({ id: "totalGames" });

      const sortedTraitRanking = traitData.sort(
        (a, b) => (a.averagePlacement || 0) - (b.averagePlacement || 0)
      );

      return { totalGames: totalGamesDoc?.total || 0, traitData: sortedTraitRanking };
    } catch (error) {
      console.error("Error fetching traits:", error);
      return { traitData: [], totalGames: 0 };
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
