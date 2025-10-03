import { Request, Response } from "express";
import { StatisticsService } from "../../services/statistics/_statisticsService";
import { ALL_RANKS } from "../../utilities/rankTypes";

// Fetch items from DB
const getAboveMasterItemsData = async (req: Request, res: Response): Promise<void> => {
  try {
    const rankArray: string[] = (Array.isArray(req.query.rank) ? req.query.rank : [req.query.rank])
      .filter(Boolean)
      .map((r) => String(r).toLowerCase());

    const validRanks = rankArray.filter((r) => ALL_RANKS.includes(r));
    const finalRanks = validRanks.length > 0 ? validRanks : ["all"];

    const { totalGames, itemData } = await StatisticsService.getItemDataFromDB(finalRanks);

    res.json({ totalGames, itemData });
  } catch (error: any) {
    console.error(`Error fetching items:`, error.message);
    res.status(500).send(`Error fetching items`);
  }
};

// Fetch new data from Riot API and update DB
const getUpdatedAboveMasterItemsData = async (req: Request, res: Response): Promise<void> => {
  try {
    const rankArray: string[] = (Array.isArray(req.query.rank) ? req.query.rank : [req.query.rank])
      .filter(Boolean)
      .map((r) => String(r).toLowerCase());

    const validRanks = rankArray.filter((r) => ALL_RANKS.includes(r));
    const finalRanks = validRanks.length > 0 ? validRanks : ["all"];

    const results = await Promise.all(
      finalRanks.map(async (rank) => {
        console.log(`Processing rank: ${rank}`);

        const itemRanking = await StatisticsService.getItemData([rank]);

        if (!itemRanking || !Array.isArray(itemRanking)) {
          return { rank, error: `No item data available for ${rank}` };
        }

        const { updatedItems, totalGames } = await StatisticsService.updateItemStatistics(
          [rank],
          itemRanking
        );

        return { rank, totalGames, updatedItems };
      })
    );

    res.json(results);
  } catch (error: any) {
    console.error(`Error updating items:`, error.message);
    res.status(500).json({
      error: "Error updating items",
      message: error.message,
    });
  }
};

export { getAboveMasterItemsData, getUpdatedAboveMasterItemsData };
