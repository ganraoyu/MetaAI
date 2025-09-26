import express from "express";
import { getLeaderBoards } from "../../controllers/leaderboard/leaderboard.controller";
const router = express.Router();

router.get("/:region/:mode/:rank/:division?", getLeaderBoards);

export default router;
