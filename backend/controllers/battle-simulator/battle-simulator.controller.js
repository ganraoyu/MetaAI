const { 
    calculateWinRate, 
    calculateAttackDamageDelt, 
    calculateAbilityDamageDelt, 
    calculateAllDamageDelt 
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


module.exports = { getWinRate, getAttackDamageDelt, getAbilityDamageDelt, getAllDamageDelt }