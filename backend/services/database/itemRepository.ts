import { connectDB } from "../../database/db";
import {
  sumRankStats,
  calculateWinrate,
  calculateAveragePlacement,
  calculatePlayRate,
  calculateTop4Rate
} from "../utils/calculateStats";

export class ItemRepository {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL = 2 * 60 * 1000;

  static async getAll(ranks: string[]) {
    const cacheKey = `items:${ranks.join(",")}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    try {
      const db = await connectDB();
      const itemsCollection = db.db("SET15").collection("items");
      const totalGamesCollection = db.db("SET15").collection("totalGames");

      const projection: any = {
        itemId: 1,
        totalGames: 1,
        wins: 1,
        winrate: 1,
        averagePlacement: 1,
        placementArray: 1,
        ranks: 1,
        BIS: 1,
        masterBIS: 1,
        grandmasterBIS: 1,
        challengerBIS: 1,
      };

      const [itemsDocs, totalGamesDoc] = await Promise.all([
        itemsCollection.find({}, { projection }).toArray(),
        totalGamesCollection.findOne({ id: "totalGames" }, { projection: { count: 1 } }),
      ]);

      const itemData: any[] = itemsDocs.map((item) => {
        if (!ranks.includes("all")) {
          const rankStatsList = ranks.map((rank) => item.ranks?.[rank.toLowerCase()] || {});
          const rankItemData: Record<string, any> = {};
          ranks.forEach((rank) => {
            rankItemData[rank] = item.ranks?.[rank] || {};
          });
          const totals = sumRankStats(rankStatsList)
          const specifiedRankTotals = sumRankStats(Object.values(rankItemData));

          const winrate = calculateWinrate(specifiedRankTotals.wins, specifiedRankTotals.totalGames);
          const averagePlacement = calculateAveragePlacement(
            specifiedRankTotals.totalPlacement,
            specifiedRankTotals.totalGames
          );
          const top4Rate = calculateTop4Rate(totals.placementArray, totals.totalGames);
          const playRate = calculatePlayRate(totals.totalGames, totalGamesDoc?.count);

          return {
            itemId: item.itemId,
            wins: specifiedRankTotals.wins,
            totalGames: specifiedRankTotals.totalGames,
            averagePlacement,
            placementArray: item.placementArray,
            top4Rate,
            playRate,
            winrate,
            BIS: item.BIS,
            masterBIS: item.masterBIS,
            grandmasterBIS: item.grandmasterBIS,
            challengerBIS: item.challengerBIS,
          };
        } else {
          return item;
        }
      });

      const filteredItems = itemData
        .sort((a, b) => Number(a.averagePlacement) - Number(b.averagePlacement))
        .filter((item) => item.totalGames > 0);

      const result = { totalGames: totalGamesDoc?.count || 0, itemData: filteredItems };
      this.cache.set(cacheKey, { data: result, timestamp: Date.now() });

      return result;
    } catch (error) {
      console.error("Error fetching item data from DB:", error);
      return { itemData: [], totalGames: 0 };
    }
  }

  static async updateMany(ranks: string[], itemRanking: any[]) {
    try {
      this.cache.clear();
      const db = await connectDB();
      const itemsCollection = db.db("SET15").collection("items");
      const totalGamesCollection = db.db("SET15").collection("totalGames")
      const totalGamesDoc = await totalGamesCollection.findOne({ id: "totalGames" });
      const globalTotalGames = totalGamesDoc?.count || 0;

      const updatedItems = await Promise.all(
        itemRanking.map((item) =>
          Promise.all(ranks.map((rank) => this.updateSingleItem(itemsCollection, rank, item, globalTotalGames))).then(
            () => item
          )
        )
      );

      await this.updateTotalGamesCount(db, 7);

      const sortedUpdatedItems = updatedItems.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      return { updatedItems: sortedUpdatedItems, totalGames: 7 };
    } catch (error) {
      console.error("Error updating items:", error);
      return { updatedItems: [], totalGames: 0 };
    }
  }

  private static async updateSingleItem(collection: any, rank: string, item: any, globalTotalGames: number) {
    const existingItem = await collection.findOne(
      { itemId: item.itemId },
      {
        projection: {
          itemId: 1,
          totalGames: 1,
          wins: 1,
          averagePlacement: 1,
          placementArray: 1,
          ranks: 1, 
        },
      }
    );

    const globalStats = this.calculateGlobalStats(existingItem, item, globalTotalGames);
    const rankStats = this.calculateRankStats(existingItem, item, rank, globalTotalGames);

    await collection.updateOne(
      { itemId: item.itemId },
      { $set: { itemId: item.itemId, ...globalStats, [`ranks.${rank}`]: rankStats } },
      { upsert: true }
    );

    console.log(`Updated stats for item ${item.itemId} (rank: ${rank})`);
    return { itemId: item.itemId, ...globalStats };
  }

  private static calculateGlobalStats(existingItem: any, newItem: any, globalTotalGames: number) {
    const wins = (existingItem?.wins || 0) + (newItem.wins || 0);
    const totalGames = (existingItem?.totalGames || 0) + (newItem.totalGames || 0);

    const placementArray = [...(existingItem?.placementArray || []), ...(newItem?.placementArray)];
    const totalPlacement = placementArray.reduce((sum, p) => sum + p, 0);

    const averagePlacement = calculateAveragePlacement(totalPlacement, totalGames);
    const winrate = calculateWinrate(wins, totalGames);
    const top4Rate = calculateTop4Rate(placementArray, totalGames);
    const playRate = calculatePlayRate(totalGames, globalTotalGames);

    return { wins, winrate, averagePlacement, placementArray, totalGames, top4Rate, playRate };
  }

  private static calculateRankStats(existingItem: any, newItem: any, rank: string, globalTotalGames: number) {
    const prev = existingItem?.ranks?.[rank] || { wins: 0, totalGames: 0, placementArray: [] };
    const wins = prev.wins + (newItem.wins || 0);
    const totalGames = prev.totalGames + (newItem.totalGames || 0);
    const placementArray = [...(prev.placementArray || []), ...(newItem.placementArray || [])];
    const totalPlacement = placementArray.reduce((sum, p) => sum + p, 0);

    const averagePlacement = calculateAveragePlacement(totalPlacement, totalGames);
    const winrate = calculateWinrate(wins, totalGames);
    const top4Rate = calculateTop4Rate(placementArray, totalGames);
    const playRate = calculatePlayRate(totalGames, globalTotalGames);

    return { wins, winrate, averagePlacement, placementArray, totalGames, top4Rate, playRate };
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
    console.log("Item cache cleared");
  }
}
