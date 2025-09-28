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
    private repository: { getAll: (rank: string) => any; updateMany: (rank: string, data: any[]) => any }
  ) {}

  // Fetch + process live match data
  async getData(rank: string, division: string = "") {
    const matches = await MatchFetcher.fetchMatches(rank, division);
    return this.processor.processMatches(matches);
  }

  // Get data from DB
  async getDataFromDB(rank: string) {
    return this.repository.getAll(rank);
  }

  // Fetch live data and update DB
  async updateDBData(rank: string, typeRanking: any[]) {
    return this.repository.updateMany(rank, typeRanking);
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

  static async getChampionDataFromDB(rank: string) {
    return ChampionService.getDataFromDB(rank);
  }

  static async updateChampionStatistics(rank: string, championData: any[]) {
    return ChampionService.updateDBData(rank, championData);
  }

  // Trait methods
  static async getTraitData(rank: string, division: string = "") {
    return TraitService.getData(rank, division);
  }

  static async getTraitDataFromDB(rank: string) {
    return TraitService.getDataFromDB(rank);
  }

  static async updateTraitStatistics(rank:string, traitData: any[]) {
    return TraitService.updateDBData(rank, traitData);
  }

  // Item methods
  static async getItemData(rank: string, division: string = "") {
    return ItemService.getData(rank, division);
  }

  static async getItemDataFromDB(rank: string) {
    return ItemService.getDataFromDB(rank);
  }

  static async updateItemStatistics(rank:string, itemData: any[]) {
    return ItemService.updateDBData(rank, itemData);
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
      const { updatedChampions, totalGames: championTotalGames } = await ChampionRepository.updateMany(rank, championRanking);
      const { updatedItems, totalGames: itemTotalGames } = await ItemRepository.updateMany(rank, itemRanking);
      const { updatedTraits, totalGames: traitTotalGames } = await TraitRepository.updateMany(rank, traitRanking);

      console.log(
        `Updated all statistics for ${rank} ${division}: ${updatedChampions?.length} champions, ${updatedItems.length} items, ${updatedTraits.length} traits`
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
