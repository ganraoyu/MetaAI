const express = require('express');
const router = express.Router();

const { fetchWinRate, attackDamageDelt, abilityDamageDelt } = require('../../../../simulators/battle-simulator/core/battleStatistics.js');

router.get('/winRate', fetchWinRate);
router.get('/attackDamageDelt', attackDamageDelt);
router.get('/abilityDamageDelt', abilityDamageDelt);

module.exports = router;
