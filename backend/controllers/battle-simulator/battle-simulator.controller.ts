import { Request, Response } from 'express';

const {
  calculateWinRate,
  calculateChampionItems,
  calculateAttackDamageDelt,
  calculateAbilityDamageDelt,
  calculateAllDamageDelt,
  calculateHealing,
  calculateIsAliveOrDead,
  calculateAllBattleStatistics,
  calculateChampionStatistics,
  calculateBattleHistory,
  setBattleData,
  clearBattleData,
} = require("../../../simulators/battle-simulator/core/battleStatistics");

import {
  placeChampionByName,
  addItemByName,
  addAdditionalItemStatistics,
  startBattle,
  clearBoard,
  board,
  getBattleHistory: getBattleHistoryFromLogic,
} from "../../../simulators/battle-simulator/core/_battleSimulator.js";

// Type definitions
interface ChampionData {ç
  name: string;
  items?: string[];
}

interface CellData {
  champion: ChampionData;
  starLevel?: number;
}

interface BoardState {
  [cellId: string]: CellData | null;
}

interface ParsedCellId {
  row: number;
  col: number;
  team: 'player' | 'opponent';
}

interface SafeChampionReference {
  name: string;
  id: string;
  isReference?: boolean;
  isCircularRef?: boolean;
}

interface BattleLog {
  formattedTime: string;
  type: string;
  details: any;
  isCrit?: boolean;
  source?: string;
}

interface BattleHistory {
  battleLogs: BattleLog[];
  duration?: number;
}

interface BattleResponse {
  success: boolean;
  battleCompleted: boolean;
  battleHistory: BattleHistory | null;
  winner: string;
  duration: number;
  debug: {
    receivedCells: string[];
    championsPlaced: number;
    boardCleared: boolean;
    battleDataCached: boolean;
  };
}

interface StartBattleRequest extends Request {
  body: {
    boardState: BoardState;
  };
}

// Helper functions
function parseCellId(cellId: string): ParsedCellId {
  const match = cellId.match(/^([pr])(\d+)c(\d+)$/);
  if (!match) throw new Error(`Invalid cellId format: ${cellId}`);

  const [, teamPrefix, rowStr, colStr] = match;
  const row = parseInt(rowStr, 10);
  const col = parseInt(colStr, 10);

  let backendRow: number;
  let team: 'player' | 'opponent';

  if (teamPrefix === "p") {
    backendRow = row + 4;
    team = "player";
  } else if (teamPrefix === "r") {
    backendRow = row;
    team = "opponent";
  } else {
    throw new Error(`Invalid team prefix: ${teamPrefix}`);
  }

  return { row: backendRow, col, team };
}

function createPreciseCircularReplacer(): (key: string, value: any) => any {
  const seen = new WeakMap<object, boolean>();
  
  return function (key: string, value: any): any {
    if (typeof value === "function") {
      return undefined;
    }

    if (typeof value !== "object" || value === null) {
      return value;
    }

    if (
      key === "board" &&
      value.constructor &&
      value.constructor.name === "Board"
    ) {
      return "[Board Reference Removed]";
    }

    if (value.constructor && value.constructor.name === "Champion") {
      // If we've seen this exact champion object before, create a safe reference
      if (seen.has(value)) {
        return {
          name: value.name || "[Champion]",
          id: value.id || "unknown",
          isCircularRef: true,
        } as SafeChampionReference;
      }
      seen.set(value, true);

      const cleanChampion: Record<string, any> = {};
      for (const [championKey, championValue] of Object.entries(value)) {
        if (championKey === "currentTarget" && Array.isArray(championValue)) {
          // Convert champion references to safe IDs
          cleanChampion[championKey] = championValue.map((target: any) =>
            target && typeof target === "object" && target.name
              ? {
                  name: target.name,
                  id: target.id || "unknown",
                  isReference: true,
                } as SafeChampionReference
              : target
          );
        } else if (
          championKey === "targetedBy" &&
          Array.isArray(championValue)
        ) {
          cleanChampion[championKey] = championValue.map((attacker: any) =>
            attacker && typeof attacker === "object" && attacker.name
              ? {
                  name: attacker.name,
                  id: attacker.id || "unknown",
                  isReference: true,
                } as SafeChampionReference
              : attacker
          );
        } else if (
          championKey === "currentChampionsAttacking" &&
          Array.isArray(championValue)
        ) {
          cleanChampion[championKey] = championValue.map((attacker: any) =>
            attacker && typeof attacker === "object" && attacker.name
              ? {
                  name: attacker.name,
                  id: attacker.id || "unknown",
                  isReference: true,
                } as SafeChampionReference
              : attacker
          );
        } else {
          // Keep all other data as-is (traits, stats, etc.)
          cleanChampion[championKey] = championValue;
        }
      }
      return cleanChampion;
    }

    if (Array.isArray(value)) {
      return value;
    }

    if (seen.has(value)) {
      return "[Circular Reference]";
    }
    seen.set(value, true);

    return value;
  };
}

