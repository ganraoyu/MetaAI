import { Request, Response } from "express";
import { StatisticsService } from "../../services/statistics/_statisticsService";
import { ALL_RANKS } from "../../utilities/rankTypes";

// Fetch traits from DB
const getAboveMasterTraitsData = async (req: Request, res: Response): Promise<void> => {
  try {
    const rankArray: string[] = (Array.isArray(req.query.rank) ? req.query.rank : [req.query.rank])
      .filter(Boolean)
      .map((r) => String(r).toLowerCase());

    const validRanks = rankArray.filter((r) => ALL_RANKS.includes(r));

    const finalRanks = validRanks.length > 0 ? validRanks : ["all"];

    const { totalGames, traitData } = await StatisticsService.getTraitDataFromDB(finalRanks);

    res.json({ totalGames, traitData });
  } catch (error: any) {
    console.error(`Error fetching traits:`, error.message);
    res.status(500).send(`Error fetching traits`);
  }
};

// Fetch new data from Riot API and update DB
const getUpdatedAboveMasterTraitsData = async (req: Request, res: Response): Promise<void> => {
  try {
    const rankArray: string[] = (Array.isArray(req.query.rank) ? req.query.rank : [req.query.rank])
      .filter(Boolean)
      .map((r) => String(r).toLowerCase());

    const validRanks = rankArray.filter((r) => ALL_RANKS.includes(r));

    const results = await Promise.all(
      validRanks.map(async (rank) => {
        console.log(`Processing rank: ${rank}`);

        const traitRanking = await StatisticsService.getTraitData([rank]);

        if (!traitRanking || !Array.isArray(traitRanking)) {
          return { rank, error: `No trait data available for ${rank}` };
        }

        const { updatedTraits, totalGames } = await StatisticsService.updateTraitStatistics(
          [rank],
          traitRanking
        );

        return { rank, totalGames, updatedTraits };
      })
    );

    res.json(results);
  } catch (error: any) {
    console.error(`Error updating traits:`, error.message);
    res.status(500).json({
      error: "Error updating traits",
      message: error.message,
    });
  }
};

export { getAboveMasterTraitsData, getUpdatedAboveMasterTraitsData };
