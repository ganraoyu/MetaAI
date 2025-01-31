const { startBattle } = require('./battleLogic.js');

const fetchWinRate = async (req, res) => {
    try {
        // Assuming startBattle is asynchronous
        const { playerWinRate, opponentWinRate } = await startBattle();

        console.log('Player win rate is ' + playerWinRate);
        console.log('Opponent win rate is ' + opponentWinRate);

        res.json({ playerWinRate, opponentWinRate });
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { fetchWinRate };