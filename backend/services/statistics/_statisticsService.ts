import { MatchFetcher } from "../riot/matchFetcher";
import { ChampionProcessor } from "./championProcessor";
import { ChampionRepository } from "../database/championRepository";
import { TraitProcessor } from "./traitProcessor";
import { TraitRepository } from "../database/traitRepository";

// Generic data service for fetch → process → DB operations
class DataService {
  constructor(
    private processor: { processMatches: (matches: any[]) => any[] },
    private repository: { getAll: () => any; updateMany: (data: any[]) => any }
  ) {}

  // Fetch + process live match data
  async getData(rank: string, division: string = "") {
    const matches = await MatchFetcher.fetchMatches(rank, division);
    return this.processor.processMatches(matches);
  }

  // Get data from DB
  async getDataFromDB() {
    return this.repository.getAll();
  }

  // Fetch live data and update DB
  async updateDBData(typeRanking: any[]) {
    return this.repository.updateMany(typeRanking);
  }

  // Directly update DB with provided data
  async updateDataDirect(data: any[]) {
    return this.repository.updateMany(data);
  }
}

export const ChampionService = new DataService(ChampionProcessor, ChampionRepository);
export const TraitService = new DataService(TraitProcessor, TraitRepository);

export class StatisticsService {
  // Champion methods
  static async getChampionData(rank: string, division: string = "") {
    return ChampionService.getData(rank, division);
  }

  static async getChampionDataFromDB() {
    return ChampionService.getDataFromDB();
  }

  static async updateChampionStatistics(championData: any[]) {
    return ChampionService.updateDBData(championData);
  }

  static async updateChampionDirect(data: any[]) {
    return ChampionService.updateDataDirect(data);
  }

  // Trait methods
  static async getTraitData(rank: string, division: string = "") {
    return TraitService.getData(rank, division);
  }

  static async getTraitDataFromDB() {
    return TraitService.getDataFromDB();
  }

  static async updateTraitStatistics(traitData: any[]) {
    return TraitService.updateDBData(traitData);
  }

  static async updateTraitDirect(data: any[]) {
    return TraitService.updateDataDirect(data);
  }
}
