const express = require("express");
const router = express.Router();

const Board = require("./board.js");
const HexCell = require("../utils/HexCell.js");
const { Champion } = require("../data/champion/champion.ts");
const { Item } = require("../data/item/item.ts");
const { Trait } = require("../data/trait/trait.ts");
const { displayStats } = require("../data/champion/champion.ts");

const { getChampionByName } = require("../data/champion/champion-data.ts");
const { getItemByName } = require("../data/item/item-data.ts");
const { getTraitByName } = require("../data/trait/trait-data.ts");

const {
  addAdditionalItemStatistics,
} = require("../data/item/logic/basicItems.ts");

const battleLogger = require("./battleLogger.ts");
const { logBattleEvent } = battleLogger;

const {
  applyItemEffects,
  applyStaticEffects,
  applyTargetEffects,
  applyAllyEffects,
  applySurroundingAlliesEffects,
  applySurroundingOpponentsEffects,
  applyPositionalEffects,
  applyAllItemEffects,
} = require("../data/item/logic/_itemEffects.ts");

const {
  getDistanceBetweenCells,
  findClosestEnemy,
  moveChampionTowardsTarget,
} = require("./movementLogic.js");

/*
cd simulators/battle-simulator/core
nodemon battlelogic
*/

const board = new Board(8, 7);

function getFormattedTime(time) {
  const minutes = Math.floor(time / 6000);
  const seconds = ((time % 6000) / 100).toFixed(2).padStart(5, "0");
  return `${minutes}:${seconds}`;
}

function placeChampionByName(championName, row, column, starLevel, team) {
  const champion = getChampionByName(championName);
  if (typeof champion === "string") {
    console.log(champion);
  } else {
    const newChampion = new Champion(
      champion.name,
      champion.cost,
      champion.movementSpeed,
      champion.traitsList,
      champion.shield,
      champion.statsByStarLevel,
      champion.attackSpeed,
      champion.abilityName,
      champion.range,
      champion.mana,
      champion.manaPerAttack,
      champion.abilityManaCost,
      champion.attackCritChance,
      champion.attackCritDamage,
      champion.abilityCritChance,
      champion.abilityCritDamage,
      champion.damageAmp,
      champion.sunder,
      champion.shred,
      champion.wound,
      champion.burn,
      champion.immunity,
      champion.abilityPower,
      champion.omnivamp,
      champion.durability,
      champion.timeUntilAttack,
      champion.attackArray,
      champion.abilityArray,
      champion.healArray,
      champion.items
    );
    newChampion.setStarLevel(starLevel);
    newChampion.team = team; // Assign the team to the champion
    board.placeChampion(newChampion, row, column);
  }
}

function initializeTeams() {
  let player = [];
  let opponent = [];

  // Assign champions to the player team (bottom 4 rows)
  for (let row = 4; row < board.rows; row++) {
    for (let column = 0; column < board.columns; column++) {
      const champion = board.getChampion(row, column);
      if (champion) {
        player.push(champion);
      }
    }
  }

  // Assign champions to the opponent team (top 4 rows)
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < board.columns; column++) {
      const champion = board.getChampion(row, column);
      if (champion) {
        opponent.push(champion);
      }
    }
  }

  console.log(
    "Player team:",
    player.map((champion) => champion.name)
  );
  console.log(
    "Opponent team:",
    opponent.map((champion) => champion.name)
  );

  return { player, opponent };
}

function addItemByName(champion, itemName) {
  const item = getItemByName(itemName);

  if (typeof item === "string") {
    throw new Error(item);
  } else {
    champion.items.push(item);
  }
}

function checkChampionTraits(champion) {
  let combinedTraitsObject = {
    name: champion.name,
    traits: [],
  };

  const traits = champion.traitsList;

  for (let i = 0; i < traits.length; i++) {
    const trait = getTraitByName(traits[i]);

    if (trait) {
      combinedTraitsObject.traits.push({
        trait: trait.name,
        numberOfTrait: 1,
      });
    } else {
      console.log("Trait not found");
    }
  }

  return combinedTraitsObject;
}

