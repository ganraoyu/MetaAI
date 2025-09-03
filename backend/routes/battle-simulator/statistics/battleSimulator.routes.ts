import express from "express";
const router = express.Router();

// @ts-ignore
import {
  getWinRate,
  getChampionItems,
  getAttackDamageDelt,
  getAbilityDamageDelt,
  getAllDamageDelt,
  getHealing,
  getAliveOrDead,
  getAllBattleStatistics,
  getChampionStatistics,
  getBattleHistory,
  startBattleWithBoard,
} from "../../../controllers/battle-simulator/battle-simulator.controller.js";

// GET routes for statistics
router.get("/winRate", getWinRate);
router.get("/championItems", getChampionItems);
router.get("/attackDamageDelt", getAttackDamageDelt);
router.get("/abilityDamageDelt", getAbilityDamageDelt);
router.get("/allDamageDelt", getAllDamageDelt);
router.get("/healing", getHealing);
router.get("/aliveOrDead", getAliveOrDead);
router.get("/allBattleStatistics", getAllBattleStatistics);
router.get("/championStatistics", getChampionStatistics);
router.get("/battle-history", getBattleHistory);

// POST route for starting battle with board data
router.post("/start-battle", startBattleWithBoard);

export default router;
