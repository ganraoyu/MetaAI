import { Request, Response } from "express";
import itemsClient from "../../../utils/statisticsUtils/itemsUtils";

const getAboveMasterItemsData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    console.log(rank);
    const itemsRanking = await itemsClient(rank);
    res.json(itemsRanking);
  } catch (error: any) {
    console.error(`Error fetching ${rank} items data:`, error.message);
    res.status(500).send(`Error fetching ${rank} items data`);
  }
};

export { getAboveMasterItemsData };
