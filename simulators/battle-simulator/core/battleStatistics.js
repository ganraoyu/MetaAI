const { startBattle } = require('./battleLogic.js');

const { playerWinRate, opponentWinRate } = await startBattle();

const fetchWinRate = async (req, res) => {
    try {
        console.log('Player win rate is1 ' + playerWinRate);
        console.log('Opponent win rate is1 ' + opponentWinRate);

        res.json({ playerWinRate, opponentWinRate });
    } catch (error) {
        console.error('Error: ' + error);
    }
};

fetchWinRate();

module.exports = { fetchWinRate };