// Helper function to safely convert data to JSON while preserving all important data
function safeBattleDataToJSON(data: any): any {
  try {
    const cleanData = JSON.parse(
      JSON.stringify(data, createPreciseCircularReplacer())
    );
    return cleanData;
  } catch (error) {
    console.error("Error converting battle data to JSON:", error);

    // Fallback: try to extract the most important data manually
    try {
      if (data && typeof data === "object") {
        const fallbackData = {
          success: true,
          message: "Partial data due to serialization issues",
          extractedData: {} as Record<string, any>,
        };

        // Try to extract key properties safely
        for (const [key, value] of Object.entries(data)) {
          try {
            JSON.stringify(value); // Test if this value can be serialized
            fallbackData.extractedData[key] = value;
          } catch (innerError) {
            fallbackData.extractedData[
              key
            ] = `[Could not serialize: ${typeof value}]`;
          }
        }

        return fallbackData;
      }
    } catch (fallbackError) {
      console.error("Fallback serialization also failed:", fallbackError);
    }

    // Last resort
    return {
      success: false,
      error: "Failed to serialize battle data",
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    };
  }
}

function getBattleHistoryClean(): BattleHistory | null {
  try {
    const rawHistory = getBattleHistoryFromLogic();

    // If the battle history is structured like your battleLogger.ts, it should be clean
    if (
      rawHistory &&
      rawHistory.battleLogs &&
      Array.isArray(rawHistory.battleLogs)
    ) {
      return {
        battleLogs: rawHistory.battleLogs.map((log: any) => ({
          formattedTime: log.formattedTime,
          type: log.type,
          details: log.details ? safeBattleDataToJSON(log.details) : null,
          isCrit: log.isCrit,
          source: log.source,
        })),
        duration: rawHistory.duration,
      };
    }

    return safeBattleDataToJSON(rawHistory);
  } catch (error) {
    console.error("Error getting clean battle history:", error);
    return null;
  }
}

