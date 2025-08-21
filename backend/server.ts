const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

const statisticsRoutes = require('./routes/statistics/statistics.routes.js');
const battleSimulatorRoutes = require('./routes/battle-simulator/statistics/battleSimulator.routes.js');

import userRoutes from './routes/player/player.routes';
import playerStatsRoutes from './routes/player/playerStatistics.routes';
import leaderboardRoutes from './routes/leaderboard/leaderboard.routes';
import aiCoachRoutes from './routes/aiCoach/aiCoach.routes';

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
app.use('/ai-coach', aiCoachRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});     

console.log('RIOT-API-KEY', process.env.RIOT_API_KEY)
console.log('OPENAI-API-KEY', process.env.OPENAI_API_KEY)

