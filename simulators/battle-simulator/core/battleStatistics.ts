import { Champion } from '../data/champion/champion.js';
import { Request, Response } from 'express';
import { Item } from '../data/item/item.js';

const { startBattle }  = require('./battleLogic.js');

const { player, opponent, battlePlayer, battleOpponent } = startBattle();

const playerStatistics = player.map((champion: Champion, index: number) => {
    if (index < battlePlayer.length) {
        champion.damageTakenArray = battlePlayer[index].damageTakenArray || [];
        champion.trueDamageTakenArray = battlePlayer[index].trueDamageTaken || []
        champion.magicDamageTakenArray = battlePlayer[index].magicDamageTakenArray || []
        champion.shieldDamageTakenArray = battlePlayer[index].shieldDamageTaken || []
        champion.damageArray = battlePlayer[index].damageArray || [];
        champion.trueDamageArray = battlePlayer[index].trueDamageArray || [];
        champion.magicDamageArray = battlePlayer[index].magicDamageArray || [];
        champion.abilityArray = battlePlayer[index].abilityArray || [];
        champion.healArray = battlePlayer[index].healArray || [];
    }
    
    return {
        name: champion.name,
        items: champion.items,
        HP: index < battlePlayer.length ? battlePlayer[index].currentHp : 0,
        shield: champion.shield,
        baseHP: champion.statsByStarLevel[champion.starLevel].hp,
        damageTaken: champion.damageTakenArray,
        trueDamageTaken: champion.trueDamageTakenArray,
        magicDamageTaken: champion.magicDamageTakenArray,
        shieldDamageTaken: champion.shieldDamageTakenArray,
        damageArray: champion.damageArray,
        trueDamageArray: champion.trueDamageArray,
        magicDamageArray: champion.magicDamageArray,
        abilityArray: champion.abilityArray,
        healArray: champion.healArray
    };
});

const opponentStatistics = opponent.map((champion: Champion, index: number) => {
    if (index < battleOpponent.length) {
        champion.damageTakenArray = battleOpponent[index].damageTakenArray || [];
        champion.trueDamageTakenArray = battleOpponent[index].trueDamageTaken || []
        champion.magicDamageTakenArray = battleOpponent[index].magicDamageTakenArray || []
        champion.shieldDamageTakenArray = battleOpponent[index].shieldDamageTaken || []
        champion.damageArray = battleOpponent[index].damageArray || [];
        champion.trueDamageArray = battleOpponent[index].trueDamageArray || [];
        champion.magicDamageArray = battleOpponent[index].magicDamageArray || [];
        champion.abilityArray = battleOpponent[index].abilityArray || [];
        champion.healArray = battleOpponent[index].healArray || [];
    }
    
    return {
        name: champion.name,
        items: champion.items,
        HP: index < battleOpponent.length ? battleOpponent[index].currentHp : 0,
        shield: champion.shield,
        baseHP: champion.statsByStarLevel[champion.starLevel].hp,
        damageTaken: champion.damageTakenArray,
        trueDamageTaken: champion.trueDamageTakenArray,
        magicDamageTaken: champion.magicDamageTakenArray,
        shieldDamageTaken: champion.shieldDamageTakenArray,
        damageArray: champion.damageArray,
        trueDamageArray: champion.trueDamageArray,
        magicDamageArray: champion.magicDamageArray,
        abilityArray: champion.abilityArray,
        healArray: champion.healArray
    };
});

interface ChampionStatistic {
    name: string;
    items: Item[];
    HP: number;
    shield: number;
    baseHP: number;

    damageTaken: number[];
    trueDamageTaken: number[];
    magicDamageTaken: number[];
    shieldDamageTaken: number[];

    damageArray: number[];
    trueDamageArray: number[];
    magicDamageArray: number[];
    abilityArray: number[];
    healArray: number[];
}

interface BattleResult {
    player: Champion[];
    opponent: Champion[];
    playerWinRate: string;
    opponentWinRate: string;
    playerStatistics: ChampionStatistic[];
    opponentStatistics: ChampionStatistic[];
    battleDuration: number;
}

interface DamageData {
    name: string;
    totalDamage: number;
}

interface TrueDamageData {
    name: string;
    totalTrueDamage: number;
}