function addAdditionalTraitStatistics(champion) {
  let traitCounts = {};

  const combinedTraitsObject = checkChampionTraits(champion); // Get combined traits object
  const traitStats = combinedTraitsObject.traits.map((trait) =>
    getTraitByName(trait.trait)
  ); // Extract trait names and their corresponding stats

  combinedTraitsObject.traits.forEach((trait) => {
    if (traitCounts[trait.trait]) {
      traitCounts[trait.trait]++;
    } else {
      traitCounts[trait.trait] = 1;
    }
  });

  combinedTraitsObject.traits.forEach((trait) => {
    const traitStatsForTrait = traitStats.find((t) => t.name === trait.trait);

    if (
      trait.trait === traitStatsForTrait.name &&
      traitCounts[traitStatsForTrait.name] >= 1
    ) {
      const stats = champion.statsByStarLevel[champion.starLevel];
      const traitStats = traitStatsForTrait?.stats || {};

      stats.hp += parseFloat(traitStats.additionalHealth) || 0;
      champion.currentHp += parseFloat(traitStats.additionalHealth) || 0;

      stats.armor += parseFloat(traitStats.additionalArmor) || 0;
      stats.attackDamage += parseFloat(traitStats.additionalAttackDamage) || 0;
      stats.attackSpeed += parseFloat(traitStats.additionalAttackSpeed) || 0;
      stats.magicResist += parseFloat(traitStats.additionalMagicResist) || 0;
      stats.mana += parseFloat(traitStats.additionalMana) || 0;
      stats.manaPerAttack += parseFloat(traitStats.additionalManaPerAttack) || 0;
      stats.abilityPower += parseFloat(traitStats.additionalAbilityPower) || 0;
      stats.abilityManaCost -= parseFloat(traitStats.reducedMaxMana) || 0;
      stats.attackCritChance += parseFloat(traitStats.additionalCritChance) || 0;
      stats.attackCritDamage += parseFloat(traitStats.additionalCritDamage) || 0;
      stats.omnivamp += parseFloat(traitStats.additionalOmnivamp) || 0;
      stats.durability += parseFloat(traitStats.additionalDurability) || 0;
      stats.range += parseFloat(traitStats.additionalAttackRange) || 0;

    } else {
      console.log("Error: Trait not processed correctly");
    }
  });
}

function simulateRound(battlePlayer, battleOpponent, battleTime) {
  let attackOccurred = false;
  let updatedBattleTime = battleTime;

  let movementOccurred = false;

  for (const champion of battlePlayer) {
    if (champion.currentHp <= 0) continue;

    const { closestEnemy, distance } = findClosestEnemy(
      champion,
      battleOpponent,
      board
    );

    if (closestEnemy) {
      if (distance <= champion.range) {
        if (champion.attack(closestEnemy, updatedBattleTime)) {
          attackOccurred = true;
        }
      } else {
        const moveTime = moveChampionTowardsTarget(
          champion,
          closestEnemy,
          board,
          updatedBattleTime
        );

        if (moveTime) {
          updatedBattleTime += moveTime;
          movementOccurred = true;
          logBattleEvent(
            "movement",
            {
              mover: {
                name: champion.name,
                team: champion.team,
                position: board.getChampionPosition(champion),
              },
              target: {
                name: closestEnemy.name,
                team: closestEnemy.team,
                position: board.getChampionPosition(closestEnemy),
              },
            },
            updatedBattleTime
          );
          break;
        }
      }
    }
  }

  if (!movementOccurred) {
    for (const champion of battleOpponent) {
      if (champion.currentHp <= 0) continue;

      const { closestEnemy, distance } = findClosestEnemy(
        champion,
        battlePlayer,
        board
      );

      if (closestEnemy) {
        if (distance <= champion.range) {
          if (champion.attack(closestEnemy, updatedBattleTime)) {
            attackOccurred = true;
          }
        } else {
          const moveTime = moveChampionTowardsTarget(
            champion,
            closestEnemy,
            board,
            updatedBattleTime
          );
          if (moveTime) {
            updatedBattleTime += moveTime;
            movementOccurred = true;
            logBattleEvent(
              "movement",
              {
                mover: {
                  name: champion.name,
                  team: champion.team,
                  position: board.getChampionPosition(champion),
                },
                target: {
                  name: closestEnemy.name,
                  team: closestEnemy.team,
                  position: board.getChampionPosition(closestEnemy),
                },
              },
              updatedBattleTime
            );
            break;
          }
        }
      }
    }
  }

  battlePlayer.forEach((champion) => {
    if (champion.currentHp <= 0) {
      const [row, col] = board.getChampionPosition(champion);

      if (row !== undefined && col !== undefined) {
        board.removeChampion(row, col);
      }
    }
  });

  battleOpponent.forEach((champion) => {
    if (champion.currentHp <= 0) {
      const [row, col] = board.getChampionPosition(champion);

      if (row !== undefined && col !== undefined) {
        board.removeChampion(row, col);
      }
    }
  });

  battlePlayer.filter((champion) => champion.currentHp > 0);
  battleOpponent.filter((champion) => champion.currentHp > 0);

  return {
    battlePlayer,
    battleOpponent,
    attackOccurred,
    movementOccurred,
    battleTime: updatedBattleTime,
  };
}

