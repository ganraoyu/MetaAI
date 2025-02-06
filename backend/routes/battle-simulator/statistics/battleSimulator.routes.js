const express = require('express');
const router = express.Router();

const { 
    getWinRate,    
    getAttackDamageDelt, 
    getAbilityDamageDelt, 
    getAllDamageDelt,
    getHealing,
    getAliveOrDead,
    getAllBattleStatistics
    } = require('../../../controllers/battle-simulator/battle-simulator.controller.js');

router.get('/winRate', getWinRate);
router.get('/attackDamageDelt', getAttackDamageDelt);
router.get('/abilityDamageDelt', getAbilityDamageDelt);
router.get('/allDamageDelt', getAllDamageDelt);
router.get('/healing', getHealing);
router.get('/aliveOrDead', getAliveOrDead);
router.get('/allBattleStatistics', getAllBattleStatistics);

module.exports = router;
