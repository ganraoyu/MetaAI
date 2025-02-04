const { startBattle } = require('./battleLogic.js');

/*
cd simulators/battle-simulator/core
nodemon battleStatistics
*/

const calculateWinRate = async (req, res) => {
    try {
        const { playerWinRate, opponentWinRate } = startBattle();
        console.log('Player win rate is ' + playerWinRate);
        console.log('Opponent win rate is ' + opponentWinRate);

        return { playerWinRate, opponentWinRate };
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating win rate.' });
    }
};

const calculateAttackDamageDelt = async (req, res) => {
    try {
        const { playerStatistics, opponentStatistics } = startBattle();

        if (playerStatistics.length === 0 || opponentStatistics.length === 0) {
            res.status(400).json({ error: 'No attack damage data available.' });
            throw new Error('No attack damage data available.');
        }

        const totalPlayerDamage = playerStatistics.map(champion => ({
            name: champion.name,
            totalDamage: champion.damageArray.reduce((total, damage) => total + damage, 0)
        }));
        
        const totalOpponentDamage = opponentStatistics.map(champion => ({
            name: champion.name,
            totalDamage: champion.damageArray.reduce((total, damage) => total + damage, 0)
        }));

        console.log(totalPlayerDamage);
        console.log(totalOpponentDamage);

        return { totalPlayerDamage, totalOpponentDamage };
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total attack damage.' });
    }
};

const calculateAbilityDamageDelt = async (req, res) => {
    try {
        const { playerStatistics, opponentStatistics } = startBattle();

        if (playerStatistics.length === 0 || opponentStatistics.length === 0) {
            res.status(400).json({ error: 'No ability damage data available.' });
            throw new Error('No ability damage data available.');
        }

        const totalPlayerAbilityDamage = playerStatistics.map(champion => ({
            name: champion.name,
            totalAbilityDamage: champion.abilityArray.reduce((total, abilityDamage) => total + abilityDamage, 0)
        }));

        const totalOpponentAbilityDamage = opponentStatistics.map(champion => ({
            name: champion.name,
            totalAbilityDamage: champion.abilityArray.reduce((total, abilityDamage) => total + abilityDamage, 0)
        }));

        console.log(totalPlayerAbilityDamage);
        console.log(totalOpponentAbilityDamage);

        return { totalPlayerAbilityDamage, totalOpponentAbilityDamage };
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total ability damage.' });
    }
};

const calculateAllDamageDelt = async (req, res) => {
    try {
        const { playerStatistics, opponentStatistics } = startBattle();

        if (playerStatistics.length === 0 || opponentStatistics.length === 0) {
            return res.status(400).json({ error: 'No total damage data available.' });
        }

        if (playerStatistics.length === 0 || opponentStatistics .length === 0) {
            return res.status(400).json({ error: 'No total ability damage data available.' });
        }

        const totalPlayerDamage = playerStatistics.map(champion => ({
            name: champion.name,
            totalDamage: champion.damageArray.reduce((total, damage) => total + damage, 0)
        }));

        const totalOpponentDamage = opponentStatistics.map(champion => ({
            name: champion.name,
            totalDamage: champion.damageArray.reduce((total, damage) => total + damage, 0)
        }));

        const totalPlayerAbilityDamage = playerStatistics.map(champion => ({
            name: champion.name,
            totalAbilityDamage: champion.abilityArray.reduce((total, abilityDamage) => total + abilityDamage, 0)
        }));

        const totalOpponentAbilityDamage = opponentStatistics.map(champion => ({
            name: champion.name,
            totalAbilityDamage: champion.abilityArray.reduce((total, abilityDamage) => total + abilityDamage, 0)
        }));

        const allPlayerDamage = totalPlayerDamage.map((champion, index) => ({
            name: champion.name,
            totalAttackDamage: champion.totalDamage,
            totalAbilityDamage: totalPlayerAbilityDamage[index].totalAbilityDamage, 
            allDamage: champion.totalDamage + totalPlayerAbilityDamage[index].totalAbilityDamage
        }));
        
        const allOpponentDamage = totalOpponentDamage.map((champion, index) => ({
            name: champion.name,
            totalAttackDamage: champion.totalDamage,
            totalAbilityDamage: totalOpponentAbilityDamage[index].totalAbilityDamage,
            allDamage: champion.totalDamage + totalOpponentAbilityDamage[index].totalAbilityDamage
        }));

        console.log(allPlayerDamage);
        console.log(allOpponentDamage);

        return { allPlayerDamage, allOpponentDamage }
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total damage.' });
    }
};

const calculateHealing = async (req, res) => {
    try {
        const { playerStatistics, opponentStatistics } = startBattle();

        const totalPlayerHealing = playerStatistics.map(champion => ({
            name: champion.name,
            totalHealing: champion.healArray.reduce((total, heal) => total + heal, 0)
        }));

        const totalOpponentHealing = opponentStatistics.map(champion => ({
            name: champion.name,
            totalHealing: champion.healArray.reduce((total, heal) => total + heal, 0)
        }));

        console.log(totalPlayerHealing);
        console.log(totalOpponentHealing);
        return { totalPlayerHealing, totalOpponentHealing }
    } catch (error) {
        console.log('Error' + error);
        res.status(500).json({ error: 'An error occurred while calculating healing.' });
    }
};

const calculateAllBattleStatistics = async (req, res) => {
    try {
        const { playerWinRate, opponentWinRate } = await calculateWinRate();
        const { totalPlayerDamage, totalOpponentDamage } = await calculateAttackDamageDelt();
        const { totalPlayerAbilityDamage, totalOpponentAbilityDamage } = await calculateAbilityDamageDelt();
        const { allPlayerDamage, allOpponentDamage } = await calculateAllDamageDelt();
    
        const playerStatistics = allPlayerDamage.map((champion, index) => ({
            name: champion.name,
            totalPlayerDamage: champion.totalDamage,
        }));

        return { 
            playerWinRate, 
            opponentWinRate, 
            totalPlayerDamage, 
            totalOpponentDamage, 
            totalPlayerAbilityDamage, 
            totalOpponentAbilityDamage, 
            allPlayerDamage, 
            allOpponentDamage
        };

    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ error: 'An error occurred while calculating all battle statistics.' });
    }
};


calculateWinRate();
calculateAttackDamageDelt();
calculateAbilityDamageDelt();
calculateAllDamageDelt();
calculateHealing();
// calculateAllBattleStatistics();



module.exports = { 
    calculateWinRate, 
    calculateAttackDamageDelt, 
    calculateAbilityDamageDelt, 
    calculateAllDamageDelt, 
    calculateHealing,
    calculateAllBattleStatistics
};