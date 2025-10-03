import { Request, Response } from "express";
import { StatisticsService } from "../../services/statistics/_statisticsService";
import { ALL_RANKS } from "../../utilities/rankTypes";

// Fetch champion-item data from DB
export const getChampionItemData = async (req: Request, res: Response) => {
  try {
    const rankArray: string[] = (Array.isArray(req.query.rank) ? req.query.rank : [req.query.rank])
      .filter(Boolean)
      .map((r) => String(r).toLowerCase());

    const validRanks = rankArray.filter((r) => ALL_RANKS.includes(r));
    const finalRanks = validRanks.length > 0 ? validRanks : ["all"];

    const championItemRanking = await StatisticsService.getChampionItemDataFromDB(finalRanks);
    res.json(championItemRanking);
  } catch (error: any) {
    console.error("Error fetching champion item data:", error);
    res.status(500).send("Error fetching champion item data");
  }
};

// Fetch new champion-item data from Riot API and update DB
export const getUpdatedChampionItemData = async (req: Request, res: Response) => {
  try {
    const rankArray: string[] = (Array.isArray(req.query.rank) ? req.query.rank : [req.query.rank])
      .filter(Boolean)
      .map((r) => String(r).toLowerCase());

    const validRanks = rankArray.filter((r) => ALL_RANKS.includes(r));
    const finalRanks = validRanks.length > 0 ? validRanks : ["all"];

    const results = await Promise.all(
      finalRanks.map(async (rank) => {
        console.log(`Processing rank: ${rank}`);

        const championItemRanking = await StatisticsService.getChampionItemData([rank]);

        if (!championItemRanking || !Array.isArray(championItemRanking)) {
          return { rank, error: `No champion item data available for ${rank}` };
        }

        const { updatedChampionItems, totalGames } =
          await StatisticsService.updateChampionItemStatistics([rank], championItemRanking);

        return { rank, totalGames, updatedChampionItems };
      })
    );

    res.json(results);
  } catch (error: any) {
    console.error("Error updating champion item data:", error);
    res.status(500).json({
      error: "Error updating champion item data",
      message: error.message,
    });
  }
};
