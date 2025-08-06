import { Champion } from "../data/champion/champion.js";
import { Request, Response } from "express";
import { Item } from "../data/item/item.js";

// Battle data caching system
let cachedBattleData: any = null;

function setBattleData(battleData: any) {
  cachedBattleData = battleData;
}

function getBattleData() {
  if (!cachedBattleData) {
    throw new Error("No battle data available. Please run a battle first.");
  }
  return cachedBattleData;
}

function clearBattleData() {
  cachedBattleData = null;
}

function getPlayerStatistics(): any[] {
  const battleData = getBattleData();
  const { player, battlePlayer } = battleData;
  
  if (!player || player.length === 0) {
    return [];
  }

  return player.map((champion: Champion, index: number) => {
    if (index < battlePlayer.length) {
      champion.damageTakenArray = battlePlayer[index].damageTakenArray || [];
      champion.trueDamageTakenArray = battlePlayer[index].trueDamageTaken || [];
      champion.magicDamageTakenArray = battlePlayer[index].magicDamageTakenArray || [];
      champion.shieldDamageTakenArray = battlePlayer[index].shieldDamageTaken || [];
      champion.damageArray = battlePlayer[index].damageArray || [];
      champion.trueDamageArray = battlePlayer[index].trueDamageArray || [];
      champion.magicDamageArray = battlePlayer[index].magicDamageArray || [];
      champion.abilityArray = battlePlayer[index].abilityArray || [];
      champion.healArray = battlePlayer[index].healArray || [];
    }

    return {
      name: champion.name,
      items: champion.items,
      HP: index < battlePlayer.length ? battlePlayer[index].currentHp : 0,
      shield: champion.shield,
      baseHP: champion.statsByStarLevel[champion.starLevel].hp,
      damageTaken: champion.damageTakenArray,
      trueDamageTaken: champion.trueDamageTakenArray,
      magicDamageTaken: champion.magicDamageTakenArray,
      shieldDamageTaken: champion.shieldDamageTakenArray,
      damageArray: champion.damageArray,
      trueDamageArray: champion.trueDamageArray,
      magicDamageArray: champion.magicDamageArray,
      abilityArray: champion.abilityArray,
      healArray: champion.healArray,
    };
  });
}

function getOpponentStatistics(): any[] {
  const battleData = getBattleData();
  const { opponent, battleOpponent } = battleData;
  
  if (!opponent || opponent.length === 0) {
    return [];
  }

  return opponent.map((champion: Champion, index: number) => {
    if (index < battleOpponent.length) {
      champion.damageTakenArray = battleOpponent[index].damageTakenArray || [];
      champion.trueDamageTakenArray = battleOpponent[index].trueDamageTaken || [];
      champion.magicDamageTakenArray = battleOpponent[index].magicDamageTakenArray || [];
      champion.shieldDamageTakenArray = battleOpponent[index].shieldDamageTaken || [];
      champion.damageArray = battleOpponent[index].damageArray || [];
      champion.trueDamageArray = battleOpponent[index].trueDamageArray || [];
      champion.magicDamageArray = battleOpponent[index].magicDamageArray || [];
      champion.abilityArray = battleOpponent[index].abilityArray || [];
      champion.healArray = battleOpponent[index].healArray || [];
    }

    return {
      name: champion.name,
      items: champion.items,
      HP: index < battleOpponent.length ? battleOpponent[index].currentHp : 0,
      shield: champion.shield,
      baseHP: champion.statsByStarLevel[champion.starLevel].hp,
      damageTaken: champion.damageTakenArray,
      trueDamageTaken: champion.trueDamageTakenArray,
      magicDamageTaken: champion.magicDamageTakenArray,
      shieldDamageTaken: champion.shieldDamageTakenArray,
      damageArray: champion.damageArray,
      trueDamageArray: champion.trueDamageArray,
      magicDamageArray: champion.magicDamageArray,
      abilityArray: champion.abilityArray,
      healArray: champion.healArray,
    };
  });
}

// Interfaces
interface ChampionStatistic {
  name: string;
  items: Item[];
  HP: number;
  shield: number;
  baseHP: number;
  damageTaken: number[];
  trueDamageTaken: number[];
  magicDamageTaken: number[];
  shieldDamageTaken: number[];
  damageArray: number[];
  trueDamageArray: number[];
  magicDamageArray: number[];
  abilityArray: number[];
  healArray: number[];
}