function calculateWinRates(playerWins, opponentWins) {
  const playerWinRate = (playerWins.length / 100) * 100 + "%";
  const opponentWinRate = (opponentWins.length / 100) * 100 + "%";
  return { playerWinRate, opponentWinRate };
}

let currentBattleTime = 0;

function startBattle() {
  console.log("Battle started!");

  let { player, opponent } = initializeTeams();
  let playerWins = [];
  let opponentWins = [];

  let battlePlayer = [...player];
  let battleOpponent = [...opponent];

  console.log("Starting battle with champions:");

  const BATTLE_STEP = 1;
  const MAX_BATTLE_TIME = 30000;

  let battleTime = 0;

  while (
    battlePlayer.some((champion) => champion.currentHp > 0) &&
    battleOpponent.some((champion) => champion.currentHp > 0) &&
    battleTime <= MAX_BATTLE_TIME
  ) {
    const result = simulateRound(battlePlayer, battleOpponent, battleTime);

    battlePlayer = result.battlePlayer;
    battleOpponent = result.battleOpponent;
    battleTime = result.battleTime;

    if (!result.movementOccurred && !result.attackOccurred) {
      battleTime += BATTLE_STEP;
    }

    const formattedTime = getFormattedTime(battleTime);

    if (battleTime % 100 === 0) {
      console.log(
        `Battle time: ${formattedTime} (${battleTime / 100} seconds)`
      );

      const playerTeamStats = battlePlayer.map((champion) => {
        return [
          `${champion.name}`,
          `(${champion.currentHp.toFixed(2)} HP,`,
          `${champion.shield} shield,`,
          `${champion.mana}/${champion.abilityManaCost} mana),`,
        ].join(" ");
      });

      const opponentTeamStats = battleOpponent.map((champion) => {
        return [
          `${champion.name}`,
          `(${champion.currentHp.toFixed(2)} HP,`,
          `${champion.shield} shield,`,
          `${champion.mana}/${champion.abilityManaCost} mana),`,
        ].join(" ");
      });

      console.log("Player team:", playerTeamStats);
      console.log("Opponent team:", opponentTeamStats);
    }

    battlePlayer.forEach((champion) => {
      const target = battleOpponent.find((c) => c.currentHp > 0);
      const ally = battlePlayer.reduce(
        (max, c) => (c.currentHp > max.currentHp ? c : max),
        battlePlayer[0]
      );
      const { championsInRadius, surroundingOpponents, surroundingAllies } =
        board.getSurroundingChampionsByRadius(champion, 2);
      const { championsInRadiusByTarget, surroundingChampionsAroundTarget } =
        board.getSurroundingChampionsByRadius(target, 2);
      const [row, column] = board.getChampionPosition(champion);

      let isChampionFrontOrBack; // True = front, False = back
      row >= 4
        ? (isChampionFrontOrBack = true)
        : (isChampionFrontOrBack = false);

      applyAllItemEffects(
        champion,
        battleTime,
        target,
        ally,
        surroundingOpponents,
        surroundingAllies,
        championsInRadius,
        surroundingChampionsAroundTarget,
        championsInRadiusByTarget,
        isChampionFrontOrBack
      );
    });

    battleOpponent.forEach((champion) => {
      const target = battleOpponent.find((c) => c.currentHp > 0);
      const ally = battleOpponent.reduce(
        (max, c) => (c.currentHp > max.currentHp ? c : max),
        battleOpponent[0]
      );
      const { championsInRadius, surroundingOpponents, surroundingAllies } =
        board.getSurroundingChampionsByRadius(champion, 2);
      const { championsInRadiusByTarget, surroundingChampionsAroundTarget } =
        board.getSurroundingChampionsByRadius(target, 2);
      const [row, column] = board.getChampionPosition(champion);

      let isChampionFrontOrBack; // True = front, False = back
      row >= 4
        ? (isChampionFrontOrBack = true)
        : (isChampionFrontOrBack = false);

      applyAllItemEffects(
        champion,
        battleTime,
        target,
        ally,
        surroundingOpponents,
        surroundingAllies,
        championsInRadius,
        surroundingChampionsAroundTarget,
        championsInRadiusByTarget,
        isChampionFrontOrBack
      );
    });
  }

  if (battlePlayer.some((champion) => champion.currentHp > 0)) {
    playerWins.push(1);
    console.log("Player team wins!");
  } else if (battleOpponent.some((champion) => champion.currentHp > 0)) {
    opponentWins.push(1);
    console.log("Opponent team wins!");
  } else {
    console.log("No champions left standing - Draw!");
  }

  board.displayBoard();
  console.log(
    "Battle ended after",
    (battleTime / 100).toFixed(2),
    "seconds of simulated time."
  );

  const { playerWinRate, opponentWinRate } = calculateWinRates(
    playerWins,
    opponentWins
  );

  currentBattleTime = battleTime;
  return {
    player,
    opponent,
    battlePlayer,
    battleOpponent,
    playerWinRate,
    opponentWinRate,
    battleDuration: battleTime / 100,
  };
}

