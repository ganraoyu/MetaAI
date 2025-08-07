const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/player/player.routes.js');
const leaderboardRoutes = require('./routes/leaderboard/leaderboard.routes.js');
const playerStatsRoutes = require('./routes/player/playerStatistics.routes.js');
const statisticsRoutes = require('./routes/statistics/statistics.routes.js');
const battleSimulatorRoutes = require('./routes/battle-simulator/statistics/battleSimulator.routes.js');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

app.use('/player', userRoutes);
app.use('/leaderboard', leaderboardRoutes);      
app.use('/player/statistics', playerStatsRoutes);   
app.use('/statistics', statisticsRoutes);                                             
app.use('/battle-simulator', battleSimulatorRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});     

console.log('RIOT-API-KEY', process.env.RIOT_API_KEY)