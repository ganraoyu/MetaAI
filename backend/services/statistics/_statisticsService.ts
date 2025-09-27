import { MatchFetcher } from "../riot/matchFetcher";
import { ChampionProcessor } from "./championProcessor";
import { ChampionRepository } from "../database/championRepository";
import { TraitProcessor } from "./traitProcessor";
import { TraitRepository } from "../database/traitRepository";
import { ItemProcessor } from "./itemProcessor";
import { ItemRepository } from "../database/itemRepository";

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
export const ItemService = new DataService(ItemProcessor, ItemRepository);

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

  // Item methods
  static async getItemData(rank: string, division: string = "") {
    return ItemService.getData(rank, division);
  }

  static async getItemDataFromDB() {
    return ItemService.getDataFromDB();
  }

  static async updateItemStatistics(traitData: any[]) {
    return ItemService.updateDBData(traitData);
  }

  static async updateItemDirect(data: any[]) {
    return ItemService.updateDataDirect(data);
  }

  static async updateAllStatistics(rank: string, division: string = "") {
    try {
      // Fetch live match data for this rank/division
      const matches = await MatchFetcher.fetchMatches(rank, division);

      if (!matches || !matches.length) {
        console.log(`No matches found for ${rank} ${division}`);
        return { updatedChampions: [], updatedTraits: [], totalGames: 0 };
      }

      // Process champion and trait data
      const championRanking = ChampionProcessor.processMatches(matches);
      const itemRanking = ItemProcessor.processMatches(matches);
      const traitRanking = TraitProcessor.processMatches(matches);

      // Update DB for both
      const { updatedChampions, totalGames: championTotalGames } = await ChampionRepository.updateMany(championRanking);
      const { updatedItems, totalGames: itemTotalGames } = await ItemRepository.updateMany(itemRanking);
      const { updatedTraits, totalGames: traitTotalGames } = await TraitRepository.updateMany(traitRanking);

      console.log(
        `Updated all statistics for ${rank} ${division}: ${updatedChampions.length} champions, ${updatedItems.length} items, ${updatedTraits.length} traits`
      );

      return {
        updatedChampions,
        championTotalGames,
        updatedItems,
        itemTotalGames,
        updatedTraits,
        traitTotalGames,
      };
    } catch (error: any) {
      console.error("Error updating all statistics:", error.message);
      throw new Error("Failed to update all statistics");
    }
  }
}
