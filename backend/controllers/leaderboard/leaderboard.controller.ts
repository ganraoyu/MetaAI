import { Request, Response } from "express";
import { LeaderboardService } from "../../services/riot/leaderboardService";

const getLeaderBoards = async (req: Request, res: Response) => {
  const { region, mode, rank, division } = req.params as {
    region: string;
    mode: keyof typeof import("../../utilities/queueMappings").queueMapping;
    rank: string;
    division?: string;
  };

  try {
    const leaderboard = await LeaderboardService.getLeaderboard({
      region,
      rank,
      division,
      mode,
    });

    res.json(leaderboard);
  } catch (error: any) {
    console.error("Error fetching leaderboard:", error.message);
    res.status(400).send(error.message);
  }
};

export { getLeaderBoards };
