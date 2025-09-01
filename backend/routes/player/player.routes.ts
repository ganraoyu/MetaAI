import express, { Request, Response, NextFunction } from 'express';
import { getPlayerPuuid, getPlayerMatches } from '../../controllers/player/player.controller';

const router = express.Router();

router.get(
  '/:region/:gameName/:tagLine',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getPlayerPuuid(req, res);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/:region/matches/:gameName/:tagLine',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getPlayerMatches(req, res);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
