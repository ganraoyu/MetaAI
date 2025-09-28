import { connectDB } from "../../database/db";

export class ItemRepository {
  static async getAll() {
    try {
      const db = await connectDB();
      const itemsCollection = db.db("SET15").collection("items");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const itemData = await itemsCollection.find().toArray();
      const totalGamesDoc = await totalGamesCollection.findOne({ id: "totalGames" });

      // Sort by placement (best items first)
      const sortedItemRanking = itemData.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      return { totalGames: totalGamesDoc?.count || 0, itemData: sortedItemRanking };
    } catch (error) {
      console.error("Error fetching item data from DB:", error);
      return { itemData: [], totalGames: 0 };
    }
  }

  static async updateMany(rank:string, itemRanking: any[]) {
    const updatedItems: any[] = [];
    try {
      const db = await connectDB();
      const itemsCollection = db.db("SET15").collection("items");
      const totalGamesCollection = db.db("SET15").collection("totalGames");
      const totalGamesDoc = (await totalGamesCollection.findOne({ id: "totalGames" })) || { count: 0 };

      for (const itemStats of itemRanking) {
        const item = await itemsCollection.findOne({ itemId: itemStats.itemId });

        const totalGames = (item?.totalGames || 0) + itemStats.totalGames;

        const averagePlacement =
          (Number(itemStats.placement) * itemStats.totalGames +
            (item?.averagePlacement || 0) * (item?.totalGames || 0)) /
          totalGames;

        const wins = Number(itemStats.wins) + (item?.wins || 0);
        const winrate = Number(((wins / totalGames) * 100).toFixed(2));

        await itemsCollection.updateOne(
          { itemId: itemStats.itemId },
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

        console.log(`Updated stats for item ${itemStats.itemId}`);
        updatedItems.push({
          itemId: itemStats.itemId,
          totalGames,
          averagePlacement: Number(averagePlacement.toFixed(2)),
          wins,
          winrate,
        });
      }

      // Update total games count
      await totalGamesCollection.updateOne(
        { id: "totalGames" },
        { $inc: { count: 5 } },
        { upsert: true }
      );
      const sortedUpdatedItems = updatedItems.sort(
        (a, b) => a.averagePlacement - b.averagePlacement
      );

      return { updatedItems: sortedUpdatedItems, totalGames: totalGamesDoc || 0 };
    } catch (error) {
      console.error("Error updating items in DB:", error);
      return { updatedItems: [], totalGames: 0 };
    }
  }
}