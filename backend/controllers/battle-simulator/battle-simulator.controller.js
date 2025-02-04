const { 
    calculateWinRate, 
    calculateAttackDamageDelt, 
    calculateAbilityDamageDelt, 
    calculateAllDamageDelt,
    calculateHealing,
    calculateAllBattleStatistics
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

const getAllBattleStatistics = async (req, res) => {
    try{ 
         const battleStatistics = await calculateAllBattleStatistics();
         res.json(battleStatistics)
    } catch(error){
        console.log('Error', error)
        res.status(500).json({ error: 'An error occured while calculating battle statistics '})
    }
}

module.exports = { getWinRate, getAttackDamageDelt, getAbilityDamageDelt, getAllDamageDelt, getHealing, getAllBattleStatistics }