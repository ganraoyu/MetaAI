import { Request, Response } from "express";
import { StatisticsService } from "../../services/statistics/_statisticsService";
import { ALL_RANKS } from "../../utilities/rankTypes";

// Fetch champion data from DB
const getAboveMasterChampionData = async (req: Request, res: Response): Promise<void> => {
  try {
    const rankArray: string[] = (Array.isArray(req.query.rank) ? req.query.rank : [req.query.rank])
      .filter(Boolean)
      .map((r) => String(r).toLowerCase());

    const validRanks = rankArray.filter((r) =>ALL_RANKS.includes(r.toLowerCase())
    );

    const finalRanks = validRanks.length > 0 ? validRanks : ["all"];

    const { totalGames, championData } = await StatisticsService.getChampionDataFromDB(finalRanks);
    res.json({ totalGames, championData });
  } catch (error: any) {
    console.error(`Error fetching champions:`, error.message);
    res.status(500).send(`Error fetching champions`);
  }
};

// Fetch new data from Riot API and update DB
// Note: make this take parameter all as rank later on when getting production key
const getUpdatedAboveMasterChampionData = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Original query params:", req.query);

    const rankArray: string[] = (Array.isArray(req.query.rank) ? req.query.rank : [req.query.rank])
      .filter(Boolean)
      .map((r) => String(r).toLowerCase());

    const validRanks = rankArray.filter((r) =>ALL_RANKS.includes(r.toLowerCase())
    );

    const results = await Promise.all(
      validRanks.map(async (rank) => {
        console.log(`Processing rank: ${rank}`);

        // Pass only the current rank being processed
        const championRanking = await StatisticsService.getChampionData([rank]);

        if (!championRanking || !Array.isArray(championRanking)) {
          return { rank, error: `No champion data available for ${rank}` };
        }

        const { updatedChampions, totalGames } = await StatisticsService.updateChampionStatistics(
          [rank],
          championRanking
        );

        return { rank, totalGames, updatedChampions };
      })
    );

    res.json(results);
  } catch (error: any) {
    console.error(`Error updating champions:`, error.message);
    res.status(500).json({
      error: "Error updating champions",
      message: error.message,
    });
  }
};

export { getAboveMasterChampionData, getUpdatedAboveMasterChampionData };
