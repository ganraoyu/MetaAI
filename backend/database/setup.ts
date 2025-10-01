import { connectDB } from "../database/db";

export async function setupDatabaseIndexes() {
  try {
    const db = await connectDB();
    const database = db.db("SET15");

    // Champion Items Collection Indexes
    const championItemsCollection = database.collection("championItems");
    await championItemsCollection.createIndex({ "championId": 1 });
    await championItemsCollection.createIndex({ "items.itemId": 1 });
    await championItemsCollection.createIndex({ "items.averagePlacement": 1 });

    // Champions Collection Indexes
    const championsCollection = database.collection("champions");
    await championsCollection.createIndex({ "championId": 1 });
    await championsCollection.createIndex({ "averagePlacement": 1 });

    // Traits Collection Indexes
    const traitsCollection = database.collection("traits");
    await traitsCollection.createIndex({ "traitId": 1 });
    await traitsCollection.createIndex({ "averagePlacement": 1 });

    // 🆕 Items Collection Indexes (YOU WERE MISSING THESE!)
    const itemsCollection = database.collection("items");
    await itemsCollection.createIndex({ "itemId": 1 });
    await itemsCollection.createIndex({ "averagePlacement": 1 });

    // Total Games Collection Index
    const totalGamesCollection = database.collection("totalGames");
    await totalGamesCollection.createIndex({ "id": 1 });
  } catch (error) {
    console.error("❌ Error creating database indexes:", error);
    throw error;
  }
}