interface BattleResult {
  player: Champion[];
  opponent: Champion[];
  playerWinRate: string;
  opponentWinRate: string;
  playerStatistics: ChampionStatistic[];
  opponentStatistics: ChampionStatistic[];
  battleDuration: number;
}

interface DamageData {
  name: string;
  totalDamage: number;
}

interface TrueDamageData {
  name: string;
  totalTrueDamage: number;
}

interface AbilityDamageData {
  name: string;
  totalAbilityDamage: number;
}

interface AllDamageData {
  name: string;
  totalAttackDamage: number;
  totalTrueDamage: number;
  totalMagicDamage: number;
  totalAbilityDamage: number;
  allDamage: number;
  items?: Item[];
}

interface HealingData {
  name: string;
  totalHealing: number;
}

interface ChampionStatusData {
  name: string;
  shield: number;
  HP: number;
  baseHP: number;
  isAlive: boolean;
}

interface ChampionItemData {
  name: string;
  items: Item[];
}

// INTERNAL CALCULATION FUNCTIONS (NO HTTP RESPONSES)
const calculateWinRateInternal = (): { playerWinRate: string; opponentWinRate: string } => {
  try {
    const startBattleData: BattleResult = getBattleData();
    const { playerWinRate, opponentWinRate } = startBattleData;
    return { playerWinRate, opponentWinRate };
  } catch (error) {
    throw error;
  }
};

const calculateAttackDamageInternal = (): {
  totalPlayerDamage: DamageData[];
  totalOpponentDamage: DamageData[];
} => {
  const playerStatistics = getPlayerStatistics();
  const opponentStatistics = getOpponentStatistics();

  if (playerStatistics.length === 0 && opponentStatistics.length === 0) {
    throw new Error("No attack damage data available.");
  }

  const totalPlayerDamage = playerStatistics.map(
    (champion: ChampionStatistic) => ({
      name: champion.name,
      totalDamage: champion.damageArray.reduce(
        (total, damage) => total + damage,
        0
      ),
    })
  );

  const totalOpponentDamage = opponentStatistics.map(
    (champion: ChampionStatistic) => ({
      name: champion.name,
      totalDamage: champion.damageArray.reduce(
        (total, damage) => total + damage,
        0
      ),
    })
  );

  return { totalPlayerDamage, totalOpponentDamage };
};

const calculateTrueDamageInternal = (): {
  totalPlayerTrueDamage: TrueDamageData[];
  totalOpponentTrueDamage: TrueDamageData[];
} => {
  const playerStatistics = getPlayerStatistics();
  const opponentStatistics = getOpponentStatistics();

  if (playerStatistics.length === 0 && opponentStatistics.length === 0) {
    throw new Error("No true damage data available.");
  }

  const totalPlayerTrueDamage = playerStatistics.map(
    (champion: ChampionStatistic) => ({
      name: champion.name,
      totalTrueDamage: champion.trueDamageArray.reduce(
        (total, damage) => total + damage,
        0
      ),
    })
  );

  const totalOpponentTrueDamage = opponentStatistics.map(
    (champion: ChampionStatistic) => ({
      name: champion.name,
      totalTrueDamage: champion.trueDamageArray.reduce(
        (total, damage) => total + damage,
        0
      ),
    })
  );

  return { totalPlayerTrueDamage, totalOpponentTrueDamage };
};

const calculateAbilityDamageInternal = (): {
  totalPlayerAbilityDamage: AbilityDamageData[];
  totalOpponentAbilityDamage: AbilityDamageData[];
} => {
  const playerStatistics = getPlayerStatistics();
  const opponentStatistics = getOpponentStatistics();

  if (playerStatistics.length === 0 && opponentStatistics.length === 0) {
    throw new Error("No ability damage data available.");
  }

  const totalPlayerAbilityDamage = playerStatistics.map(
    (champion: ChampionStatistic) => ({
      name: champion.name,
      totalAbilityDamage: champion.abilityArray.reduce(
        (total, abilityDamage) => total + abilityDamage,
        0
      ),
    })
  );

  const totalOpponentAbilityDamage = opponentStatistics.map(
    (champion: ChampionStatistic) => ({
      name: champion.name,
      totalAbilityDamage: champion.abilityArray.reduce(
        (total, abilityDamage) => total + abilityDamage,
        0
      ),
    })
  );

  return { totalPlayerAbilityDamage, totalOpponentAbilityDamage };
};

