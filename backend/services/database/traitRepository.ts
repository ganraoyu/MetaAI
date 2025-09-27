import { connectDB } from "../../database/db";

export class TraitRepository {
  static async getAll() {
    try {
      const db = await connectDB();

      const traitCollection = db.db("SET15").collection("traits");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const totalGamesDoc = await totalGamesCollection.findOne({ id: "totalGames" });
      const traitData = await traitCollection.find().toArray();
      
      const sortedTraitsRanking = traitData.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );
      
      return {
        totalGames: totalGamesDoc?.total || 0,
        traits: sortedTraitsRanking,
      };
    } catch (error) {
      console.error("Error fetching traits:", error);
      throw new Error("Error fetching traits");
    }
  }

  static async updateMany(traitStats: any[]) {
    const updatedTraits: any[] = [];

    try {
      const db = await connectDB();

      const traitCollection = db.db("SET15").collection("traits");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      // Fetch current totalGames doc
      const totalGamesDoc = (await totalGamesCollection.findOne({ id: "totalGames" })) || {
        total: 0,
      };

      for (const traitData of traitStats) {
        const existingTrait = await traitCollection.findOne({ name: traitData.traitId });

        const previousTotalGames = existingTrait?.totalGames || 0;
        const newTotalGames = previousTotalGames + (traitData.totalGames || 0);

        const averagePlacement =
          ((existingTrait?.averagePlacement || 0) * previousTotalGames +
            (traitData.placement || 0) * (traitData.totalGames || 0)) /
          (newTotalGames || 1);

        const wins = (existingTrait?.wins || 0) + (traitData.wins || 0);
        const winrate = Number(((wins / newTotalGames) * 100).toFixed(2));

        await traitCollection.updateOne(
          { name: traitData.traitId },
          {
            $set: {
              totalGames: newTotalGames,
              averagePlacement: Number(averagePlacement.toFixed(2)),
              wins,
              winrate,
            },
          },
          { upsert: true }
        );

        console.log(`Updated stats for trait ${traitData.traitId}`);

        updatedTraits.push({
          traitId: traitData.traitId,
          totalGames: newTotalGames,
          wins,
          winrate,
          averagePlacement,
        });
      }

      return { totalGames: totalGamesDoc?.total || 0, updatedTraits };
    } catch (error) {
      console.error("Error updating traits:", error);
      throw new Error("Error updating traits");
    }
  }
}
