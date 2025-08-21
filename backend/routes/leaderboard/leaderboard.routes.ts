import express from 'express';
const router = express.Router();
import { getChallengerLeaderboard, getMasterLeaderboard, getGrandmasterLeaderboard, getBelowMasterLeaderboard } from '../../controllers/leaderboard/leaderboard.controller';

router.get('/:region/:mode/challenger', getChallengerLeaderboard);
router.get('/:region/:mode/grandmaster', getGrandmasterLeaderboard);
router.get('/:region/:mode/master', getMasterLeaderboard);
router.get('/:region/:mode/:rank/:division', getBelowMasterLeaderboard)

export default router;
