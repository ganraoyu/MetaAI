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
} = require('../../../simulators/battle-simulator/core/battleStatistics');

const { 
    placeChampionByName, 
    startBattle,
    clearBoard,
    getBattleHistory: getBattleHistoryFromLogic 
} = require('../../../simulators/battle-simulator/core/battleLogic');

// Helper function to parse cellId format from frontend
function parseCellId(cellId) {
  const match = cellId.match(/^([pr])(\d+)c(\d+)$/);
  if (!match) throw new Error(`Invalid cellId format: ${cellId}`);

  const [, teamPrefix, rowStr, colStr] = match;
  const row = parseInt(rowStr, 10);
  const col = parseInt(colStr, 10);

  let backendRow, team;
  
  if (teamPrefix === 'p') {
    backendRow = row + 4;
    team = 'player';
  } else if (teamPrefix === 'r') {
    backendRow = row;
    team = 'opponent';
  }
  
  return { row: backendRow, col, team };
}

function createPreciseCircularReplacer() {
  const seen = new WeakMap();
  const circularPaths = new Set();
  
  return function(key, value) {
    if (typeof value === 'function') {
      return undefined;
    }
    
    if (typeof value !== 'object' || value === null) {
      return value;
    }

    if (key === 'board' && value.constructor && value.constructor.name === 'Board') {
      return '[Board Reference Removed]';
    }
    
    if (value.constructor && value.constructor.name === 'Champion') {
      // If we've seen this exact champion object before, create a safe reference
      if (seen.has(value)) {
        return {
          name: value.name || '[Champion]',
          id: value.id || 'unknown',
          isCircularRef: true
        };
      }
      seen.set(value, true);
      
      const cleanChampion = {};
      for (const [championKey, championValue] of Object.entries(value)) {
        if (championKey === 'currentTarget' && Array.isArray(championValue)) {
          // Convert champion references to safe IDs
          cleanChampion[championKey] = championValue.map(target => 
            target && typeof target === 'object' && target.name 
              ? { name: target.name, id: target.id || 'unknown', isReference: true }
              : target
          );
        } else if (championKey === 'targetedBy' && Array.isArray(championValue)) {

          cleanChampion[championKey] = championValue.map(attacker => 
            attacker && typeof attacker === 'object' && attacker.name 
              ? { name: attacker.name, id: attacker.id || 'unknown', isReference: true }
              : attacker
          );
        } else if (championKey === 'currentChampionsAttacking' && Array.isArray(championValue)) {

          cleanChampion[championKey] = championValue.map(attacker => 
            attacker && typeof attacker === 'object' && attacker.name 
              ? { name: attacker.name, id: attacker.id || 'unknown', isReference: true }
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
      return '[Circular Reference]';
    }
    seen.set(value, true);
    
    return value;
  };
}

// Helper function to safely convert data to JSON while preserving all important data
function safeBattleDataToJSON(data) {
  try {
    // First, let's try a deep clone approach that handles circular refs more precisely
    const cleanData = JSON.parse(JSON.stringify(data, createPreciseCircularReplacer()));
    return cleanData;
  } catch (error) {
    console.error('Error converting battle data to JSON:', error);
    
    // Fallback: try to extract the most important data manually
    try {
      if (data && typeof data === 'object') {
        const fallbackData = {
          success: true,
          message: "Partial data due to serialization issues",
          extractedData: {}
        };
        
        // Try to extract key properties safely
        for (const [key, value] of Object.entries(data)) {
          try {
            JSON.stringify(value); // Test if this value can be serialized
            fallbackData.extractedData[key] = value;
          } catch (innerError) {
            fallbackData.extractedData[key] = `[Could not serialize: ${typeof value}]`;
          }
        }
        
        return fallbackData;
      }
    } catch (fallbackError) {
      console.error('Fallback serialization also failed:', fallbackError);
    }
    
    // Last resort
    return {
      success: false,
      error: "Failed to serialize battle data",
      message: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Alternative approach: Send battle history directly without circular refs
function getBattleHistoryClean() {
  try {
    const rawHistory = getBattleHistoryFromLogic();
    
    // If the battle history is structured like your battleLogger.ts, it should be clean
    if (rawHistory && rawHistory.battleLogs && Array.isArray(rawHistory.battleLogs)) {
      return {
        battleLogs: rawHistory.battleLogs.map(log => ({
          formattedTime: log.formattedTime,
          type: log.type,
          details: log.details ? safeBattleDataToJSON(log.details) : null,
          isCrit: log.isCrit,
          source: log.source
        })),
        duration: rawHistory.duration
      };
    }
    
    return safeBattleDataToJSON(rawHistory);
  } catch (error) {
    console.error('Error getting clean battle history:', error);
    return null;
  }
}

const startBattleWithBoard = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    
    const { boardState } = req.body;
    if (!boardState) {
      return res.status(400).json({ error: 'Board state is required' });
    }
    
    console.log("Board state:", boardState);
    
    // Clear the board and battle data before starting new battle
    clearBoard();
    clearBattleData();
    
    let successfulPlacements = 0;
    
    // Count champions to place
    const championsToPlace = Object.entries(boardState).filter(([cellId, cellData]) => 
      cellData && cellData.champion
    );

    console.log("Champions to place:", championsToPlace.length);

    if (championsToPlace.length === 0) {
      return res.status(400).json({ 
        error: 'No champions found on the board. Please place at least one champion before starting a battle.',
        championCount: 0
      });
    }
    
    // Place each champion on the board
    championsToPlace.forEach(([cellId, cellData]) => {
      try {
        const { row, col, team } = parseCellId(cellId);
        
        console.log(`Placing champion ${cellData.champion.name} at row ${row}, col ${col}, team ${team}`);
        
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
          console.log(`✅ Successfully placed champion ${cellData.champion.name}`);
        }
      } catch (error) {
        console.error(`Error placing champion in cell ${cellId}:`, error);
      }
    });

    console.log(`Successfully placed ${successfulPlacements} champions`);

    if (successfulPlacements === 0) {
      return res.status(400).json({ 
        error: 'Failed to place any champions on the board. Please check champion data and try again.',
        championCount: 0,
        attemptedPlacements: championsToPlace.length
      });
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
    // You can expand this based on what specific data you need
    const responseData = {
      success: true,
      battleCompleted: true,
      battleHistory: battleHistory,
      winner: battleResult?.winner || 'unknown',
      duration: battleHistory?.duration || 0,
      debug: {
        receivedCells: Object.keys(boardState),
        championsPlaced: successfulPlacements,
        boardCleared: true,
        battleDataCached: true  
      }
    };

    res.json(responseData);
    
  } catch (error) {
    console.error('Error starting battle:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to start battle', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Rest of your existing functions...
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
        const battleHistory = getBattleHistoryClean();
        res.json(battleHistory);
    } catch(error){
        console.log('Error', error);
        res.status(500).json({ error: 'An error occured while fetching battle history' });
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
    startBattleWithBoard
}