import { MatchFetcher } from "../riot/matchFetcher";
import { ChampionProcessor } from "./championProcessor";
import { ChampionRepository } from "../database/championRepository";
import { TraitProcessor } from "./traitProcessor";
import { TraitRepository } from "../database/traitRepository";
import { ItemProcessor } from "./itemProcessor";
import { ItemRepository } from "../database/itemRepository";
import { ChampionItemProcessor } from "./championItemProcessor";
import { ChampionItemRepository } from "../database/championItemRepository";

// Generic data service for fetch → process → DB operations
class DataService {
  constructor(
    private processor: { processMatches: (matches: any[]) => any[] },
    private repository: {
      getAll: (ranks: string[]) => any;
      updateMany: (ranks: string[], data: any[]) => any;
    }
  ) {}

  // Fetch + process live match data
  async getData(ranks: string[], division: string = "") {
    const matches = await MatchFetcher.fetchMatches(ranks.slice(0, 1), division);
    return this.processor.processMatches(matches);
  }

  async getDataFromDB(ranks: string[]) {
    return this.repository.getAll(ranks);
  }

  // Fetch live data and update DB
  async updateDBData(ranks: string[], typeRanking: any[]) {
    return this.repository.updateMany(ranks, typeRanking);
  }
}

export const ChampionService = new DataService(ChampionProcessor, ChampionRepository);
export const TraitService = new DataService(TraitProcessor, TraitRepository);
export const ItemService = new DataService(ItemProcessor, ItemRepository);
export const ChampionItemService = new DataService(ChampionItemProcessor, ChampionItemRepository);

export class StatisticsService {
  // Champion methods
  static async getChampionData(ranks: string[], division: string = "") {
    return ChampionService.getData(ranks, division);
  }

  static async getChampionDataFromDB(ranks: string[]) {
    return ChampionService.getDataFromDB(ranks);
  }

  static async updateChampionStatistics(ranks: string[], championData: any[]) {
    return ChampionService.updateDBData(ranks, championData);
  }

  // Trait methods
  static async getTraitData(ranks: string[], division: string = "") {
    return TraitService.getData(ranks, division);
  }

  static async getTraitDataFromDB(ranks: string[]) {
    return TraitService.getDataFromDB(ranks);
  }

  static async updateTraitStatistics(ranks: string[], traitData: any[]) {
    return TraitService.updateDBData(ranks, traitData);
  }

  // Item methods
  static async getItemData(ranks: string[], division: string = "") {
    return ItemService.getData(ranks, division);
  }

  static async getItemDataFromDB(ranks: string[]) {
    return ItemService.getDataFromDB(ranks);
  }

  static async updateItemStatistics(ranks: string[], itemData: any[]) {
    return ItemService.updateDBData(ranks, itemData);
  }

  // Champion Item methods
  static async getChampionItemData(ranks: string[], division: string = "") {
    return ChampionItemService.getData(ranks, division);
  }

  static async getChampionItemDataFromDB(ranks: string[]) {
    return ChampionItemService.getDataFromDB(ranks);
  }

  static async updateChampionItemStatistics(ranks: string[], championData: any[]) {
    return ChampionItemService.updateDBData(ranks, championData);
  }

  // Update all statistics
  static async updateAllStatistics(ranks: string[], division: string = "") {
    try {
      const matches = await MatchFetcher.fetchMatches(ranks.slice(0, 1), division);

      if (!matches || !matches.length) {
        console.log(`No matches found for ${ranks.join(", ")} ${division}`);
        return { updatedChampions: [], updatedTraits: [], totalGames: 0 };
      }

      const championRanking = ChampionProcessor.processMatches(matches);
      const itemRanking = ItemProcessor.processMatches(matches);
      const traitRanking = TraitProcessor.processMatches(matches);
      const championItemRanking = ChampionItemProcessor.processMatches(matches);

      const { updatedChampions, totalGames: championTotalGames } =
        await ChampionRepository.updateMany(ranks, championRanking);
      const { updatedItems, totalGames: itemTotalGames } = await ItemRepository.updateMany(
        ranks,
        itemRanking
      );
      const { updatedTraits, totalGames: traitTotalGames } = await TraitRepository.updateMany(
        ranks,
        traitRanking
      );
      const { updatedChampionItems } = await ChampionItemRepository.updateMany(
        ranks,
        championItemRanking
      );

      console.log(
        `Updated all statistics for ${ranks.join(", ")} ${division}: ${
          updatedChampions?.length
        } champions, ${updatedItems.length} items, ${updatedTraits.length} traits`
      );

      return {
        updatedChampions,
        championTotalGames,
        updatedItems,
        itemTotalGames,
        updatedTraits,
        traitTotalGames,
        updatedChampionItems,
      };
    } catch (error: any) {
      console.error("Error updating all statistics:", error.message);
      throw new Error("Failed to update all statistics");
    }
  }
}
