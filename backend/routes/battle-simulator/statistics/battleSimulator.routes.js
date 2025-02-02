const express = require('express');
const router = express.Router();

const { fetchWinRate, totalDamageDelt } = require('../../../../simulators/battle-simulator/core/battleStatistics.js');

router.get('/winRate', fetchWinRate);
router.get('/totalDamageDelt', totalDamageDelt);

module.exports = router;