interface AbilityDamageData {
    name: string;
    totalAbilityDamage: number;
}

interface AllDamageData {
    name: string;
    totalAttackDamage: number;
    totalTrueDamage: number;
    totalMagicDamage: number;
    totalAbilityDamage: number;
    allDamage: number;
    items?: Item[];
}

interface HealingData {
  name: string;
  totalHealing: number;
}

interface ChampionStatusData {
    name: string;
    shield: number;
    HP: number;
    baseHP: number;
    isAlive: boolean;
}

interface ChampionItemData {
    name: string;
    items: Item[];
}

const startBattleData: BattleResult = startBattle();

const calculateWinRate = async (req: Request, res: Response): Promise<{playerWinRate: string; opponentWinRate: string}> => {
    try {
        const { playerWinRate, opponentWinRate } = startBattleData;
        console.log('Player win rate is ' + playerWinRate);
        console.log('Opponent win rate is ' + opponentWinRate);

        return { playerWinRate, opponentWinRate };
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating win rate.' });
        throw error;
    }
};

const calculateChampionItems = async (req: Request, res: Response): Promise<{playerChampionItems: ChampionItemData[]; opponentChampionItems: ChampionItemData[]}> => {
    try {
        const playerChampionItems = playerStatistics.map((champion: ChampionStatistic) => ({
            name: champion.name,
            items: champion.items
        }));

        const opponentChampionItems = opponentStatistics.map((champion: ChampionStatistic) => ({
            name: champion.name,
            items: champion.items   
        }));

        return { playerChampionItems, opponentChampionItems };
    } catch(error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while fetching champion items.' });
        throw error;
    }
}

const calculateAttackDamageDelt = async (req: Request, res: Response): Promise<{totalPlayerDamage: DamageData[]; totalOpponentDamage: DamageData[]}> => {
    try {
        if (playerStatistics.length === 0 || opponentStatistics.length === 0) {
            res.status(400).json({ error: 'No attack damage data available.' });
            throw new Error('No attack damage data available.');
        }

        const totalPlayerDamage = playerStatistics.map((champion: ChampionStatistic) => ({
            name: champion.name,
            totalDamage: champion.damageArray.reduce((total, damage) => total + damage, 0)
        }));
        
        const totalOpponentDamage = opponentStatistics.map((champion: ChampionStatistic) => ({
            name: champion.name,
            totalDamage: champion.damageArray.reduce((total, damage) => total + damage, 0)
        }));

        return { totalPlayerDamage, totalOpponentDamage };
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total attack damage.' });
        throw error;
    }
};

const calculateTrueDamageDelt = async (req: Request, res: Response): Promise<{totalPlayerTrueDamage: TrueDamageData[]; totalOpponentTrueDamage: TrueDamageData[]}> => {
    try{
        if(playerStatistics.length === 0 || opponentStatistics.length === 0){
            res.status(400).json({ error: 'No true damage data available.' });
            throw new Error('No true damage data available.');
        }

        const totalPlayerTrueDamage = playerStatistics.map((champion: ChampionStatistic) => ({
            name:champion.name,
            totalTrueDamage: champion.trueDamageArray.reduce((total, damage) => total + damage, 0)
        }))

        const totalOpponentTrueDamage = opponentStatistics.map((champion: ChampionStatistic) => ({
            name: champion.name,
            totalTrueDamage: champion.trueDamageArray.reduce((total, damage) => total + damage, 0)
        }))

        return { totalPlayerTrueDamage, totalOpponentTrueDamage };
    } catch(error){
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total true damage.' });
        throw error;
    }
}

const calculateAbilityDamageDelt = async (req: Request, res: Response): Promise<{totalPlayerAbilityDamage: AbilityDamageData[]; totalOpponentAbilityDamage: AbilityDamageData[]}> => {
    try {
        if (playerStatistics.length === 0 || opponentStatistics.length === 0) {
            res.status(400).json({ error: 'No ability damage data available.' });
            throw new Error('No ability damage data available.');
        }

        const totalPlayerAbilityDamage = playerStatistics.map((champion: ChampionStatistic) => ({
            name: champion.name,
            totalAbilityDamage: champion.abilityArray.reduce((total, abilityDamage) => total + abilityDamage, 0)
        }));

        const totalOpponentAbilityDamage = opponentStatistics.map((champion: ChampionStatistic) => ({
            name: champion.name,
            totalAbilityDamage: champion.abilityArray.reduce((total, abilityDamage) => total + abilityDamage, 0)
        }));

        console.log(totalPlayerAbilityDamage);
        console.log(totalOpponentAbilityDamage);

        return { totalPlayerAbilityDamage, totalOpponentAbilityDamage };
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total ability damage.' });
        throw error;
    }
};

