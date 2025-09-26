import { Request, Response } from "express";
import traitsClient from "../../../utilities/statisticsUtils/traitsUtils";

const getAboveMasterTraitsData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    const traitsRanking = await traitsClient(rank);
    res.json(traitsRanking);
  } catch (error: any) {
    console.error(`Error fetching ${rank} traits:`, error.message);
    res.status(500).send(`Error fetching ${rank} traits`);
  }
};

export { getAboveMasterTraitsData };
