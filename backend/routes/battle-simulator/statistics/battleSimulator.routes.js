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
    getBattleHistory
    } = require('../../../controllers/battle-simulator/battle-simulator.controller.js');

router.get('/winRate', getWinRate);
router.get('/championItems', getChampionItems);
router.get('/attackDamageDelt', getAttackDamageDelt);
router.get('/abilityDamageDelt', getAbilityDamageDelt);
router.get('/allDamageDelt', getAllDamageDelt);
router.get('/healing', getHealing);
router.get('/aliveOrDead', getAliveOrDead);
router.get('/allBattleStatistics', getAllBattleStatistics);
router.get('/battleHistory', getBattleHistory);

module.exports = router;