function clearBoard() {
  // Clear all champions from the board
  for (let row = 0; row < board.rows; row++) {
    for (let col = 0; col < board.columns; col++) {
      const champion = board.getChampion(row, col);
      if (champion) {
        board.removeChampion(row, col);
        console.log(`Removed ${champion.name} from position ${row},${col}`);
      }
    }
  }

  // Reset battle time
  currentBattleTime = 0;
  try {
    if (battleLogger && battleLogger.clearHistory) {
      battleLogger.clearHistory();
      console.log("✅ Battle history cleared via clearHistory()");
    } else if (battleLogger && battleLogger.battleHistory) {
      battleLogger.battleHistory = [];
    }
  } catch (error) {
    console.log("❌ Error clearing battle history:", error);
    try {
      delete require.cache[require.resolve('./battleLogger.ts')];
    } catch (cacheError) {
      console.log("❌ Could not clear battle logger cache:", cacheError);
    }
  }
  board.displayBoard();
}

// placeChampionByName("Akali", 7, 3, 3, "player");
// placeChampionByName("Darius", 3, 3, 3, "opponent");
// addItemByName(board.getChampion(7, 3), "Sunfire Cape");

module.exports = {
  router,
  startBattle,
  clearBoard,
  placeChampionByName,
  getBattleHistory: () => battleLogger.getBattleHistory(currentBattleTime),
};
