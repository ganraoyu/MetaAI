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
    calculateBattleHistory
    } = require('../../../simulators/battle-simulator/core/battleStatistics')

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
    getBattleHistory
}