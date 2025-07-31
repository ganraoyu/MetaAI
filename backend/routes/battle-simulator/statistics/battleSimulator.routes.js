const express = require('express');
const router = express.Router();

const { 
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
    sendLineUp,
    startBattleWithBoard 
    } = require('../../../controllers/battle-simulator/battle-simulator.controller.js');

router.get('/winRate', getWinRate);
router.get('/championItems', getChampionItems);
router.get('/attackDamageDelt', getAttackDamageDelt);
router.get('/abilityDamageDelt', getAbilityDamageDelt);
router.get('/allDamageDelt', getAllDamageDelt);
router.get('/healing', getHealing);
router.get('/aliveOrDead', getAliveOrDead);
router.get('/allBattleStatistics', getAllBattleStatistics);
router.get('/championStatistics', getChampionStatistics);
router.get('/battle-history', getBattleHistory);
router.post('/sendLineUp', sendLineUp);

router.post('/start-battle', startBattleWithBoard);

module.exports = router;