import { Request, Response } from "express";
import { StatisticsService } from "../../services/statistics/_statisticsService";
import { ALL_RANKS } from "../../utilities/rankTypes";

export const updateAllStatistics = async (req: Request, res: Response) => {
  try {
    const rankArray: string[] = (Array.isArray(req.query.rank) ? req.query.rank : [req.query.rank])
      .filter(Boolean)
      .map((r) => String(r).toLowerCase());

    const validRanks = rankArray.filter((r) => ALL_RANKS.includes(r));
    const finalRanks = validRanks.length > 0 ? validRanks : ["all"];

    const {
      updatedChampions,
      championTotalGames,
      updatedItems,
      itemTotalGames,
      updatedTraits,
      traitTotalGames,
      updatedChampionItems,
    } = await StatisticsService.updateAllStatistics(finalRanks);

    res.json({
      updatedChampions,
      championTotalGames,
      updatedItems,
      itemTotalGames,
      updatedTraits,
      traitTotalGames,
      updatedChampionItems,
    });
  } catch (error: any) {
    console.error(`Error updating statistics:`, error.message);
    res.status(500).send(`Error updating statistics`);
  }
};
