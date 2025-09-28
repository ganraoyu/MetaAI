import { Request, Response } from "express";
import { StatisticsService } from "../../services/statistics/_statisticsService";

const getAboveMasterItemsData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    const { totalGames, itemData } = await StatisticsService.getItemDataFromDB(rank);

    res.json({ totalGames, itemData });
  } catch (error: any) {
    console.error(`Error fetching ${rank} items data:`, error.message);
    res.status(500).send(`Error fetching ${rank} items data`);
  }
};

const getUpdatedAboveMasterItemsData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    const itemRanking = await StatisticsService.getItemData(rank);

    const { updatedItems, totalGames } = await StatisticsService.updateItemStatistics(rank, itemRanking);

    res.json({ totalGames, itemsRanking: updatedItems });
  } catch (error: any) {
    console.error(`Error updating ${rank} items data:`, error.message);
    res.status(500).send(`Error updating ${rank} items data`);
  }
};

export { getAboveMasterItemsData, getUpdatedAboveMasterItemsData };