const calculateHealingInternal = (): {
  totalPlayerHealing: HealingData[];
  totalOpponentHealing: HealingData[];
} => {
  const playerStatistics = getPlayerStatistics();
  const opponentStatistics = getOpponentStatistics();

  const totalPlayerHealing = playerStatistics.map(
    (champion: ChampionStatistic) => ({
      name: champion.name,
      totalHealing: champion.healArray.reduce(
        (total, heal) => total + heal,
        0
      ),
    })
  );

  const totalOpponentHealing = opponentStatistics.map(
    (champion: ChampionStatistic) => ({
      name: champion.name,
      totalHealing: champion.healArray.reduce(
        (total, heal) => total + heal,
        0
      ),
    })
  );

  return { totalPlayerHealing, totalOpponentHealing };
};

const calculateIsAliveOrDeadInternal = (): {
  checkPlayerChampionAliveOrDead: ChampionStatusData[];
  checkOpponentChampionAliveOrDead: ChampionStatusData[];
} => {
  const playerStatistics = getPlayerStatistics();
  const opponentStatistics = getOpponentStatistics();

  const checkPlayerChampionAliveOrDead = playerStatistics.map(
    (champion: ChampionStatistic) => ({
      name: champion.name,
      shield: champion.shield,
      HP: champion.HP,
      baseHP: champion.baseHP,
      isAlive: champion.HP > 0,
    })
  );

  const checkOpponentChampionAliveOrDead = opponentStatistics.map(
    (champion: ChampionStatistic) => ({
      name: champion.name,
      shield: champion.shield,
      HP: champion.HP,
      baseHP: champion.baseHP,
      isAlive: champion.HP > 0,
    })
  );

  return { checkPlayerChampionAliveOrDead, checkOpponentChampionAliveOrDead };
};

// HTTP ENDPOINT FUNCTIONS (ONLY THESE SEND RESPONSES)
const calculateWinRate = async (
  req: Request,
  res: Response
): Promise<{ playerWinRate: string; opponentWinRate: string }> => {
  try {
    const result = calculateWinRateInternal();
    console.log("Player win rate is " + result.playerWinRate);
    console.log("Opponent win rate is " + result.opponentWinRate);
    return result;
  } catch (error) {
    console.error("Error: " + error);
    res.status(500).json({ error: "An error occurred while calculating win rate." });
    throw error;
  }
};

const calculateChampionItems = async (
  req: Request,
  res: Response
): Promise<{
  playerChampionItems: ChampionItemData[];
  opponentChampionItems: ChampionItemData[];
}> => {
  try {
    const playerStatistics = getPlayerStatistics();
    const opponentStatistics = getOpponentStatistics();

    const playerChampionItems = playerStatistics.map(
      (champion: ChampionStatistic) => ({
        name: champion.name,
        items: champion.items,
      })
    );

    const opponentChampionItems = opponentStatistics.map(
      (champion: ChampionStatistic) => ({
        name: champion.name,
        items: champion.items,
      })
    );

    return { playerChampionItems, opponentChampionItems };
  } catch (error) {
    console.error("Error: " + error);
    res.status(500).json({ error: "An error occurred while fetching champion items." });
    throw error;
  }
};

const calculateAttackDamageDelt = async (
  req: Request,
  res: Response
): Promise<{
  totalPlayerDamage: DamageData[];
  totalOpponentDamage: DamageData[];
}> => {
  try {
    return calculateAttackDamageInternal();
  } catch (error) {
    console.error("Error: " + error);
    res.status(500).json({
      error: "An error occurred while calculating total attack damage.",
    });
    throw error;
  }
};

const calculateTrueDamageDelt = async (
  req: Request,
  res: Response
): Promise<{
  totalPlayerTrueDamage: TrueDamageData[];
  totalOpponentTrueDamage: TrueDamageData[];
}> => {
  try {
    return calculateTrueDamageInternal();
  } catch (error) {
    console.error("Error: " + error);
    res.status(500).json({
      error: "An error occurred while calculating total true damage.",
    });
    throw error;
  }
};

