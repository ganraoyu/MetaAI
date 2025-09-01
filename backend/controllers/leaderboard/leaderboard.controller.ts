import { Request, Response } from 'express';
import { shortRegionClient } from '../../utils/generalUtils';
import { queues, queueMapping } from '../../utils/queueData';

const getAboveMasterLeaderboards = async (
  endpoint: string,
  res: Response,
  rank: string,
  region: string,
  mode: string,
) => {
  try {
    const queue = queueMapping[mode as keyof typeof queueMapping];
    const client = shortRegionClient(region);
    const response = await client.get(`/tft/league/v1/${endpoint}?queue=${queue}`);

    if (!region) {
      return res.status(400).send('Please provide a region as a path parameter');
    }

    const playerData = Object.entries(response.data.entries).map(
      ([index, entry]: [string, any]) => {
        return {
          rank: parseInt(index) + 1,
          summonerId: entry.summonerId,
          leaguePoints: entry.leaguePoints,
          winrate: ((entry.wins / (entry.wins + entry.losses)) * 100).toFixed(2) + '%',
          wins: entry.wins,
          losses: entry.losses,
        };
      },
    );

    res.json({ playerData });
  } catch (error: any) {
    console.error(
      `Error fetching ${rank} data:`,
      error.response ? error.response.data : error.message,
    );
    res.status(500).send(`Error connecting to Riot API for ${rank}`);
  }
};

const getBelowMasterLeaderboards = async (
  res: Response,
  region: string,
  rank: string,
  division: string,
  mode: string,
) => {
  try {
    const queue = queueMapping[mode as keyof typeof queueMapping];
    const client = shortRegionClient(region);
    const response = await client.get(
      `/tft/league/v1/entries/${rank.toUpperCase()}/${division.toUpperCase()}?queue=${queue}`,
    );

    const playerData = response.data.map((entry: any, index: number) => {
      const { summonerId, wins, losses, leaguePoints } = entry;
      return {
        rank: index + 1,
        leaguePoints,
        summonerId,
        winrate: ((wins / (wins + losses)) * 100).toFixed(2) + '%',
        wins,
        losses,
      };
    });

    res.json({ playerData });
  } catch (error: any) {
    console.log(error);
  }
};

const getChallengerLeaderboard = (req: Request, res: Response) => {
  const region = req.params.region;
  const mode = req.params.mode;
  getAboveMasterLeaderboards('challenger', res, 'Challenger', region, mode);
};

const getGrandmasterLeaderboard = (req: Request, res: Response) => {
  const region = req.params.region;
  const mode = req.params.mode;
  getAboveMasterLeaderboards('grandmaster', res, 'Grandmaster', region, mode);
};

const getMasterLeaderboard = (req: Request, res: Response) => {
  const region = req.params.region;
  const mode = req.params.mode;
  getAboveMasterLeaderboards('master', res, 'Master', region, mode);
};

const getBelowMasterLeaderboard = (req: Request, res: Response) => {
  const { region, rank, division, mode } = req.params;
  console.log(region, rank, division);
  getBelowMasterLeaderboards(res, region, rank, division, mode);
};

export {
  getChallengerLeaderboard,
  getGrandmasterLeaderboard,
  getMasterLeaderboard,
  getBelowMasterLeaderboard,
};
