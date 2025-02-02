const express = require('express');
const router = express.Router();

const { calculateWinRate, calculateAttackDamageDelt, calculateAbilityDamageDelt, calculateAllDamageDelt } = require('../../../../simulators/battle-simulator/core/battleStatistics.js');

router.get('/winRate', calculateWinRate);
router.get('/attackDamageDelt', calculateAttackDamageDelt);
router.get('/abilityDamageDelt', calculateAbilityDamageDelt);
router.get('/allDamageDelt', calculateAllDamageDelt);

module.exports = router;
