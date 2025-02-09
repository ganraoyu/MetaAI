const express = require('express');
const router = express.Router();

const HexCell = require('../utils/HexCell.js');
const Board = require('./board.js');

const { getChampionByName } = require('../data/champion/champion-data.ts');
const { displayStats, Champion } = require('../data/champion/champion.ts');
const { Item } = require('../data/item/item.ts');
const { getItemByName } = require('../data/item/item-data.ts');

/*
cd simulators/battle-simulator/core
nodemon battlelogic
*/
     
const board = new Board(8, 7);
      
function placeChampionByName(championName, row, column, starLevel, team) {
    const champion = getChampionByName(championName);
    if (typeof champion === 'string') {
        console.log(champion);
    } else {
        const newChampion = new Champion(
            champion.name, 
            champion.cost, 
            champion.traitsList, 
            champion.statsByStarLevel,
            champion.attackSpeed, 
            champion.abilityName, 
            champion.range, 
            champion.mana, 
            champion.manaPerAttack, 
            champion.abilityManaCost, 
            champion.attackCritChance, 
            champion.attackCritDamage, 
            champion.timeUntilAttack,
            champion.attackArray,
            champion.abilityArray,
            champion.healArray,            
            champion.items,
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
    
    console.log('Player team:', player.map(champion => champion.name));
    console.log('Opponent team:', opponent.map(champion => champion.name));

    return { player, opponent };
}

function addItemByName(champion, itemName) {
    const item = getItemByName(itemName);

    if (typeof item === 'string') {
        throw new Error(item);
    } else { 
        champion.items.push(item);
    }   
}

function addAddtionalItemStatistics(champion){
    if(3 >= champion.items.length > 0){
        console.log(champion.items);  
        
        champion.items.forEach(item =>{
            champion.statsByStarLevel[champion.starLevel].attackDamage += parseInt(item.additionalAttackDamage);
        });
        
    } else if(champion.items.length === 0){
        console.log('No items equipped');
    } else {
        console.log('Max 3 items can be equipped');
    }
}

function saveOriginalStats(player, opponent) {
    const originalPlayerStats = player.map(champion => ({
        name: champion.name,
        hp: champion.statsByStarLevel[champion.starLevel].hp,
        gameTime: champion.gameTime
    })); 

    const originalOpponentStats = opponent.map(champion => ({
        name: champion.name,
        hp: champion.statsByStarLevel[champion.starLevel].hp,
        gameTime: champion.gameTime    
    })); 

    return { originalPlayerStats, originalOpponentStats };
}

function simulateRound(battlePlayer, battleOpponent) {
    let attackOccurred = false;

    // Player attacks
    battlePlayer.forEach(champion => {
        if (champion.currentHp > 0) {
            const target = battleOpponent.find(c => c.currentHp > 0);
            if (target) {
                if (champion.attack(target)) {
                    attackOccurred = true;
                }
                champion.useAbility(target);
            }
        }
    });
     
    // Opponent attacks
    battleOpponent.forEach(champion => {
        if (champion.currentHp > 0) {
            const target = battlePlayer.find(c => c.currentHp > 0);
            if (target) {
                if (champion.attack(target)) {
                    attackOccurred = true;
                }
                champion.useAbility(target);
            }
        }
    });

    // Filter out champions with 0 HP from both teams
    battlePlayer = battlePlayer.filter(champion => champion.currentHp > 0);
    battleOpponent = battleOpponent.filter(champion => champion.currentHp > 0);

    return { battlePlayer, battleOpponent, attackOccurred };
}

function resetStats(player, opponent, originalPlayerStats, originalOpponentStats) {
    player.forEach((champion, index) => {
        champion.currentHp = originalPlayerStats[index].hp;
    });
    opponent.forEach((champion, index) => {
        champion.currentHp = originalOpponentStats[index].hp;
    });
}

function calculateWinRates(playerWins, opponentWins) {
    const playerWinRate = (playerWins.length / 100) * 100 + '%';
    const opponentWinRate = (opponentWins.length / 100) * 100 + '%';
    return { playerWinRate, opponentWinRate };
}

function startBattle() {
    console.log('Battle started!');

    let { player, opponent } = initializeTeams();
    let playerWins = [];
    let opponentWins = [];

    const { originalPlayerStats, originalOpponentStats } = saveOriginalStats(player, opponent);
    
    // Start the battle for 100 rounds
    for (let i = 0; i < 1; i++) {      
        // Create copies of the player and opponent teams to track their status during this round
        let battlePlayer = [...player];
        let battleOpponent = [...opponent];     

        // Simulate the battle until one team is defeated

        while (battlePlayer.some(champion => champion.currentHp > 0) && battleOpponent.some(champion => champion.currentHp > 0)) {
            let attackOccurred = false;
            ({ battlePlayer, battleOpponent, attackOccurred } = simulateRound(battlePlayer, battleOpponent));

            // Log the current status of the battle if an attack occurred
            if(playerWins.length === 0 || opponentWins.length === 0) {
                if (attackOccurred) {
                    console.log('Player team:', battlePlayer.map(champion => `${champion.name} (${champion.currentHp} HP)`));
                    console.log('Opponent team:', battleOpponent.map(champion => `${champion.name} (${champion.currentHp} HP)`));
                }   
            }
        }
        
        // Count the result of the battle
        if (battlePlayer.length > 0) {
            playerWins.push(1); 
        } else if (battleOpponent.length > 0) {
            opponentWins.push(1);
        } else {
            console.log('No champions left standing.');
        }
   
        // Reset HP after each battle round

        console.log('Round', i + 1, 'ended.');

    }

    // Calculate and display win rates
    const { playerWinRate, opponentWinRate } = calculateWinRates(playerWins, opponentWins);

    console.log('Battle ended!');

    const playerStatistics = player.map(champion => ({
        name: champion.name,
        items: champion.items,
        HP: champion.currentHp,
        baseHP: champion.statsByStarLevel[champion.starLevel].hp,
        damageArray: champion.damageArray,
        abilityArray: champion.abilityArray,
        healArray: champion.healArray
    }))

    const opponentStatistics = opponent.map(champion => ({
        name: champion.name,
        items: champion.items,
        HP: champion.currentHp,
        baseHP: champion.statsByStarLevel[champion.starLevel].hp,
        damageArray: champion.damageArray,
        abilityArray: champion.abilityArray,
        healArray: champion.healArray
    }))         

    // console.log(playerDamage);
    // console.log(opponentDamage);

    // console.log('Player win rate is ' + playerWinRate);
    // console.log('Opponent win rate is ' + opponentWinRate);

    return { 
        playerWinRate, 
        opponentWinRate, 
        playerStatistics, 
        opponentStatistics, 
        
    }; 
}
  
placeChampionByName('Akali', 4, 3, 1, 'player');
// placeChampionByName('Darius', 4, 2, 1, 'player');
placeChampionByName('Darius', 3, 3, 1, 'opponent'); 
addItemByName(board.getChampion(4, 3), 'B.F. Sword');

console.log(board.getChampion(4, 3));

addAddtionalItemStatistics(board.getChampion(4, 3));
board.displayBoard();

module.exports = { router, startBattle }; 

