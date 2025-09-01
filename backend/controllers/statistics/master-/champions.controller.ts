import { Request, Response, RequestHandler } from 'express';
import championsClient from '../../../utils/statisticsUtils/championsUtils';

const getBelowMasterChampionData: RequestHandler = async (req, res) => {
  const { rank, division } = req.params;

  console.log('Rank:', rank, 'Division:', division);

  try {
    const championRanking = await championsClient(rank, division);
    res.json({ championRanking });
  } catch (error: any) {
    console.error(error);
    res.status(500).send('Error fetching champion data');
  }
};

export { getBelowMasterChampionData };