const calculateAbilityDamageDelt = async (
  req: Request,
  res: Response
): Promise<{
  totalPlayerAbilityDamage: AbilityDamageData[];
  totalOpponentAbilityDamage: AbilityDamageData[];
}> => {
  try {
    return calculateAbilityDamageInternal();
  } catch (error) {
    console.error("Error: " + error);
    res.status(500).json({
      error: "An error occurred while calculating total ability damage.",
    });
    throw error;
  }
};

const calculateAllDamageDelt = async (
  req: Request,
  res: Response
): Promise<{
  allPlayerDamage: AllDamageData[];
  allOpponentDamage: AllDamageData[];
}> => {
  try {
    const playerStatistics = getPlayerStatistics();
    const opponentStatistics = getOpponentStatistics();

    if (playerStatistics.length === 0 && opponentStatistics.length === 0) {
      throw new Error("No total damage data available");
    }

    // Use internal functions instead of async HTTP functions
    const { totalPlayerDamage, totalOpponentDamage } = calculateAttackDamageInternal();
    const { totalPlayerTrueDamage, totalOpponentTrueDamage } = calculateTrueDamageInternal();
    const { totalPlayerAbilityDamage, totalOpponentAbilityDamage } = calculateAbilityDamageInternal();

    const allPlayerDamage = totalPlayerDamage.map(
      (champion: DamageData, index: number) => ({
        name: champion.name,
        totalAttackDamage: champion.totalDamage,
        totalTrueDamage: totalPlayerTrueDamage[index]?.totalTrueDamage || 0,
        totalMagicDamage: 0,
        totalAbilityDamage: totalPlayerAbilityDamage[index]?.totalAbilityDamage || 0,
        allDamage:
          champion.totalDamage +
          (totalPlayerTrueDamage[index]?.totalTrueDamage || 0) +
          (totalPlayerAbilityDamage[index]?.totalAbilityDamage || 0),
        items: playerStatistics[index]?.items || [],
      })
    );

    const allOpponentDamage = totalOpponentDamage.map(
      (champion: DamageData, index: number) => ({
        name: champion.name,
        totalAttackDamage: champion.totalDamage,
        totalTrueDamage: totalOpponentTrueDamage[index]?.totalTrueDamage || 0,
        totalMagicDamage: 0,
        totalAbilityDamage: totalOpponentAbilityDamage[index]?.totalAbilityDamage || 0,
        allDamage:
          champion.totalDamage +
          (totalOpponentTrueDamage[index]?.totalTrueDamage || 0) +
          (totalOpponentAbilityDamage[index]?.totalAbilityDamage || 0),
        items: opponentStatistics[index]?.items || [],
      })
    );

    return { allPlayerDamage, allOpponentDamage };
  } catch (error) {
    console.error("Error: " + error);
    res.status(500).json({ error: "An error occurred while calculating total damage." });
    throw error;
  }
};

const calculateHealing = async (
  req: Request,
  res: Response
): Promise<{
  totalPlayerHealing: HealingData[];
  totalOpponentHealing: HealingData[];
}> => {
  try {
    return calculateHealingInternal();
  } catch (error) {
    console.log("Error" + error);
    res.status(500).json({ error: "An error occurred while calculating healing." });
    throw error;
  }
};

const calculateIsAliveOrDead = async (
  req: Request,
  res: Response
): Promise<{
  checkPlayerChampionAliveOrDead: ChampionStatusData[];
  checkOpponentChampionAliveOrDead: ChampionStatusData[];
}> => {
  try {
    return calculateIsAliveOrDeadInternal();
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      error: "An error occurred while checking if champions are alive or dead.",
    });
    throw error;
  }
};

interface PlayerStatistics {
  playerWinRate: string;
  playerStatistics: Array<{
    name: string;
    items: Item[];
    hp: number;
    isAlive: boolean;
    totalChampionDamage: number;
    totalChampionAbilityDamage: number;
    allChampionDamage: number;
    totalChampionHealing: number;
  }>;
}

interface OpponentStatistics {
  opponentWinRate: string;
  opponentStatistics: Array<{
    name: string;
    items: Item[];
    hp: number;
    isAlive: boolean;
    totalChampionDamage: number;
    totalChampionAbilityDamage: number;
    allChampionDamage: number;
    totalChampionHealing: number;
  }>;
}

