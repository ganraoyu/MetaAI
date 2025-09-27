import { Request, Response } from "express";
import { StatisticsService } from "../../../services/statistics/_statisticsService";

export const updateAllStatistics = async (req: Request, res: Response) => {
  const { rank } = req.params as { rank: string };

  try {
   await StatisticsService.updateAllStatistics(rank);
   res.sendStatus(204); 
  } catch (error: any) {
    console.error(`Error fetching ${rank} players:`, error.message);
    res.status(500).send(`Error fetching ${rank} players`);
  }
};
