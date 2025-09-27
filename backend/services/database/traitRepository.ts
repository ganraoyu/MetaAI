import { connectDB } from "../../database/db";

export class TraitRepository {
  static async getAll() {
    try {
      const db = await connectDB();

      const traitsCollection = db.db("SET15").collection("traits");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const traitData = await traitsCollection.find().toArray();
      const totalGamesDoc = await totalGamesCollection.findOne({ id: "totalGames" });

      const sortedTraitRanking = traitData.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      return { totalGames: totalGamesDoc || 0, traitData: sortedTraitRanking };
    } catch (error) {
      console.error("Error fetching trait data from DB:", error);
      return { traitData: [], totalGames: 0 };
    }
  }

  static async updateMany(traitRanking: any[]) {
    const updatedTraits: any[] = [];
    try {
      const db = await connectDB();
      const traitsCollection = db.db("SET15").collection("traits");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const totalGamesDoc = (await totalGamesCollection.findOne({ id: "totalGames" })) || 0;

      for (const traitStats of traitRanking) {
        const trait = await traitsCollection.findOne({ traitId: traitStats.traitId });

        const totalGames = (trait?.totalGames || 0) + traitStats.totalGames;

        const averagePlacement =
          (Number(traitStats.placement) * traitStats.totalGames +
            (trait?.averagePlacement || 0) * (trait?.totalGames || 0)) /
          totalGames;

        const wins = Number(traitStats.wins) + (trait?.wins || 0);
        const winrate = Number(((wins / totalGames) * 100).toFixed(2));

        await traitsCollection.updateOne(
          { traitId: traitStats.traitId },
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

        console.log(`Updated stats for trait ${traitStats.traitId}`);
        updatedTraits.push({
          traitId: traitStats.traitId,
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

      console.log("Successfully pushed 5 matches worth of trait data to DB");

      const sortedUpdatedTraits = updatedTraits.sort(
        (a, b) => a.averagePlacement - b.averagePlacement
      );

      return { updatedTraits: sortedUpdatedTraits, totalGames: totalGamesDoc || 0 };
    } catch (error) {
      console.error("Error pushing trait data to DB:", error);
      return { updatedTraits: [], totalGames: 0 };
    }
  }
}
