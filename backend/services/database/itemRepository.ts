import { connectDB } from "../../database/db";
import { SET, VERSION } from "../../utilities/versionSetType";
import { calculatePrevVersion } from "../utils/calculatePrevVersion";
import {
  sumRankStats,
  calculateWinrate,
  calculateAveragePlacement,
  calculatePlayRate,
  calculateTop4Rate,
  calculateChange,
} from "../utils/calculateStats";

export class ItemRepository {
  private static readonly cache = new Map<string, { data: any; timestamp: number }>();
  private static readonly CACHE_TTL = 2 * 60 * 1000;
  private static readonly TOTAL_GAMES_COUNT: number = 7;

  static async getAll(ranks: string[]) {
    const cacheKey = `items:${ranks.join(",")}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    try {
      const db = await connectDB();
      const itemsCollection = db.db(VERSION).collection("items");
      const totalGamesCollection = db.db(VERSION).collection("totalGames");

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
          const totals = sumRankStats(rankStatsList);
          const specifiedRankTotals = sumRankStats(Object.values(rankItemData));

          const winrate = calculateWinrate(
            specifiedRankTotals.wins,
            specifiedRankTotals.totalGames
          );
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

      const prevVersion = calculatePrevVersion(VERSION);
      const db = await connectDB();

      const currItems = db.db(VERSION).collection("items");
      const currTotalGames = db.db(VERSION).collection("totalGames");
      const currTotalItems = db.db(VERSION).collection("totalItems");

      const prevItems = db.db(prevVersion).collection("items");
      const prevTotalGames = db.db(prevVersion).collection("totalGames");
      const prevTotalItems = db.db(prevVersion).collection("totalItems");

      const totalGamesDoc = await currTotalGames.findOne({ id: "totalGames" });
      const prevTotalGamesDoc = await prevTotalGames.findOne({ id: "totalGames" });

      const globalTotalGames = totalGamesDoc?.count || 0;
      const prevGlobalTotalGames = prevTotalGamesDoc?.count || 0;

      let newTotalItems = 0;

      const updatedItems = await Promise.all(
        itemRanking.map(async (item) => {
          const prevItem = await prevItems.findOne(
            { itemId: item.itemId },
            {
              projection: {
                itemId: 1,
                averagePlacement: 1,
                winrate: 1,
                playRate: 1,
                top4Rate: 1,
                ranks: 1,
              },
            }
          );

          await Promise.all(
            ranks.map((rank) =>
              this.updateSingleItem(currItems, rank, item, prevItem, globalTotalGames)
            )
          );

          const globalStats = this.calculateGlobalStats({}, item, globalTotalGames);
          newTotalItems += globalStats.totalGames || 0;

          return { ...item, ...globalStats };
        })
      );

      await this.updateTotalGamesCount(db, ItemRepository.TOTAL_GAMES_COUNT);
      await this.updateTotalItemCount(db, newTotalItems);

      const sortedUpdatedItems = updatedItems.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      return { updatedItems: sortedUpdatedItems, totalGames: ItemRepository.TOTAL_GAMES_COUNT };
    } catch (error) {
      console.error("Error updating items:", error);
      return { updatedItems: [], totalGames: 0 };
    }
  }

  private static async updateSingleItem(
    collection: any,
    rank: string,
    item: any,
    prevVersionItem: any,
    globalTotalGames: number
  ) {
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

    const prevGlobal = prevVersionItem || {};
    const prevRank = prevVersionItem?.ranks?.[rank] || {};

    const globalChanges = this.percentChange(
      globalStats.averagePlacement,
      prevGlobal.averagePlacement || 0,
      globalStats.winrate,
      prevGlobal.winrate || 0,
      globalStats.playRate,
      prevGlobal.playRate || 0,
      globalStats.top4Rate,
      prevGlobal.top4Rate || 0
    );

    const rankChanges = this.percentChange(
      rankStats.averagePlacement,
      prevRank.averagePlacement || 0,
      rankStats.winrate,
      prevRank.winrate || 0,
      rankStats.playRate,
      prevRank.playRate || 0,
      rankStats.top4Rate,
      prevRank.top4Rate || 0
    );

    globalStats.averagePlacementChange = globalChanges.averagePlacementChange;
    globalStats.winRateChange = globalChanges.winRateChange;
    globalStats.playRateChange = globalChanges.playRateChange;
    globalStats.top4RateChange = globalChanges.top4RateChange;

    rankStats.averagePlacementChange = rankChanges.averagePlacementChange;
    rankStats.winRateChange = rankChanges.winRateChange;
    rankStats.playRateChange = rankChanges.playRateChange;
    rankStats.top4RateChange = rankChanges.top4RateChange;

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

    const placementArray = [...(existingItem?.placementArray || []), ...newItem?.placementArray];
    const totalPlacement = placementArray.reduce((sum, p) => sum + p, 0);

    const averagePlacement = calculateAveragePlacement(totalPlacement, totalGames);
    const winrate = calculateWinrate(wins, totalGames);
    const top4Rate = calculateTop4Rate(placementArray, totalGames);
    const playRate = calculatePlayRate(totalGames, globalTotalGames);

    return {
      wins,
      winrate,
      averagePlacement,
      placementArray,
      totalGames,
      top4Rate,
      playRate,
      newItemTotalGames: newItem.totalGames,
      averagePlacementChange: 0,
      winRateChange: 0,
      playRateChange: 0,
      top4RateChange: 0,
    };
  }

  private static calculateRankStats(
    existingItem: any,
    newItem: any,

    rank: string,
    globalTotalGames: number
  ) {
    const prev = existingItem?.ranks?.[rank] || { wins: 0, totalGames: 0, placementArray: [] };
    const wins = prev.wins + (newItem.wins || 0);
    const totalGames = prev.totalGames + (newItem.totalGames || 0);
    const placementArray = [...(prev.placementArray || []), ...(newItem.placementArray || [])];
    const totalPlacement = placementArray.reduce((sum, p) => sum + p, 0);

    const averagePlacement = calculateAveragePlacement(totalPlacement, totalGames);
    const winrate = calculateWinrate(wins, totalGames);
    const top4Rate = calculateTop4Rate(placementArray, totalGames);
    const playRate = calculatePlayRate(totalGames, globalTotalGames);

    return {
      wins,
      winrate,
      averagePlacement,
      placementArray,
      totalGames,
      top4Rate,
      playRate,
      averagePlacementChange: 0,
      winRateChange: 0,
      playRateChange: 0,
      top4RateChange: 0,
    };
  }

  private static percentChange(
    averagePlacement: number,
    prevAveragePlacement: number,
    winRate: number,
    prevWinRate: number,
    playRate: number,
    prevPlayRate: number,
    top4Rate: number,
    prevTop4Rate: number
  ) {
    const averagePlacementChange = calculateChange(averagePlacement, prevAveragePlacement);
    const winRateChange = calculateChange(winRate, prevWinRate);
    const playRateChange = calculateChange(playRate, prevPlayRate);
    const top4RateChange = calculateChange(top4Rate, prevTop4Rate);

    return { averagePlacementChange, winRateChange, playRateChange, top4RateChange };
  }

  private static async updateTotalGamesCount(db: any, increment: number) {
    const totalGamesCollection = db.db(VERSION).collection("totalGames");
    await totalGamesCollection.updateOne(
      { id: "totalGames" },
      { $inc: { count: increment } },
      { upsert: true }
    );
  }

  private static async updateTotalItemCount(db: any, increment: number) {
    const totalItemsCollection = db.db(VERSION).collection("totalItems");
    await totalItemsCollection.updateOne(
      { id: "totalItems" },
      { $set: { count: increment } },
      { upsert: true }
    );
  }

  static clearCache() {
    this.cache.clear();
    console.log("Item cache cleared");
  }
}
