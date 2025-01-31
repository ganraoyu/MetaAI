const express = require('express');
const router = express.Router();

const { fetchWinRate } = require('../../../../simulators/battle-simulator/core/battleStatistics.js');

router.get('/battle-simulator/winRate', fetchWinRate);

module.exports = router;
