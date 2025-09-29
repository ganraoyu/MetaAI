import { Request, Response } from "express";
import { StatisticsService } from "../../services/statistics/_statisticsService";

export const getChampionItemData = async (req: Request, res: Response)=> {
  const { rank } = req.params as { rank: string };
  
  try {
    const rank = ["master", "grandmaster", "challenger"].includes(req.params.rank.toLowerCase()) ? req.params.rank.toLowerCase() : "all";
    
    const championItemRanking = await StatisticsService.getChampionItemDataFromDB(rank);
    res.json(championItemRanking)
  } catch (error: any ) {
      console.log(error)
  }
};

export const getUpdatedChampionItemData = async (req: Request, res: Response)=> {
  const { rank } = req.params as { rank: string };
  
  try {
    const championItemRanking = await StatisticsService.getChampionItemData(rank);

    if (!championItemRanking || !Array.isArray(championItemRanking)) {
      res.status(400).send(`No champion item data available for ${rank}`);
      return;
    }
    const { updatedChampionItems, totalGames } = await StatisticsService.updateChampionItemStatistics(rank,
      championItemRanking
    );
    
    
    res.json({ totalGames, updatedChampionItems })
  } catch (error: any ) {
      console.log(error)
  }
};