const calculateAllDamageDelt = async (req: Request, res: Response): Promise<{allPlayerDamage: AllDamageData[]; allOpponentDamage: AllDamageData[]}> => {
    try {
        if (playerStatistics.length === 0 || opponentStatistics.length === 0) {
            res.status(400).json({ error: 'No total damage data available.' });
            throw new Error('No data available');
        }

        const { totalPlayerDamage, totalOpponentDamage } = await calculateAttackDamageDelt(req, res);
        const { totalPlayerTrueDamage, totalOpponentTrueDamage } = await calculateTrueDamageDelt(req, res);
        const { totalPlayerAbilityDamage, totalOpponentAbilityDamage } = await calculateAbilityDamageDelt(req, res);

        const allPlayerDamage = totalPlayerDamage.map((champion: DamageData, index: number) => ({
            name: champion.name,
            totalAttackDamage: champion.totalDamage,
            totalTrueDamage: totalPlayerTrueDamage[index].totalTrueDamage,
            totalMagicDamage: 0,
            totalAbilityDamage: totalPlayerAbilityDamage[index].totalAbilityDamage,
            allDamage: champion.totalDamage + totalPlayerTrueDamage[index].totalTrueDamage + totalPlayerAbilityDamage[index].totalAbilityDamage,
            items: playerStatistics[index].items
        }))

        const allOpponentDamage = totalOpponentDamage.map((champion: DamageData, index: number) =>({
            name: champion.name,
            totalAttackDamage: champion.totalDamage,
            totalTrueDamage: totalOpponentTrueDamage[index].totalTrueDamage,
            totalMagicDamage: 0,
            totalAbilityDamage: totalOpponentAbilityDamage[index].totalAbilityDamage,
            allDamage: champion.totalDamage + totalOpponentTrueDamage[index].totalTrueDamage + totalOpponentAbilityDamage[index].totalAbilityDamage,
            items: opponentStatistics[index].items
        }))

        return { allPlayerDamage, allOpponentDamage };
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).json({ error: 'An error occurred while calculating total damage.' });
        throw error;
    }
};

const calculateHealing = async (req: Request, res: Response): Promise<{totalPlayerHealing: HealingData[]; totalOpponentHealing: HealingData[]}> => {
    try {
        const totalPlayerHealing = playerStatistics.map((champion: ChampionStatistic) => ({
            name: champion.name,
            totalHealing: champion.healArray.reduce((total, heal) => total + heal, 0)
        }));

        const totalOpponentHealing = opponentStatistics.map((champion: ChampionStatistic) => ({
            name: champion.name,
            totalHealing: champion.healArray.reduce((total, heal) => total + heal, 0)
        }));


        return { totalPlayerHealing, totalOpponentHealing };
    } catch (error) {
        console.log('Error' + error);
        res.status(500).json({ error: 'An error occurred while calculating healing.' });
        throw error;
    }
};

const calculateIsAliveOrDead = async (req: Request, res: Response): Promise<{checkPlayerChampionAliveOrDead: ChampionStatusData[]; checkOpponentChampionAliveOrDead: ChampionStatusData[]}> => {
    try {
        const checkPlayerChampionAliveOrDead = playerStatistics.map((champion: ChampionStatistic) => ({
            name: champion.name,
            HP: champion.HP,
            baseHP: champion.baseHP,
            isAlive: champion.HP > 0 ? true : false,
        }));

        const checkOpponentChampionAliveOrDead = opponentStatistics.map((champion: ChampionStatistic) => ({
            name: champion.name,
            HP: champion.HP,
            baseHP: champion.baseHP,
            isAlive: champion.HP > 0 ? true : false,
        }));

        return { checkPlayerChampionAliveOrDead, checkOpponentChampionAliveOrDead };
    } catch(error){
        console.log('Error', error);
        res.status(500).json({ error: 'An error occurred while checking if champions are alive or dead.' });
        throw error;
    }
};

