import { Request, Response } from "express";
import { StatisticsService } from "../../services/statistics/_statisticsService";

const getAboveMasterTraitsData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    const { totalGames, traitData } = await StatisticsService.getTraitDataFromDB(rank);
    
    res.json({ totalGames, traitData });
  } catch (error: any) {
    console.error(`Error fetching ${rank} traits:`, error.message);
    res.status(500).send(`Error fetching ${rank} traits`);
  }
};

const getUpdatedAboveMasterTraitsData = async (req: Request, res: Response): Promise<void> => {
  const { rank } = req.params as { rank: string };

  try {
    const traitRanking = await StatisticsService.getTraitData(rank);
    
    if (!traitRanking || !Array.isArray(traitRanking)) {
      res.status(400).send(`No trait data available for ${rank}`);
      return;
    }
    
    const { updatedTraits, totalGames } = await StatisticsService.updateTraitStatistics(rank, traitRanking);

    res.json({ totalGames, traitsRanking: updatedTraits });
  } catch (error: any) {
    console.error(`Error fetching ${rank} traits:`, error.message);
    res.status(500).send(`Error fetching ${rank} traits`);
  }
};

export { getAboveMasterTraitsData, getUpdatedAboveMasterTraitsData };