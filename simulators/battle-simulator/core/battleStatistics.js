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
        opponentAbilityDamage,
        playerHealing
      } = startBattle();

const calculateWinRate = async (req, res) => {
    try {
        console.log('Player win rate is ' + playerWinRate);
        console.log('Opponent win rate is ' + opponentWinRate);

        return { playerWinRate, opponentWinRate } 
    } catch (error) {
        console.error('Error: ' + error);
    }
};

const calculateAttackDamageDelt = async (req, res) => {
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

        console.log(totalPlayerDamage);
        console.log(totalOpponentDamage);


        return { totalPlayerDamage, totalOpponentDamage };
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total ability damage.' });
    }
};

const calculateAbilityDamageDelt = async (req, res) => {
    try{
        if(playerAbilityDamage.length === 0 || opponentAbilityDamage.length === 0 ){
            res.status(400).json({ error: 'No attack damage data available.' });
        }

        const totalPlayerAbilityDamage = playerAbilityDamage.map(champion => ({
            name: champion.name,
            totalAbilityDamage: champion.abilityArray.reduce((total, abilityDamage) => total + abilityDamage, 0)
        }));

        const totalOpponentAbilityDamage = opponentAbilityDamage.map(champion => ({
            name: champion.name,
            totalAbilityDamage: champion.abilityArray.reduce((total, abilityDamage) => total + abilityDamage, 0)
        }));

        console.log(totalPlayerAbilityDamage);
        console.log(totalOpponentAbilityDamage);

        return { totalPlayerAbilityDamage, totalOpponentAbilityDamage };
    } catch(error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total ability damage.' });
    }
};

const calculateAllDamageDelt = async (req, res) => {
    try {
        const { totalPlayerDamage, totalOpponentDamage } = await calculateAttackDamageDelt();
        const { totalPlayerAbilityDamage, totalOpponentAbilityDamage } = await calculateAbilityDamageDelt();

        if(totalPlayerDamage.length === 0 || totalOpponentDamage.length === 0) {
            return res.status(400).json({ error: 'No total damage data available.' });
        }

        if(totalPlayerAbilityDamage.length === 0 || totalOpponentAbilityDamage.length === 0) {
            return res.status(400).json({ error: 'No total ability damage data available.' });
        }

        const playerAbilityDamageMap = totalPlayerAbilityDamage.map(champion => champion.totalAbilityDamage)
        const opponentAbilityDamageMap = totalOpponentAbilityDamage.map(champion => champion.totalAbilityDamage)

        const allPlayerDamage = totalPlayerDamage.map(champion => ({
            name: champion.name,
            allDamage: parseInt(champion.totalDamage) + parseInt(playerAbilityDamageMap)
        }))
        
        const allOpponentDamage = totalOpponentDamage.map(champion => ({
            name: champion.name,
            allDamage: parseInt(champion.totalDamage) + parseInt(opponentAbilityDamageMap)
        }))

        
        console.log(allPlayerDamage);
        console.log(allOpponentDamage);
        console.log(playerAbilityDamageMap)
        console.log(opponentAbilityDamageMap)
        console.log(totalOpponentDamage)
        console.log(totalPlayerDamage)
        
        
        return { allPlayerDamage, allOpponentDamage };
    } catch(error){
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total damage.' });
    }
}

const calculateHealing = async (req, res) => {
    try{
        const totalPlayerHealing = playerHealing.map(champion => ({
            name:champion.name,
            totalHealing: champion.healArray.reduce((total, heal) =>  total + heal , 0)
        }))

        console.log('Healing', totalPlayerHealing)
    } catch(error){
        console.log('Error' + error);
        res.status(500).json({ error: 'An error occurred while calculating healing.' });
    }
}

calculateWinRate();
calculateAttackDamageDelt();
calculateAbilityDamageDelt();
calculateAllDamageDelt(); 
calculateHealing();

module.exports = { calculateWinRate, calculateAttackDamageDelt, calculateAbilityDamageDelt, calculateAllDamageDelt }; 