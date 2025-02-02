const { startBattle } = require('./battleLogic.js');

/*
cd simulators/battle-simulator/core
nodemon battleStatistics
*/

const { playerWinRate, opponentWinRate, playerDamage, opponentDamage } = startBattle();

const fetchWinRate = async (req, res) => {
    try {
        console.log('Player win rate is ' + playerWinRate);
        console.log('Opponent win rate is ' + opponentWinRate);

        res.json({ playerWinRate, opponentWinRate });
    } catch (error) {
        console.error('Error: ' + error);
    }
};

const totalDamageDelt = async (req, res) => {
    try {
        const totalPlayerDamage = playerDamage.map(champion => ({
            name: champion.name,
            totalDamage: champion.damageArray.reduce((total, damage) => total + damage, 0)
        }));
        
        const totalOpponentDamage = opponentDamage.map(champion => ({
            name: champion.name,
            totalDamage: champion.damageArray.reduce((total, damage) => total + damage, 0)
        }))

        console.log(totalPlayerDamage);
        console.log(totalOpponentDamage);


    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total damage.' });
    }
};

totalDamageDelt();
fetchWinRate();
module.exports = { fetchWinRate, totalDamageDelt };