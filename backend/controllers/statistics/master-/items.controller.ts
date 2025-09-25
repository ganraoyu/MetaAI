import { Request, Response } from "express";
import getItemsRankingClient from "../../../utils/stats/itemsUtils";

const getBelowMasterItemsData = async (req: Request, res: Response): Promise<void> => {
  const { rank, division } = req.params;

  try {
    console.log(rank, division);
    const itemsRanking = await getItemsRankingClient(rank, division);
    res.json(itemsRanking);
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Error fetching items data");
  }
};

export { getBelowMasterItemsData };
