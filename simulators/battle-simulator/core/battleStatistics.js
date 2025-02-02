const { startBattle } = require('./battleLogic.js');

/*
cd simulators/battle-simulator/core
nodemon battleStatistics
*/

const { playerWinRate, 
        opponentWinRate, 
        playerAttackDamage, 
        opponentAttackDamage, 
        playerAbilityDamage, 
        opponentAbilityDamage 
    } = startBattle();

const fetchWinRate = async (req, res) => {
    try {
        console.log('Player win rate is ' + playerWinRate);
        console.log('Opponent win rate is ' + opponentWinRate);

        res.json({ playerWinRate, opponentWinRate });
    } catch (error) {
        console.error('Error: ' + error);
    }
};

const attackDamageDelt = async (req, res) => {
    try {

        if(playerAttackDamage.length === 0 || opponentAttackDamage.length === 0) {
            res.status(400).json({ error: 'No attack damage data available.' });
            throw new Error('No attack damage data available.');
        }

        const totalPlayerDamage = playerAttackDamage.map(champion => ({
            name: champion.name,
            totalDamage: champion.damageArray.reduce((total, damage) => total + damage, 0)
        }));
        
        const totalOpponentDamage = opponentAttackDamage.map(champion => ({
            name: champion.name,
            totalDamage: champion.damageArray.reduce((total, damage) => total + damage, 0)
        }))

        // console.log(totalPlayerDamage);
        // console.log(totalOpponentDamage);

        res.json({ totalPlayerDamage, totalOpponentDamage });
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total ability damage.' });
    }
};

const abilityDamageDelt = async (req, res) => {
    try{
        const totalPlayerAbilityDamage = playerAbilityDamage.map(champion => ({
            name: champion.name,
            totalAbilityDamage: champion.abilityArray.reduce((total, abilityDamage) => total + abilityDamage, 0)
        }));

        const totalOpponentAbilityDamage = opponentAbilityDamage.map(champion => ({
            name: champion.name,
            totalAbilityDamage: champion.abilityArray.reduce((total, abilityDamage) => total + abilityDamage, 0)
        }));

        // console.log(totalPlayerAbilityDamage);
        // console.log(totalOpponentAbilityDamage);

        res.json({ totalPlayerAbilityDamage, totalOpponentAbilityDamage });
    } catch(error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total ability damage.' });
    }
};

module.exports = { fetchWinRate, attackDamageDelt, abilityDamageDelt };