import { Request, Response } from "express";
import { StatisticsService } from "../../services/statistics/_statisticsService";

// Fetch champion data from DB, no API calls
const getAboveMasterChampionData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    const rank = ["master", "grandmaster", "challenger"].includes(req.params.rank.toLowerCase()) ? req.params.rank.toLowerCase() : "all";
    const { totalGames, championData } = await StatisticsService.getChampionDataFromDB(rank);
    res.json({ totalGames, championData });
  } catch (error: any) {
    console.error(`Error fetching ${rank} players:`, error.message);
    res.status(500).send(`Error fetching ${rank} players`);
  }
};

// Fetch new data from Riot API and update DB
const getUpdatedAboveMasterChampionData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    const championRanking = await StatisticsService.getChampionData(rank);

    if (!championRanking || !Array.isArray(championRanking)) {
      res.status(400).send(`No champion data available for ${rank}`);
      return;
    }
    const { updatedChampions, totalGames } = await StatisticsService.updateChampionStatistics(rank,
      championRanking
    );

    res.json({ totalGames, updatedChampions });
  } catch (error: any) {
    console.error(`Error fetching ${rank} players:`, error.message);
    res.status(500).send(`Error fetching ${rank} players`);
  }
};

export { getAboveMasterChampionData, getUpdatedAboveMasterChampionData };