// Controller functions
const startBattleWithBoard = async (req: StartBattleRequest, res: Response): Promise<void> => {
  try {
    console.log("Received request body:", req.body);

    const { boardState } = req.body;
    if (!boardState) {
      res.status(400).json({ error: "Board state is required" });
      return;
    }

    console.log("Board state:", boardState);

    // Clear the board and battle data before starting new battle
    clearBoard();
    clearBattleData();

    let successfulPlacements = 0;

    // Count champions to place
    const championsToPlace = Object.entries(boardState).filter(
      ([cellId, cellData]) => cellData !== null && cellData?.champion !== undefined
    ) as [string, CellData][];

    console.log("Champions to place:", championsToPlace.length);

    if (championsToPlace.length === 0) {
      res.status(400).json({
        error:
          "No champions found on the board. Please place at least one champion before starting a battle.",
        championCount: 0,
      });
      return;
    }

    // Place each champion on the board
    championsToPlace.forEach(([cellId, cellData]) => {
      try {
        const { row, col, team } = parseCellId(cellId);

        console.log(
          `Placing champion ${cellData.champion.name} at row ${row}, col ${col}, team ${team}`
        );

        const result = placeChampionByName(
          cellData.champion.name,
          row,
          col,
          cellData.starLevel || 1,
          team
        );

        const championInstance = board.getChampion(row, col);

        if (championInstance && cellData.champion.items) {
          cellData.champion.items.forEach((item: string) => {
            addItemByName(championInstance, item);
          });

          addAdditionalItemStatistics(championInstance, row, col);
        }

        if (result === false) {
          console.error(
            `❌ Failed to place champion ${cellData.champion.name}`
          );
        } else {
          successfulPlacements++;
          console.log(
            `✅ Successfully placed champion ${cellData.champion.name}`
          );
        }
      } catch (error) {
        console.error(`Error placing champion in cell ${cellId}:`, error);
      }
    });

    console.log(`Successfully placed ${successfulPlacements} champions`);

    if (successfulPlacements === 0) {
      res.status(400).json({
        error:
          "Failed to place any champions on the board. Please check champion data and try again.",
        championCount: 0,
        attemptedPlacements: championsToPlace.length,
      });
      return;
    }

    console.log("Starting battle...");

    // Run the battle simulation
    const battleResult = startBattle();

    console.log("Battle completed, setting battle data...");

    // Cache the battle result for statistics endpoints
    setBattleData(battleResult);

    // Get clean battle history
    console.log("Getting battle history...");
    const battleHistory = getBattleHistoryClean();
    console.log("Battle history retrieved and cleaned successfully");

    console.log("Sending response...");

    // Send a minimal response to avoid circular reference issues
    const responseData: BattleResponse = {
      success: true,
      battleCompleted: true,
      battleHistory: battleHistory,
      winner: battleResult?.winner || "unknown",
      duration: battleHistory?.duration || 0,
      debug: {
        receivedCells: Object.keys(boardState),
        championsPlaced: successfulPlacements,
        boardCleared: true,
        battleDataCached: true,
      },
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error starting battle:", error);
    console.error("Error stack:", (error as Error).stack);
    res.status(500).json({
      error: "Failed to start battle",
      details: (error as Error).message,
      stack: process.env.NODE_ENV === "development" ? (error as Error).stack : undefined,
    });
  }
};

const getWinRate = async (req: Request, res: Response): Promise<void> => {
  try {
    const winRate = await calculateWinRate(req, res);
    res.json(winRate);
  } catch (error) {
    console.error("Error: " + error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating win rate." });
  }
};

const getChampionItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const championItems = await calculateChampionItems(req, res);
    res.json(championItems);
  } catch (error) {
    console.error("Error: " + error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching champion items." });
  }
};

const getAttackDamageDelt = async (req: Request, res: Response): Promise<void> => {
  try {
    const attackDamage = await calculateAttackDamageDelt(req, res);
    res.json(attackDamage);
  } catch (error) {
    console.error("Error: " + error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating attack damage." });
  }
};

const getAbilityDamageDelt = async (req: Request, res: Response): Promise<void> => {
  try {
    const abilityDamage = await calculateAbilityDamageDelt(req, res);
    res.json(abilityDamage);
  } catch (error) {
    console.error("Error: " + error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating ability damage." });
  }
};

const getAllDamageDelt = async (req: Request, res: Response): Promise<void> => {
  try {
    const allDamage = await calculateAllDamageDelt(req, res);
    res.json(allDamage);
  } catch (error) {
    console.error("Error: " + error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating all damage." });
  }
};

const getHealing = async (req: Request, res: Response): Promise<void> => {
  try {
    const healing = await calculateHealing(req, res);
    res.json(healing);
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating healing." });
  }
};

const getAliveOrDead = async (req: Request, res: Response): Promise<void> => {
  try {
    const aliveOrDead = await calculateIsAliveOrDead(req, res);
    res.json(aliveOrDead);
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating alive or dead." });
  }
};

const getAllBattleStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const battleStatistics = await calculateAllBattleStatistics(req, res);
    res.json(battleStatistics);
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ error: "An error occured while calculating battle statistics " });
  }
};

const getChampionStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { playerChampions, opponentChampions } =
      await calculateChampionStatistics(req, res);
    res.json({ playerChampions, opponentChampions });
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ error: "An error occured while fetching champion statistics " });
  }
};

const getBattleHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const battleHistory = getBattleHistoryClean();
    res.json(battleHistory);
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ error: "An error occured while fetching battle history" });
  }
};

module.exports = {
  getWinRate,
  getChampionItems,
  getAttackDamageDelt,
  getAbilityDamageDelt,
  getAllDamageDelt,
  getHealing,
  getAliveOrDead,
  getAllBattleStatistics,
  getChampionStatistics,
  getBattleHistory,
  startBattleWithBoard,
};
