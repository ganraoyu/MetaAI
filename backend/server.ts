import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import cors from "cors";
import { setupDatabaseIndexes } from "./database/setup";

const battleSimulatorRoutes = require("./routes/battle-simulator/statistics/battleSimulator.routes.js");

import userRoutes from "./routes/player/player.routes";
import playerStatsRoutes from "./routes/player/playerStatistics.routes";
import statisticsRoutes from "./routes/statistics/statistics.routes";
import leaderboardRoutes from "./routes/leaderboard/leaderboard.routes";
import aiCoachRoutes from "./routes/aiCoach/aiCoach.routes";
import { connectDB } from "./database/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/player", userRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/player/statistics", playerStatsRoutes);
app.use("/statistics", statisticsRoutes);
app.use("/battle-simulator", battleSimulatorRoutes);
app.use("/ai-coach", aiCoachRoutes);

async function startServer() {
  try {
    await connectDB();
    await setupDatabaseIndexes();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();