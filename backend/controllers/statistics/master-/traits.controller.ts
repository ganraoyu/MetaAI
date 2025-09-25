import { Request, Response } from "express";
import getTraitsRankingClient from "../../../utils/statisticsUtils/traitsUtils";

const getBelowMasterTraitsData = async (req: Request, res: Response): Promise<void> => {
  const { rank, division } = req.params as { rank: string; division: string };

  try {
    console.log("Fetching traits for:", rank, division);
    const traitsRanking = await getTraitsRankingClient(rank, division);
    res.json(traitsRanking);
  } catch (error: any) {
    console.error("Error fetching traits data:", error);
    res.status(500).send("Error fetching traits data");
  }
};

export { getBelowMasterTraitsData };
