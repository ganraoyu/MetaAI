// Update imports to include the new functions
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
    clearBattleData    
    } = require('../../../simulators/battle-simulator/core/battleStatistics')

const { 
    placeChampionByName, 
    startBattle,
    clearBoard,
    getBattleHistory: getBattleHistoryFromLogic 
} = require('../../../simulators/battle-simulator/core/battleLogic');

function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular Reference]";
      }
      seen.add(value);
      
      // Skip problematic properties
      if (key === 'currentTarget' || 
          key === 'targetedBy' || 
          key === 'board' ||
          key === 'items' ||
          key === 'champion' && value.currentTarget) {
        return undefined;
      }
    }
    return value;
  };
}

function parseCellId(cellId) {
  // Handle both formats: "p0c0" and "r0c0"
  const match = cellId.match(/^([pr])(\d+)c(\d+)$/);
  if (!match) throw new Error(`Invalid cellId format: ${cellId}`);

  const [, teamPrefix, rowStr, colStr] = match;
  const row = parseInt(rowStr, 10);
  const col = parseInt(colStr, 10);

  let backendRow, team;
  
  if (teamPrefix === 'p') {
    // Player team frontend rows 0-3 map to backend rows 4-7
    backendRow = row + 4;
    team = 'player';
  } else if (teamPrefix === 'r') {
    // Enemy/opponent team frontend rows 0-3 map to backend rows 0-3
    backendRow = row;
    team = 'opponent';
  }
  
  return { row: backendRow, col, team };
}

const startBattleWithBoard = async (req, res) => {
  try {
    const { boardState } = req.body;
    if (!boardState) {
      return res.status(400).json({ error: 'Board state is required' });
    }
    // 🔥 CLEAR THE BOARD AND BATTLE DATA
    clearBoard();
    clearBattleData(); // Clear cached battle statistics
    
    let successfulPlacements = 0;
    
    // Count champions before placing them
    const championsToPlace = Object.entries(boardState).filter(([cellId, cellData]) => 
      cellData && cellData.champion
    );

    if (championsToPlace.length === 0) {
      return res.status(400).json({ 
        error: 'No champions found on the board. Please place at least one champion before starting a battle.',
        championCount: 0
      });
    }

    
    // Place new champions on the cleared board
    championsToPlace.forEach(([cellId, cellData]) => {
      
      try {
        const { row, col, team } = parseCellId(cellId);
        
      
        
        const result = placeChampionByName(
          cellData.champion.name,
          row,
          col,
          cellData.starLevel || 1,
          team
        );
        
        if (result === false) {
          console.error(`❌ Failed to place champion ${cellData.champion.name}`);
        } else {
          successfulPlacements++;
        }
      } catch (error) {
        console.error(`Error placing champion in cell ${cellId}:`, error);
      }
    });

    // Check if any champions were actually placed successfully
    if (successfulPlacements === 0) {
      return res.status(400).json({ 
        error: 'Failed to place any champions on the board. Please check champion data and try again.',
        championCount: 0,
        attemptedPlacements: championsToPlace.length
      });
    }
    
    
    const battleResult = startBattle();
    
    setBattleData(battleResult);
    // Serialize with circular reference handler
    const safeResult = JSON.parse(JSON.stringify(battleResult, getCircularReplacer()));
    
    let safeBattleHistory = null;
    try {
      const battleHistory = getBattleHistoryFromLogic();
      safeBattleHistory = JSON.parse(JSON.stringify(battleHistory, getCircularReplacer()));
    } catch (historyError) {
      console.error('Error getting battle history:', historyError);
    }

    res.json({ 
      success: true, 
      battleResult: safeResult, 
      battleHistory: safeBattleHistory,
      debug: {
        receivedCells: Object.keys(boardState),
        championsPlaced: successfulPlacements,
        boardCleared: true,
        battleDataCached: true  
      }
    });
    
  } catch (error) {
    console.error('Error starting battle:', error);
    res.status(500).json({ 
      error: 'Failed to start battle', 
      details: error.message
    });
  }
};

