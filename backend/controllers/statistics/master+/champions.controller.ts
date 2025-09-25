import { Request, Response } from "express";
import { getChampionDataFromDB, getChampionData, updateChampionDataInDB } from "../../../utils/stats/championData";

const getAboveMasterChampionData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    const { totalGames, championData } = await getChampionDataFromDB();
    res.json({ totalGames, championData });
  } catch (error: any) {
    console.error(`Error fetching ${rank} players:`, error.message);
    res.status(500).send(`Error fetching ${rank} players`);
  }
};

const getUpdatedAboveMasterChampionData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    const championRanking = await getChampionData(rank);
    const { updatedChampions, totalGames } = await updateChampionDataInDB(championRanking);

    res.json({ totalGames, updatedChampions });
  } catch (error: any) {
    console.error(`Error fetching ${rank} players:`, error.message);
    res.status(500).send(`Error fetching ${rank} players`);
  }
};

export { getAboveMasterChampionData, getUpdatedAboveMasterChampionData };
