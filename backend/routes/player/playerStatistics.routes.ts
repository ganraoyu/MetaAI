import express, { Router, Request, Response } from 'express';
import {
  getPlayerWinRate,
  getPlayerMostPlayedTraits,
  getPlayerMostPlayedAugments,
} from '../../controllers/player/playerStatistics.controller';

const router: Router = express.Router();

router.get('/:region/:gameName/:tagLine/winrate', getPlayerWinRate);
router.get('/:region/:gameName/:tagLine/traits', getPlayerMostPlayedTraits);
router.get('/:region/:gameName/:tagLine/augments', getPlayerMostPlayedAugments);

export default router;