const calculateAllBattleStatistics = async (
  req: Request,
  res: Response
): Promise<{
  playerChampionStatistics: PlayerStatistics[];
  opponentChamionStatistics: OpponentStatistics[];
}> => {
  try {
    // Use internal functions to avoid multiple HTTP responses
    const { playerWinRate, opponentWinRate } = calculateWinRateInternal();
    const { allPlayerDamage, allOpponentDamage } = await calculateAllDamageDelt(req, res);
    const { totalPlayerHealing, totalOpponentHealing } = calculateHealingInternal();
    const { checkPlayerChampionAliveOrDead, checkOpponentChampionAliveOrDead } = calculateIsAliveOrDeadInternal();

    const playerChampionStatistics: PlayerStatistics[] = [
      {
        playerWinRate,
        playerStatistics: allPlayerDamage.map((champion, index) => ({
          name: champion.name,
          items: champion.items || [],
          hp: checkPlayerChampionAliveOrDead[index]?.HP || 0,
          isAlive: checkPlayerChampionAliveOrDead[index]?.isAlive || false,
          totalChampionDamage: champion.totalAttackDamage,
          totalChampionTrueDamage: champion.totalTrueDamage,
          totalChampionMagicDamage: champion.totalMagicDamage,
          totalChampionAbilityDamage: champion.totalAbilityDamage,
          allChampionDamage: champion.allDamage,
          totalChampionHealing: totalPlayerHealing[index]?.totalHealing || 0,
        })),
      },
    ];

    const opponentChamionStatistics: OpponentStatistics[] = [
      {
        opponentWinRate,
        opponentStatistics: allOpponentDamage.map((champion, index) => ({
          name: champion.name,
          items: champion.items || [],
          hp: checkOpponentChampionAliveOrDead[index]?.HP || 0,
          isAlive: checkOpponentChampionAliveOrDead[index]?.isAlive || false,
          totalChampionDamage: champion.totalAttackDamage,
          totalChampionTrueDamage: champion.totalTrueDamage,
          totalChampionMagicDamage: champion.totalMagicDamage,
          totalChampionAbilityDamage: champion.totalAbilityDamage,
          allChampionDamage: champion.allDamage,
          totalChampionHealing: totalOpponentHealing[index]?.totalHealing || 0,
        })),
      },
    ];

    return { playerChampionStatistics, opponentChamionStatistics };
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      error: "An error occurred while calculating battle statistics.",
    });
    throw error;
  }
};

const calculateChampionStatistics = async (
  req: Request,
  res: Response
): Promise<{ playerChampions: any[]; opponentChampions: any[] }> => {
  try {
    const battleData = getBattleData();
    const { player: playerChampions, opponent: opponentChampions } = battleData;

    const serializablePlayerChampions = playerChampions.map((champion: any) => ({
      id: champion.id,
      name: champion.name,
      team: champion.team,
      currentHp: champion.currentHp,
      maxHp: champion.statsByStarLevel[champion.starLevel].hp,
      shield: champion.shield,
      starLevel: champion.starLevel,
      items: champion.items,
      statsByStarLevel: champion.statsByStarLevel,
      attackSpeed: champion.attackSpeed,
      abilityName: champion.abilityName,
      range: champion.range,
      armor: champion.armor,
      magicResist: champion.magicResist,
    }));

    const serializableOpponentChampions = opponentChampions.map((champion: any) => ({
      id: champion.id,
      name: champion.name,
      team: champion.team,
      currentHp: champion.currentHp,
      maxHp: champion.statsByStarLevel[champion.starLevel].hp,
      shield: champion.shield,
      starLevel: champion.starLevel,
      items: champion.items,
      statsByStarLevel: champion.statsByStarLevel,
      attackSpeed: champion.attackSpeed,
      abilityName: champion.abilityName,
      range: champion.range,
      armor: champion.armor,
      magicResist: champion.magicResist,
    }));

    return {
      playerChampions: serializablePlayerChampions,
      opponentChampions: serializableOpponentChampions,
    };
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      error: "An error occurred while calculating champion statistics.",
    });
    throw error;
  }
};

const calculateBattleHistory = async (req: Request, res: Response) => {
  try {
    const battleData = getBattleData();
    const { getBattleHistory } = require("./battleSimulator.js");
    const battleHistory = getBattleHistory();
    return battleHistory;
  } catch (error) {
    console.log("Error getting battle history:", error);
    res.status(500).json({ 
      error: "An error occurred while fetching battle history." 
    });
    throw error;
  }
};

module.exports = {
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
};