const clearBattleState = async (req, res) => {
  try {
    clearBoard();
    clearBattleData();
    res.json({ 
      success: true, 
      message: 'Battle state cleared successfully' 
    });
  } catch (error) {
    console.error('Error clearing battle state:', error);
    res.status(500).json({ 
      error: 'Failed to clear battle state', 
      details: error.message
    });
  }
};
const sendLineUp = async (req, res) => {
  const { boardArray } = req.body;

  function parseCellIdOld(cellId) {
    const rowPart = cellId.split('c')[0]; 
    const colPart = cellId.split('c')[1];
    const row = parseInt(rowPart.slice(1), 10); 
    const col = parseInt(colPart, 10);         
    return { row, col };
  }

  try {
    const placedChampions = [];

    for (const champion of boardArray) {
      const { row, col } = parseCellIdOld(champion.cellId);
      const team = row < 4 ? "opponent" : "player";
      const name = champion.championName 
      const starLevel = champion.starLevel ?? 1;

      placeChampionByName(name, row, col, starLevel, team);
      placedChampions.push({ name, row, col, starLevel, team });
    }
    
    res.status(200).json({ success: true, placedChampions });
  } catch (error) {
    console.error("Error in sendLineUp:", error);
    res.status(500).json({ error: "Battle simulation failed." });
  }
};

const getWinRate = async (req, res) => {
    try{
        const winRate = await calculateWinRate(req, res);
        res.json(winRate);
    } catch(error){
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating win rate.' });
    }
}

const getChampionItems = async (req, res) => {
    try{
        const championItems = await calculateChampionItems(req, res);
        res.json(championItems);
    } catch(error){
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while fetching champion items.' });
    }
}

const getAttackDamageDelt = async (req, res) => {
    try{
        const attackDamage = await calculateAttackDamageDelt(req, res);
        res.json(attackDamage);
    } catch(error){
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating attack damage.' });
    }
}

const getAbilityDamageDelt = async (req, res) => {
    try{
        const abilityDamage = await calculateAbilityDamageDelt(req, res);
        res.json(abilityDamage);
    } catch(error){
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating ability damage.' });
    }
}

const getAllDamageDelt = async (req, res) => {
    try{
        const allDamage = await calculateAllDamageDelt(req, res);
        res.json(allDamage);
    } catch(error){
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating all damage.' });
    }
}

const getHealing = async (req, res) => {
    try{
        const healing = await calculateHealing(req, res);
        res.json(healing)   
    } catch(error){
        console.log('Error', error)
        res.status(500).json({ error: 'An error occurred while calculating healing.' });
    }
}

const getAliveOrDead = async (req, res) => {
    try{
        const aliveOrDead = await calculateIsAliveOrDead(req, res);
        res.json(aliveOrDead)
    } catch(error){
        console.log('Error', error)
        res.status(500).json({ error: 'An error occurred while calculating alive or dead.' });
    }
}

const getAllBattleStatistics = async (req, res) => {
    try{ 
         const battleStatistics = await calculateAllBattleStatistics(req, res);
         res.json(battleStatistics)
    } catch(error){
        console.log('Error', error)
        res.status(500).json({ error: 'An error occured while calculating battle statistics '})
    }
}

const getChampionStatistics = async (req, res) => {
    try{
        const { playerChampions, opponentChampions } = await calculateChampionStatistics(req, res);
        res.json({playerChampions, opponentChampions})
    } catch(error){
        console.log('Error', error)
        res.status(500).json({ error: 'An error occured while fetching champion statistics '})
    };
};

const getBattleHistory = async (req, res) => {
    try{
        const battleHistory = await calculateBattleHistory(req, res);
        res.json(battleHistory)
    } catch(error){
        console.log('Error', error)
        res.status(500).json({ error: 'An error occured while fetching battle history '})
    };
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
    sendLineUp,
    startBattleWithBoard,
    clearBattleState
}