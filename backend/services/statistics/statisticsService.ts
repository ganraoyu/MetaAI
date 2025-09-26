import { MatchFetcher } from "../riot/matchFetcher";
import { ChampionProcessor } from "./championProcessor";
import { ChampionRepository } from "../database/championRepository";

export class StatisticsService {
  static async getChampionData(rank: string, division: string = "") {
    const matches = await MatchFetcher.fetchMatches(rank, division);
    return ChampionProcessor.processMatches(matches);
  }

  static async getChampionDataFromDB() {
    return ChampionRepository.getAll();
  }

  static async updateChampionDataInDB(championRanking: any[]) {
    return ChampionRepository.updateMany(championRanking);
  }

  // Main method that combines everything
  static async updateChampionStatistics(rank: string, division: string = "") {
    const championRanking = await this.getChampionData(rank, division);
    return this.updateChampionDataInDB(championRanking);
  }
}