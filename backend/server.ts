import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";

const battleSimulatorRoutes = require("./routes/battle-simulator/statistics/battleSimulator.routes.js");

import userRoutes from "./routes/player/player.routes";
import playerStatsRoutes from "./routes/player/playerStatistics.routes";
import statisticsRoutes from "./routes/statistics/statistics.routes";
import leaderboardRoutes from "./routes/leaderboard/leaderboard.routes";
import aiCoachRoutes from "./routes/aiCoach/aiCoach.routes";
import { connectDB } from "./database/db";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

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

connectDB()
  .then(async (db) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

