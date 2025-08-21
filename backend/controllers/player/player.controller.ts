import { Request, Response } from 'express';
import { fetchPlayerPuuid, fetchPlayerMatches } from '../../utils/playerUtils';

const getPlayerPuuid = async (req: Request, res: Response): Promise<void> => {
  const { gameName, tagLine, region } = req.params;
  try {
    const playerPuuid = await fetchPlayerPuuid(gameName, tagLine, region);
    if (!playerPuuid) {
      res.status(404).send('Player not found');
      return;
    }

    res.json({ puuid: playerPuuid });
  } catch (error: any) {
    console.error(
      'Error fetching player PUUID:',
      error.response ? error.response.data : error.message
    );
    res.status(500).send('Error fetching player PUUID');
  }
};

const getPlayerMatches = async (req: Request, res: Response): Promise<void> => {
  const { gameName, tagLine, region } = req.params;

  try {
    const playerMatchDetails = await fetchPlayerMatches(gameName, tagLine, region);
    if (!playerMatchDetails || playerMatchDetails.length === 0) {
      res.status(404).send('Matches not found');
      return;
    }

    res.json({ matches: playerMatchDetails });
  } catch (error: any) {
    console.error(
      'Error fetching player matches:',
      error.response ? error.response.data : error.message
    );
    res.status(500).send('Error fetching player matches');
  }
};

export { getPlayerPuuid, getPlayerMatches };
