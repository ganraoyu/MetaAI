const { 
    calculateWinRate, 
    calculateChampionItems,
    calculateAttackDamageDelt, 
    calculateAbilityDamageDelt, 
    calculateAllDamageDelt,
    calculateHealing,
    calculateIsAliveOrDead,
    calculateAllBattleStatistics,
    calculateBattleHistory
    } = require('../../../simulators/battle-simulator/core/battleStatistics')

const getWinRate = async (req, res) => {
    try{
        const winRate = await calculateWinRate();
        res.json(winRate);
    } catch(error){
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating win rate.' });
    }
}

const getChampionItems = async (req, res) => {
    try{
        const championItems = await calculateChampionItems();
        res.json(championItems);
    } catch(error){
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while fetching champion items.' });
    }
}
const getAttackDamageDelt = async (req, res) => {
    try{
        const attackDamage = await calculateAttackDamageDelt();
        res.json(attackDamage);
    } catch(error){
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating attack damage.' });
    }
}

const getAbilityDamageDelt = async (req, res) => {
    try{
        const abilityDamage = await calculateAbilityDamageDelt();
        res.json(abilityDamage);
    } catch(error){
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating ability damage.' });
    }
}

const getAllDamageDelt = async (req, res) => {
    try{
        const allDamage = await calculateAllDamageDelt();
        res.json(allDamage);
    } catch(error){
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating all damage.' });
    }
}

const getHealing = async (req, res) => {
    try{
        const healing = await calculateHealing();
        res.json(healing)
    } catch(error){
        console.log('Error', error)
        res.status(500).json({ error: 'An error occurred while calculating healing.' });
    }
}

const getAliveOrDead = async (req, res) => {
    try{
        const aliveOrDead = await calculateIsAliveOrDead();
        res.json(aliveOrDead)
    } catch(error){
        console.log('Error', error)
        res.status(500).json({ error: 'An error occurred while calculating alive or dead.' });
    }
}
const getAllBattleStatistics = async (req, res) => {
    try{ 
         const battleStatistics = await calculateAllBattleStatistics();
         res.json(battleStatistics)
    } catch(error){
        console.log('Error', error)
        res.status(500).json({ error: 'An error occured while calculating battle statistics '})
    }
}

const getBattleHistory = async (req, res) => {
    try{
        const battleHistory = await calculateBattleHistory();
        res.json(battleHistory)
    } catch(error){
        console.log('Error', error)
        res.status(500).json({ error: 'An error occured while fetching battle history '})
    }
}

module.exports = { 
    getWinRate, 
    getChampionItems,
    getAttackDamageDelt, 
    getAbilityDamageDelt, 
    getAllDamageDelt, 
    getHealing, 
    getAliveOrDead,
    getAllBattleStatistics,
    getBattleHistory
}