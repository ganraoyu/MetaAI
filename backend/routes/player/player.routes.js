const express = require('express');
const { getPlayerPuuid, getPlayerMatches } = require('../../controllers/player/player.controller.js');
const router = express.Router();

router.get('/:region/:gameName/:tagLine', getPlayerPuuid);
router.get('/:region/matches/:gameName/:tagLine', getPlayerMatches);


module.exports = router;

