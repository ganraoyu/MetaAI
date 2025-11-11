import { connectDB } from "../../database/db";
import { VERSION } from "../../utilities/versionSetType";
import {
  sumRankStats,
  calculateWinrate,
  calculateAveragePlacement,
  calculateTop4Rate,
  calculatePlayRate,
} from "../utils/calculateStats";

export class ChampionRepository {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL = 2 * 60 * 1000;

  static async getAll(ranks: string[]) {
    const cacheKey = `champions:${ranks.join(",")}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    };

    try {
      const db = await connectDB();
      const championCollection = db.db(VERSION).collection("champions");
      const totalGamesCollection = db.db(VERSION).collection("totalGames");

      const projection: any = {
        championId: 1,
        totalGames: 1,
        wins: 1,
        winrate: 1,
        averagePlacement: 1,
        placementArray: 1,  
        cost: 1,
        ranks: 1,
      };

      const [championsDocs, totalGamesDoc] = await Promise.all([
        championCollection.find({}, { projection }).toArray(),
        totalGamesCollection.findOne({ id: "totalGames" }, { projection: { count: 1 } }),
      ]);

      const totalGames = totalGamesDoc?.count || 0;

      const championsData = championsDocs.map((champion) => {
        if (!ranks.includes("all")) {
          const rankStatsList = ranks.map((rank) => champion.ranks?.[rank.toLowerCase()] || {});
          const totals = sumRankStats(rankStatsList);

          const winrate = calculateWinrate(totals.wins, totals.totalGames);
          const averagePlacement = calculateAveragePlacement(
            totals.totalPlacement,
            totals.totalGames
          );
          const top4Rate = calculateTop4Rate(totals.placementArray, totals.totalGames);
          const playRate = calculatePlayRate(totals.totalGames, totalGames);

          return {
            championId: champion.championId,
            wins: totals.wins,
            totalGames: totals.totalGames,
            averagePlacement,
            placementArray: totals.placementArray,
            winrate,
            top4Rate,
            playRate,
          };
        } else {
          const placementArray = champion.placementArray || [];
          const top4Rate = calculateTop4Rate(placementArray, champion.totalGames);
          const playRate = calculatePlayRate(champion.totalGames, totalGames);

          return {
            ...champion,
            top4Rate,
            playRate,
          };
        }
      });

      const sortedChampions = championsData.sort(
        (a, b) => Number(a.averagePlacement) - Number(b.averagePlacement)
      );

      const result = { totalGames, championData: sortedChampions };
      this.cache.set(cacheKey, { data: result, timestamp: Date.now() });

      return result;
    } catch (error) {
      console.error("Error fetching champion data:", error);
      return { championData: [], totalGames: 0 };
    }
  }

  static async updateMany(ranks: string[], championsRanking: any[]) {
    try {
      this.cache.clear();
      const db = await connectDB();
      const championsCollection = db.db(VERSION).collection("champions");
      const totalGamesCollection = db.db(VERSION).collection("totalGames");
      const totalGamesDoc = await totalGamesCollection.findOne({ id: "totalGames" });
      const globalTotalGames = totalGamesDoc?.count || 0;

      const actualRanks = ranks.filter((rank) => rank !== "all");
      if (actualRanks.length === 0) return { updatedChampions: [], totalGames: 0 };

      const updatedChampions = await Promise.all(
        championsRanking.map((champion) =>
          Promise.all(
            actualRanks.map((rank) =>
              this.updateSingleChampion(championsCollection, rank, champion, globalTotalGames)
            )
          ).then(() => champion)
        )
      );

      await this.updateTotalGamesCount(db, 7);

      const sortedUpdatedChampions = updatedChampions.sort(
        (a, b) => a.averagePlacement - b.averagePlacement
      );

      return { updatedChampions: sortedUpdatedChampions, totalGames:  0};
    } catch (error) {
      console.error("Error updating champions:", error);
      return { updatedChampions: [], totalGames: 0 };
    }
  }

  private static async updateSingleChampion(
    collection: any,
    rank: string,
    champion: any,
    globalTotalGames: number
  ) {
    const existingChampion = await collection.findOne(
      { championId: champion.championId },
      {
        projection: {
          championId: 1,
          totalGames: 1,
          wins: 1,
          winrate: 1,
          averagePlacement: 1,
          placementArray: 1,
          ranks: 1,
          cost: 1,
        },
      }
    );

    const globalStats = this.calculateGlobalStats(existingChampion, champion, globalTotalGames);
    const rankStats = this.calculateRankStats(existingChampion, champion, rank);

    await collection.updateOne(
      { championId: champion.championId },
      {
        $set: {
          championId: champion.championId,
          cost: champion.cost || existingChampion?.cost || 1,
          totalGames: globalStats.totalGames,
          wins: globalStats.wins,
          winrate: globalStats.winrate,
          placementArray: globalStats.placementArray,
          averagePlacement: globalStats.averagePlacement,
          top4Rate: globalStats.top4Rate,
          playRate: globalStats.playRate,
          [`ranks.${rank}`]: rankStats,
        },
      },
      { upsert: true }
    );

    console.log(`Updated ${champion.championId} (${rank})`);
    return { championId: champion.championId, ...globalStats };
  }

  private static calculateGlobalStats(existingChampion: any, champion: any, globalTotalGames: number) {
    const totalGames = (existingChampion?.totalGames || 0) + champion.totalGames;
    const wins = (existingChampion?.wins || 0) + champion.wins;
    const placementArray = [
      ...(existingChampion?.placementArray || []),
      ...champion.placementArray,
    ];

    const average =
      (champion.placement * champion.totalGames +
        (existingChampion?.averagePlacement || 0) * (existingChampion?.totalGames || 0)) /
      totalGames;

    const averagePlacement = Number(average.toFixed(2));
    const winrate = calculateWinrate(wins, totalGames);
    const top4Rate = calculateTop4Rate(placementArray, totalGames);
    const playRate = calculatePlayRate(totalGames, globalTotalGames);

    return { totalGames, wins, winrate, averagePlacement, placementArray, top4Rate, playRate };
  }

  private static calculateRankStats(existingChampion: any, champion: any, rank: string) {
    const winsRank = (existingChampion?.ranks?.[rank]?.wins || 0) + champion.wins;
    const totalGamesRank = (existingChampion?.ranks?.[rank]?.totalGames || 0) + champion.totalGames;

    const averagePlacementRank = Number(
      (
        (champion.placement * champion.totalGames +
          (existingChampion?.ranks?.[rank]?.averagePlacement || 0) *
            (existingChampion?.ranks?.[rank]?.totalGames || 0)) /
        totalGamesRank
      ).toFixed(2)
    );

    const winrateRank = calculateWinrate(winsRank, totalGamesRank);

    const placementArray = [
      ...(existingChampion?.ranks?.[rank]?.placementArray || []),
      ...champion.placementArray,
    ];

    return {
      totalGames: totalGamesRank,
      wins: winsRank,
      winrate: winrateRank,
      averagePlacement: averagePlacementRank,
      placementArray,
    };
  }

  private static async updateTotalGamesCount(db: any, increment: number) {
    await db
      .db(VERSION)
      .collection("totalGames")
      .updateOne({ id: "totalGames" }, { $inc: { count: increment } }, { upsert: true });
  }

  static clearCache() {
    this.cache.clear();
  }
}
