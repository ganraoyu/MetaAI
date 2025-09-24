import { Request, Response } from "express";
import { getChampionDataFromDB, getChampionData, updateChampionDataInDB } from "../../../utils/statisticsUtils/championsUtils";

const getAboveMasterChampionData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    const championRanking = await getChampionDataFromDB();
    res.json(championRanking);
  } catch (error: any) {
    console.error(`Error fetching ${rank} players:`, error.message);
    res.status(500).send(`Error fetching ${rank} players`);
  }
};

const getUpdatedAboveMasterChampionData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    const championRanking = await getChampionData(rank);
    const updatedChampionRanking = await updateChampionDataInDB(championRanking);
    res.json(updatedChampionRanking);
  } catch (error: any) {
    console.error(`Error fetching ${rank} players:`, error.message);
    res.status(500).send(`Error fetching ${rank} players`);
  }
};

export { getAboveMasterChampionData, getUpdatedAboveMasterChampionData };
