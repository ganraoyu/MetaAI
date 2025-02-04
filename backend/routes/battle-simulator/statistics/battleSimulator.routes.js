const express = require('express');
const router = express.Router();

const { 
    getWinRate,    
    getAttackDamageDelt, 
    getAbilityDamageDelt, 
    getAllDamageDelt,
    getHealing
    } = require('../../../controllers/battle-simulator/battle-simulator.controller.js');

router.get('/winRate', getWinRate);
router.get('/attackDamageDelt', getAttackDamageDelt);
router.get('/abilityDamageDelt', getAbilityDamageDelt);
router.get('/allDamageDelt', getAllDamageDelt);
router.get('/healing', getHealing)

module.exports = router;
