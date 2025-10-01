import { Request, Response } from "express";
import { StatisticsService } from "../../services/statistics/_statisticsService";

export const updateAllStatistics = async (req: Request, res: Response) => {
  const { rank } = req.params as { rank: string };

  try {
    const {
      updatedChampions,
      championTotalGames,
      updatedItems,
      itemTotalGames,
      updatedTraits,
      traitTotalGames,
      updatedChampionItems,
      championItemTotalGames,
    } = await StatisticsService.updateAllStatistics(rank);

    res.json({
      updatedChampions,
      championTotalGames,
      updatedItems,
      itemTotalGames,
      updatedTraits,
      traitTotalGames,
      updatedChampionItems,
      championItemTotalGames,
    });
    
  } catch (error: any) {
    console.error(`Error fetching ${rank} players:`, error.message);
    res.status(500).send(`Error fetching ${rank} players`);
  }
};
