import { Request, Response } from "express";
import championsClient from "../../../utils/statisticsUtils/championsUtils";

const getAboveMasterChampionData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    const championRanking = await championsClient(rank);
    res.json(championRanking);
  } catch (error: any) {
    console.error(`Error fetching ${rank} players:`, error.message);
    res.status(500).send(`Error fetching ${rank} players`);
  }
};

export { getAboveMasterChampionData };