interface PlayerStatistics {
    playerWinRate: string;
    playerStatistics: Array<{
        name: string;
        items: Item[];
        hp: number;
        isAlive: boolean;
        totalChampionDamage: number;
        totalChampionAbilityDamage: number;
        allChampionDamage: number;
        totalChampionHealing: number;
    }>;
}

interface OpponentStatistics {
    opponentWinRate: string;
    opponentStatistics: Array<{
        name: string;
        items: Item[];
        hp: number;
        isAlive: boolean;
        totalChampionDamage: number;
        totalChampionAbilityDamage: number;
        allChampionDamage: number;
        totalChampionHealing: number;
    }>;
}

const calculateAllBattleStatistics = async (req: Request, res: Response): Promise<{playerChampionStatistics: PlayerStatistics[]; opponentChamionStatistics: OpponentStatistics[]}> => {
    try {
        const { playerWinRate, opponentWinRate } = await calculateWinRate(req, res);
        const { allPlayerDamage, allOpponentDamage } = await calculateAllDamageDelt(req, res);
        const { totalPlayerHealing, totalOpponentHealing } = await calculateHealing(req, res);
        const { checkPlayerChampionAliveOrDead, checkOpponentChampionAliveOrDead } = await calculateIsAliveOrDead(req, res);

        const playerChampionStatistics: PlayerStatistics[] = [{
            playerWinRate,
            playerStatistics: allPlayerDamage.map((champion, index) => ({
                name: champion.name,
                items: champion.items || [],
                hp: checkPlayerChampionAliveOrDead[index].HP,
                isAlive: checkPlayerChampionAliveOrDead[index].isAlive,
                totalChampionDamage: champion.totalAttackDamage,
                totalChampionTrueDamage: champion.totalTrueDamage,
                totalChampionMagicDamage: champion.totalMagicDamage,
                totalChampionAbilityDamage: champion.totalAbilityDamage,
                allChampionDamage: champion.allDamage,
                totalChampionHealing: totalPlayerHealing[index].totalHealing,
            }))
        }];

        checkPlayerChampionAliveOrDead.forEach((champion, index) => {
            console.log(`Champion ${index + 1} HP:`, champion.HP);
        });

        const opponentChamionStatistics: OpponentStatistics[] = [{
            opponentWinRate,
            opponentStatistics: allOpponentDamage.map((champion, index) => ({
                name: champion.name,       
                items: champion.items || [],   
                hp: checkOpponentChampionAliveOrDead[index].HP,                  
                isAlive: checkOpponentChampionAliveOrDead[index].isAlive,
                totalChampionDamage: champion.totalAttackDamage,
                totalChampionTrueDamage: champion.totalTrueDamage,
                totalChampionMagicDamage: champion.totalMagicDamage,
                totalChampionAbilityDamage: champion.totalAbilityDamage,
                allChampionDamage: champion.allDamage,
                totalChampionHealing: totalOpponentHealing[index].totalHealing,
            }))
        }];

        return { playerChampionStatistics, opponentChamionStatistics };

    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ error: 'An error occurred while calculating alasdal battle statistics.' });
        throw error;
    };
};

const calculateBattleHistory = async (req: Request, res: Response): Promise<BattleResult> => {
    try {
        const battleHistory = startBattleData;
        return battleHistory;
    } catch(error){
        console.log('Error', error);
        res.status(500).json({ error: 'An error occurred while fetching battle history.' });
        throw error;
    };
};

/* 
calculateWinRate();
calculateAbilityDamageDelt();
calculateAttackDamageDelt();
calculateAllDamageDelt();
calculateHealing();
calculateIsAliveOrDead();
calculateAllBattleStatistics();
*/

module.exports = { 
    calculateWinRate, 
    calculateChampionItems,
    calculateAttackDamageDelt, 
    calculateAbilityDamageDelt, 
    calculateAllDamageDelt, 
    calculateHealing,
    calculateIsAliveOrDead,
    calculateAllBattleStatistics,
    calculateBattleHistory,
};