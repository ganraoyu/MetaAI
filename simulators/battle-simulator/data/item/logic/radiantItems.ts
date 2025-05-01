import { Item, ItemProps } from '../item'; 
import { Champion } from '../../champion/champion';
import { getFormattedTime } from '../../../utils/formattedTime';
import { logBattleEvent } from '../../../core/battleLogger';

export function dragonsWillEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    let formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Dragon\'s Will' && 
            item.heal && 
            item.healAmount && 
            battleTime % 200 === 0 && 
            battleTime > 0 &&
            champion.currentHp !== champion.statsByStarLevel[champion.starLevel].hp
        ){
            const healAmount = Math.round(champion.statsByStarLevel[champion.starLevel].hp * item.healAmount);
            champion.currentHp += healAmount;
            champion.healArray.push(healAmount);

            logBattleEvent('heal', {
                champion: champion.name,
                healAmount: healAmount,
                item: item.name,
                type: 'item',
                source: 'Dragon\'s Will',
            }, battleTime);
            console.log(`[${formattedTime}] ${champion.name} healed for ${healAmount} hp from Dragon's Will`);
        };
    });
};

const blessedBloodthirsterStateMap = new Map();

export function blessedBloodthirsterEffect(champion: Champion, battleTime: number ){   
    if (!champion?.items?.length || !battleTime) return;

    let formattedTime = getFormattedTime(champion);
    
    if(!blessedBloodthirsterStateMap.has(champion.id)){
        blessedBloodthirsterStateMap.set(champion.id, {
            effectUsed: false
        })
    }

    const state = blessedBloodthirsterStateMap.get(champion.id);
    
    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Blessed Bloodthirster' && 
            item.shield && 
            item.shieldAmount && 
            item.shieldDuration && 
            !state.effectUsed
        ){
            if(champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.4){
                const shieldAmount = champion.statsByStarLevel[champion.starLevel].hp * item.shieldAmount;
                champion.shield += shieldAmount
                state.effectUsed = true;

                logBattleEvent('shield', {
                    champion: champion.name,
                    shieldAmount: shieldAmount,
                    item: item.name,
                    type: 'item',
                    source: 'Blessed Bloodthirster',
                    message: `${champion.name} gained a shield for ${shieldAmount} hp`,
                }, battleTime);

                console.log(`[${formattedTime}] ${champion.name} gained a shield for ${shieldAmount} hp`);
            }
        }
    })
}

const rosethronVestStateMap = new Map();

export function rosethornVestEffect(champion: Champion, surroundingOpponents: Champion[], battleTime: number){ 
    if (!champion?.items?.length || !battleTime) return;

    let formattedTime = getFormattedTime(champion);

    if(!rosethronVestStateMap.has(champion.id)){
        rosethronVestStateMap.set(champion.id, {
            effectUsed: false,
            attackCount: 0,
            magicAttackCount: 0,
            abilityAttackCount: 0,
            timeSinceEffectUsed: 0,
        });
    };

    const state = rosethronVestStateMap.get(champion.id);
    
    if(champion.damageTakenArray.length > state.attackCount || champion.magicDamageTakenArray.length > state.magicAttackCount){
        state.effectUsed = true;
        state.attackCount = champion.damageTakenArray.length;
        state.magicAttackCount = champion.magicDamageTakenArray.length;

    };
   
    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Rosethorn Vest' && 
            state.effectUsed && 
            battleTime - state.timeSinceEffectUsed >= 200
        ){
            surroundingOpponents.forEach((target: Champion) => {
            const magicDamage = item.externalMagicDamage || 175;

            target.currentHp -= magicDamage;
            champion.magicDamageArray.push(magicDamage);
            target.magicDamageTakenArray.push(magicDamage);

            state.effectUsed = false;
            state.timeSinceEffectUsed = battleTime;
            logBattleEvent('magicDamage', {
                champion: champion.name,
                target: target.name,
                magicDamage: magicDamage,
                item: item.name,
                type: 'item',
                source: 'Rosethorn Vest',
                message: `${champion.name} dealt 100 magic damage to ${target.name} from Rosethorn Vest`,
            }, battleTime)
                    
            console.log(`[${formattedTime}] ${champion.name} dealt ${magicDamage} magic damage to ${target.name} from Rosethorn Vest`);
            });
        };
    });
};

const demonSlayerStateMap = new Map();

export function demonSlayerEffect(champion: Champion, target: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;
    
    const formattedTime = getFormattedTime(champion);

    if(!demonSlayerStateMap.has(champion.id)){
        demonSlayerStateMap.set(champion.id, {
            effectUsed: false,
        });
    };

    const state = demonSlayerStateMap.get(champion.id);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Demon Slayer' && 
            target.statsByStarLevel[target.starLevel].hp > 1750 && !state.effectUsed
        ){
            champion.damageAmp += 0.3; // 30% damage amp
            state.effectUsed = true;

            logBattleEvent('damageAmp', {
                champion: champion.name,
                target: target.name,
                damageAmp: item.additionalDamageAmp,
                item: item.name,
                type: 'item',
                source: 'Demon Slayer',
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} gained 30% damage amp against ${target.name} from Demon Slayer`);
        }
    })
}

export function urlAngelsStaffEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Urf-Angel\'s Staff' && item.abilityPowerStacking){
            if(battleTime % 500 === 0){
                champion.abilityPower += item.additionalAbilityPowerPerStack || 0; 

                logBattleEvent('stacking', {
                    champion: champion.name,
                    abilityPowerGained: item.additionalAbilityPowerPerStack,
                    currentAbilityPower: champion.abilityPower,
                    item: item.name,
                    type: 'item',
                    source: 'Urf-Angel\'s Staff',
                    message: `${champion.name} gained ${item.additionalAbilityPowerPerStack} ability power from Urf-Angel\'s Staff`,
                }, battleTime);

                console.log(`[${formattedTime}] ${champion.name} gained ${item.additionalAbilityPowerPerStack} ability power from Urf-Angel\'s Staff`);
            }
        }
    })
}

export function runaansTempestEffect(champion: Champion){
    if (!champion?.items?.length) return;
    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Runaan\s Tempest'){
            champion.statsByStarLevel[champion.starLevel].attackDamage += champion.statsByStarLevel[champion.starLevel].attackDamage * 0.55;
        }
    })
}

const steraksMegashieldstateMap = new Map();

export function steraksMegashieldEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length) return;
    
    const formattedTime = getFormattedTime(champion);

    if(!steraksMegashieldstateMap.has(champion.id)){
        steraksMegashieldstateMap.set(champion.id, {
            effectUsed: false
        })
    }

    const state = steraksMegashieldstateMap.get(champion.id)

    champion.items.forEach((item: ItemProps) =>{
        if(item.name ==='Sterak\'s Megashield' &&
            !state.effectUsed &&
            champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.6
        ){
            const healAmount = champion.statsByStarLevel[champion.starLevel].hp *  0.4;
            champion.currentHp += healAmount
            champion.statsByStarLevel[champion.starLevel].attackDamage *= 1.8;
    
            champion.healArray.push(healAmount)

            logBattleEvent('heal', {
                champion: champion.name,
                healAmount: healAmount,
                item: item.name,
                type: 'item',
                source: 'Sterak\'s Megashield',
                message: `${champion.name} gained ${healAmount} health from Sterak's Megashield`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} gained ${healAmount} health from Sterak's Megashield`);
            state.effectUsed = true;
        }
    })
}

const titansVowStateMap = new Map();

export function titansVowEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);

    if(!titansVowStateMap.has(champion.id)){
        titansVowStateMap.set(champion.id, {
            effectUsed: false,            
            fullStackEffectUsed: false,   
            titansVowStacks: 0,       
            damageTakenArray: [],         
            damageTaken: false,           
        })
    }

    const state = titansVowStateMap.get(champion.id)

    // Check if champion has taken new damage since last check
    if(champion.damageTakenArray && champion.damageTakenArray.length > state.damageTakenArray.length){
        state.damageTaken = true;
        state.damageTakenArray.push(battleTime);
    };

    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Titan\'s Vow' &&             
            !state.effectUsed &&
            item.abilityPowerStacking && 
            state.titansVowStacks < 25 && 
            state.damageTaken                  
        ){            
            // Apply stacking bonuses
            champion.abilityPower += 3;
            champion.statsByStarLevel[champion.starLevel].attackDamage *= 1.03;
            state.titansVowStacks += 1;

            logBattleEvent('stacking', {
                champion: champion.name,
                attackDamageGained: 3,
                abilityPowerGained: 3,
                currentAttackDamage: champion.statsByStarLevel[champion.starLevel].attackDamage,
                currentAbilityPower: champion.abilityPower,
                item: item.name,
                type: 'item',
                source: 'Titan\'s Vow',
                message: `${champion.name} Titan's Vow Stacks: ${state.titansVowStacks}/25`,
            }, battleTime)

            console.log(`[${formattedTime}] ${champion.name} gained 2% attack damage and 1 ability power (Stack ${state.titansVowStacks}/25) from Titan's Vow`);
            state.damageTaken = false;  // Reset damage taken flag
        } else if(state.titansVowStacks === 25 && !state.fullStackEffectUsed){
            // Apply bonus stats when max stacks are reached
            state.effectUsed = true;      
            state.fullStackEffectUsed = true;
            champion.statsByStarLevel[champion.starLevel].armor += 50;
            champion.statsByStarLevel[champion.starLevel].magicResist += 50;

            logBattleEvent('stacking', {
                champion: champion.name,
                armorGained: 50,
                magicResistGained: 50,
                currentArmor: champion.statsByStarLevel[champion.starLevel].armor,
                currentMagicResist: champion.statsByStarLevel[champion.starLevel].magicResist,
                item: item.name,
                type: 'item',
                source: 'Titan\'s Vow',
                message: `${champion.name} gained 50 armor and 50 magic resist from Titan's Vow`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} gained 50 armor and 50 magic resist from Titan's Vow`);
        };
    });
};

const legacyOfTheColossusStateMap = new Map();

export function legacyOfTheColossusEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length) return;

    const formattedTime = getFormattedTime(champion);

    if(!legacyOfTheColossusStateMap.has(champion.id)){
        legacyOfTheColossusStateMap.set(champion.id, {
            effectUsed: false,
            effectExpired: false,
        });
    }

    const state = legacyOfTheColossusStateMap.get(champion.id);

    champion.items.forEach((item: ItemProps) =>{
        // When champion's health is ABOVE 50%, give 15 durability
        if(item.name === 'Legacy Of The Colossus' && 
           !state.effectUsed && 
           champion.currentHp > champion.statsByStarLevel[champion.starLevel].hp * 0.5
        ){
            champion.durability += 30;

            logBattleEvent('durability', {
                champion: champion.name,
                durabilityGained: 30,
                currentDurability: champion.durability,
                item: item.name,
                message: `${champion.name} gained 30 durability from Legacy Of The Colossus`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} gained 15 durability`);
            state.effectUsed = true;
            state.effectExpired = false; // Reset expired flag
        } 
        // When champion's health drops BELOW 40%, reduce to 14 durability
        else if(item.name === 'Legacy Of The Colossus' && 
                state.effectUsed && 
                champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.4 && 
                !state.effectExpired
        ){
            champion.durability -= 14; // Reduce from 30 to 16
            state.effectExpired = true;
            state.effectUsed = false; // Allow effect to be used again if health goes back up

            logBattleEvent('durability', {
                champion: champion.name,
                durabilityLost: 14,
                currentDurability: champion.durability,
                item: item.name,
                type: 'item',
                source: 'Legacy Of The Colossus',
                message: `${champion.name} lost 14 durability from Legacy Of The Colossus`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} lost 14 durability`);
        }
    });
}

export function eternalWhisperEffect(champion: Champion, target: Champion, battleTime: number){
    if (!champion?.items?.length) return;

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Eternal Whisper'){
            if(!target.sunder){
                target.sunder = true;

                logBattleEvent('sunder', {
                    champion: champion.name,
                    target: target.name,
                    item: item.name,
                    type: 'item',
                    source: 'Eternal Whisper',
                    message: `${target.name} is sundered by ${champion.name}`,
                }, battleTime);

                console.log(`[${formattedTime}] ${target.name} is sundered by ${champion.name}`);
            }
        }
    })
}

const royalCrownshieldStateMap = new Map();

export function royalCrownshieldEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);

    if(!royalCrownshieldStateMap.has(champion.id)){
        royalCrownshieldStateMap.set(champion.id, {
            effectUsed: false,
            effectExpired: false,
        });
    };

    const state = royalCrownshieldStateMap.get(champion.id);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Royal Crownshield' && 
            item.shield && 
            item.shieldAmount && 
            item.shieldDuration && 
            !state.effectUsed
        ){
            const shieldAmount = champion.statsByStarLevel[champion.starLevel].hp * item.shieldAmount;
            champion.shield += shieldAmount
            state.effectUsed = true;

            logBattleEvent('combatStart', {
                champion: champion.name,
                shieldAmount: shieldAmount,
                item: item.name,
                type: 'item',
                source: 'Royal Crownshield',
                message: `${champion.name} gained ${shieldAmount} shield from Royal Crownshield`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} gained ${shieldAmount} shield from Royal Crownshield`);
        } else if(item.name === 'Royal Crownshield' && battleTime >= 800 && !state.effectExpired){
            state.effectExpired = true;
            champion.shield = 0;
            champion.abilityPower += 50;

            logBattleEvent('shield', {
                champion: champion.name,
                shieldAmount: 0,
                item: item.name,
                type: 'item',
                source: 'Royal Crownshield',
                message: `${champion.name} lost all their shield from Royal Crownshield`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} lost their shield`);
        };
    });
};

const fistOfFairnessStateMap = new Map();

export function fistOfFairnessEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length) return;

    const formattedTime = getFormattedTime(champion);

    if(!fistOfFairnessStateMap.has(champion.id)){
        fistOfFairnessStateMap.set(champion.id, {
            effectUsed: false,
            aboveHalfHealth: champion.currentHp > champion.statsByStarLevel[champion.starLevel].hp * 0.5
        })
    }

    const state = fistOfFairnessStateMap.get(champion.id);

    champion.items.forEach((item: ItemProps) => {

        if(item.name === 'Fist Of Fairness' && !state.effectUsed){
            champion.abilityPower += 70; // 70 AP
            champion.statsByStarLevel[champion.starLevel].attackDamage *= 1.70; // 170% attack damage
            champion.omnivamp += 30;
            state.effectUsed = true;
            
            state.aboveHalfHealth = champion.currentHp > champion.statsByStarLevel[champion.starLevel].hp * 0.5;
            
            console.log(`[${formattedTime}] ${champion.name} gained 35 AP/AD and 30 omnivamp from Fist Of Fairness`);
        } else if(item.name === 'Fist Of Fairness' && state.effectUsed) {
            if(state.aboveHalfHealth && champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.5){
                champion.abilityPower -= 35; // 35 AP
                champion.statsByStarLevel[champion.starLevel].attackDamage /= 1.35; // 135% attack damage
                champion.omnivamp -= 30;
                state.effectUsed = false;
                state.aboveHalfHealth = false;

                logBattleEvent('attackDamage', {
                    champion: champion.name,
                    attackDamageLost: -35,
                    item: item.name,
                    type: 'item', 
                    source: 'Fist Of Fairness',
                    message: `${champion.name} lost 35 AP/AD and 30 omnivamp from Fist Of Fairness`,
                }, battleTime);

                console.log(`[${formattedTime}] ${champion.name} lost 35 AP/AD and 30 omnivamp from Fist Of Fairness`);
            }
        }
    });
};

const willbreakerStateMap = new Map();

export function willbreakerEffect(champion: Champion, target: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);

    if(!willbreakerStateMap.has(champion.id)){
        willbreakerStateMap.set(champion.id, {
            effectUsed: false,
            attackShield: false,
            attackShieldArray: [],
            timeSinceEffectUsed: 0
        })
    }

    const state = willbreakerStateMap.get(champion.id);
    
    if(target.shieldDamageTakenArray.length > state.attackShieldArray.length){
        state.attackShield = true;
        state.attackShieldArray.push(battleTime);
    };

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Willbreaker' && !state.effectUsed && state.attackShield){
            champion.damageAmp += 0.30;
            state.timeSinceEffectUsed = battleTime;
            state.effectUsed = true;

            logBattleEvent('damageAmp', {
                champion: champion.name,
                target: target.name,
                damageAmp: 0.30,
                item: item.name,
                type: 'item',
                source: 'Willbreaker',
                message: `${champion.name} gained 25% damage amp from Willbreaker`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} gained 30% damage amp.`);
        } else if(item.name === 'Willbreaker' && 
            state.attackShield && 
            state.effectUsed && 
            (battleTime - state.timeSinceEffectUsed) >= 300
        ){
            champion.damageAmp -= 0.25;
            state.effectUsed = false;
            state.attackShield = false;

            logBattleEvent('damageAmp', {
                champion: champion.name,
                target: target.name,
                damageAmp: -0.30,
                item: item.name,
                type: 'item',
                source: 'Willbreaker',
                message: `${champion.name} lost 30% damage amp from Willbreaker`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} lost 30% damage amp.`);
        };
    });
};

const theBaronsGiftStateMap = new Map();

export function theBaronsGiftEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);

    if(!theBaronsGiftStateMap.has(champion.id)){
        theBaronsGiftStateMap.set(champion.id, {
            effectUsed: false,
            abilityUsed: false,
            abilityUseCount: 0, // Number of times champion's ability has been used
            timeSinceEffectUsed: 0,
        });
    };
    
    const state = theBaronsGiftStateMap.get(champion.id);
    
    if(champion.abilityArray.length > state.abilityUseCount){
        state.effectUsed = true;
        state.abilityUsed = true;
        state.timeSinceEffectUsed = battleTime;
        state.abilityUseCount += 1;
    };

    // Gives 120% attack speed when champion ability is used
    champion.items.forEach((item: ItemProps) => {

        if(item.name === 'The Baron\'s Gift' && state.effectUsed && state.abilityUsed ){
            champion.attackSpeed *= 1.6; 
            state.abilityUsed = false;

            logBattleEvent('attackSpeed', {
                champion: champion.name,
                attackSpeedGained: 120,
                item: item.name,
                type: 'item',
                source: 'The Baron\'s Gift',
                message: `${champion.name} gained 120% attack speed from The Baron\'s Gift`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} gained 120% attack speed.`);
        }  else if(item.name === 'The Baron\'s Gift' && 
            state.effectUsed && 
            !state.abilityUsed && 
            (battleTime - state.timeSinceEffectUsed) >= 800 // 8 seconds after ability use then remove effect
        ){
            champion.attackSpeed /= 1.6 
            state.effectUsed = false;
            state.abilityUsed = false;

            logBattleEvent('attackSpeed', {
                champion: champion.name,
                attackSpeedLost: 120,
                item: item.name,
                type: 'item',
                source: 'The Baron\'s Gift',
                message: `${champion.name} lost 120% attack speed from The Baron\'s Gift`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} lost 120% attack speed.`);
        };
    });
};


const hextechLifebladeStateMap = new Map();

export function radiantHextechGunbladeEffect(champion: Champion, ally: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const damage = champion.statsByStarLevel[champion.starLevel].ability.damage;
    const magicDamage = champion.statsByStarLevel[champion.starLevel].ability.magicDamage;
    const formattedTime = getFormattedTime(champion);
    const healAmount = (champion.statsByStarLevel[champion.starLevel].attackDamage + magicDamage + damage) * 0.4;

    if(!hextechLifebladeStateMap.has(champion.id)){
        hextechLifebladeStateMap.set(champion.id, {
            effectUsed: false,
            abilityUsed: false,
            abilityUseCount: 0,
        });
    }

    const state = hextechLifebladeStateMap.get(champion.id);

    if(champion.abilityArray.length > state.abilityUseCount){
        state.effectUsed = true
        state.abilityUsed = true;  
        state.abilityUseCount += 1;
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Hextech Lifeblade' && item.heal && state.effectUsed){
            if(state.abilityUsed){               
                state.effectUsed = false;
                ally.currentHp += healAmount
                champion.healArray.push(healAmount);

                logBattleEvent('heal', {
                    champion: champion.name,
                    ally: ally.name,
                    healAmount: healAmount,
                    item: item.name,
                    type: 'item',
                    source: 'Hextech Lifeblade',
                    message: `${champion.name} healed ${ally.name} for ${healAmount} from Hextech Lifeblade`,
                }, battleTime);

                console.log(`[${formattedTime}] ${champion.name} healed ${ally.name} for ${healAmount} from Hextech Lifeblade`);
            };
        };
    });
};

const bulwarksOathStateMap = new Map();

export function bulwarksOathEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);
    
    if(!bulwarksOathStateMap.has(champion.id)){ // Use name instead of id
        bulwarksOathStateMap.set(champion.id, {
            effectUsed: false,
            effectExpired: false,
            shieldAmount: 0,
            timeSinceEffectUsed: 0
        });
    }

    const state = bulwarksOathStateMap.get(champion.id);
    
    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Bulwark\'s Oath' && 
            !state.effectUsed && 
            !state.effectExpired &&
            champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.4
        ){
            const shieldAmount = champion.statsByStarLevel[champion.starLevel].hp * 0.50;
            champion.shield += shieldAmount;
            state.shieldAmount = shieldAmount; 
            
            champion.statsByStarLevel[champion.starLevel].armor += 80;
            champion.statsByStarLevel[champion.starLevel].magicResist += 80;
            state.timeSinceEffectUsed = battleTime;
            state.effectUsed = true;

            logBattleEvent('combatStart', {
                champion: champion.name,
                shieldAmount: shieldAmount,
                armorGained: 80,
                magicResistGained: 80,
                item: item.name,
                type: 'item',
                source: 'Bulwark\'s Oath',
                message: `${champion.name} gained ${shieldAmount} shield, 80 armor and 80 magic resist from Bulwark\'s Oath`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} gained ${shieldAmount} shield, 80 armor and 80 magic resist`);
        } else if(item.name === 'Bulwark\'s Oath' && 
            state.effectUsed && 
            !state.effectExpired &&
            battleTime - state.timeSinceEffectUsed >= 500
        ){
            state.effectExpired = true;

            const shieldToRemove = Math.min(champion.shield, state.shieldAmount);
            
            if(champion.shield > 0){
                champion.shield -= shieldToRemove;

                logBattleEvent('shield', {
                    champion: champion.name,
                    shieldAmount: -shieldToRemove,
                    item: item.name,
                    type: 'item',
                    source: 'Bulwark\'s Oath',
                    message: `${champion.name} lost ${shieldToRemove} shield from Bulwark\'s Oath`,
                }, battleTime);

                console.log(`[${formattedTime}] ${champion.name} lost ${shieldToRemove} shield`);
            } 
        };
    });
};

const crestOfCindersStateMap = new Map();

export function crestOfCindersEffect(champion: Champion, target: Champion, battleTime: number){
    if(!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);
    const burnDamage = target.statsByStarLevel[target.starLevel].hp * 0.02;

    if(!crestOfCindersStateMap.has(champion.id)){
        crestOfCindersStateMap.set(champion.id, {
            effectUsed: false,
            timeSinceEffectUsed: 0,
            attackCount: 0,
            timeSinceLastEffect: 0,
            burnTicks: 0,
        });
    };

    const state = crestOfCindersStateMap.get(champion.id);

    if(champion.damageArray.length > state.attackCount){
        state.effectUsed = true;
        state.timeSinceEffectUsed = battleTime;
        state.attackCount += 1
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Crest Of Cinders' && item.burn && item.wound && state.effectUsed){
            if(!target.burn){
                target.burn = true;

                logBattleEvent('burn', {
                    champion: champion.name,
                    target: target.name,
                    burnDamage: burnDamage,
                    item: item.name,
                    type: 'item',
                    source: 'Crest of Cinders',
                    message: `${target.name} is being burnt by ${champion.name}'s Crest of Cinders`,
                }, battleTime);

                console.log(`[${formattedTime}] ${target.name} is being burnt by ${champion.name}'s Crest of Cinders`);
            };

            if(!target.wound){
                target.wound = true;

                logBattleEvent('wound', {
                    champion: champion.name,
                    target: target.name,
                    item: item.name,
                    type: 'item',
                    source: 'Crest of Cinders',
                    message: `${target.name} is being wounded by ${champion.name}'s Crest of Cinders`,
                }, battleTime);

                console.log(`[${formattedTime}] ${target.name} is being wounded by ${champion.name}'s Crest of Cinders`);
            };
            
            if(target.burn && battleTime - state.timeSinceLastEffect >= 100){
                state.timeSinceLastEffect = battleTime;
                target.currentHp -= burnDamage;
                state.burnTicks += 1;
                target.trueDamageTakenArray.push(burnDamage);
                champion.trueDamageArray.push(burnDamage);

                logBattleEvent('burn', {
                    champion: champion.name,
                    target: target.name,
                    burnDamage: burnDamage,
                    item: item.name,
                    type: 'item',
                    source: 'Crest of Cinders',
                    message: `${target.name} burned for ${burnDamage} damage`,
                }, battleTime);

                console.log(`[${formattedTime}] ${target.name} burned for ${burnDamage} damage`);
            };
        };
    });
};

const moreMorellonomiconStateMap = new Map();

export function moreMorellonomiconEffect(champion: Champion, target: Champion, battleTime: number) {
    if(!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);
    const burnDamage = target.statsByStarLevel[target.starLevel].hp * 0.02;

    if(!moreMorellonomiconStateMap.has(champion.id)){
        moreMorellonomiconStateMap.set(champion.id, {
            effectUsed: false,
            timeSinceEffectUsed: 0,
            attackCount: 0,
            timeSinceLastEffect: 0,
            burnTicks: 0,
        });
    }

    const state = moreMorellonomiconStateMap.get(champion.id);

    if(champion.damageArray.length > state.attackCount){
        state.effectUsed = true;
        state.timeSinceEffectUsed = battleTime;
        state.attackCount += 1
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'More Morellonomicon' && item.burn && item.wound && state.effectUsed){

            if(!target.burn){
                target.burn = true;

                logBattleEvent('burn', {
                    champion: champion.name,
                    target: target.name,
                    burnDamage: burnDamage,
                    item: item.name,
                    type: 'item',
                    source: 'More Morellonomicon',
                    message: `${target.name} is being burnt by ${champion.name}'s More Morellonomicon`,
                }, battleTime);

                console.log(`[${formattedTime}] ${target.name} is being burnt by ${champion.name}'s More Morellonomicon`);
            };

            if(!target.wound){
                target.wound = true;

                logBattleEvent('wound', {
                    champion: champion.name,
                    target: target.name,
                    item: item.name,
                    type: 'item',
                    source: 'More Morellonomicon',
                    message: `${target.name} is being wounded by ${champion.name}'s More Morellonomicon`,
                }, battleTime);


                console.log(`[${formattedTime}] ${target.name} is being wounded by ${champion.name}'s More Morellonomicon`);
            };
            
            if(target.burn && battleTime - state.timeSinceLastEffect >= 100){
                state.timeSinceLastEffect = battleTime;                
                state.burnTicks += 1;
                target.currentHp -= burnDamage;
                target.trueDamageTakenArray.push(burnDamage);
                champion.trueDamageArray.push(burnDamage);

                logBattleEvent('burn', {
                    champion: champion.name,
                    target: target.name,
                    burnDamage: burnDamage,
                    item: item.name,
                    type: 'item',
                    source: 'More Morellonomicon',
                    message: `${target.name} burned for ${burnDamage} damage`,
                }, battleTime);

                console.log(`[${formattedTime}] ${target.name} burned for ${burnDamage} damage`);
            };
        };
    });
};


const dvarapalaStoneplateStateMap = new Map();

export function dvarapalaStoneplateEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);
    
    if(!dvarapalaStoneplateStateMap.has(champion.id)){
        dvarapalaStoneplateStateMap.set(champion.id, {
            effectUsed: false,
            amountOfChampionsAttacking: 0,
            timeSinceLastHeal: 0,
        });
    };

    const state = dvarapalaStoneplateStateMap.get(champion.id);

     if(champion.currentChampionsAttacking.length > state.amountOfChampionsAttacking){
        state.amountOfChampionsAttacking += 1;
        state.effectUsed = true;
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Dvarapala Stoneplate' && 
            state.amountOfChampionsAttacking > 0 && 
            state.effectUsed
        ){            
            state.effectUsed = false
            const armorBonus = 15 * state.amountOfChampionsAttacking;
            const magicResistBonus = 15 * state.amountOfChampionsAttacking;
            champion.statsByStarLevel[champion.starLevel].armor += armorBonus;
            champion.statsByStarLevel[champion.starLevel].magicResist += magicResistBonus;

            logBattleEvent('armorMagicResist', {
                champion: champion.name,
                armorBonus: armorBonus,
                magicResistBonus: magicResistBonus,
                item: item.name,
                type: 'item',
                source: 'Gargoyle Stoneplate',
                message: `${champion.name} gained ${armorBonus} armor and ${magicResistBonus} magic resist from Gargoyle Stoneplate`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} gained ${armorBonus} armor and ${magicResistBonus} magic resist from ${state.amountOfChampionsAttacking} attackers`);
        };
        if(item.name === 'Dvarapala Stoneplate' && battleTime - state.timeSinceLastHeal >= 1000 ){
            const healAmount = champion.statsByStarLevel[champion.starLevel].hp * 0.4;

            champion.currentHp += healAmount;
            state.timeSinceLastHeal = battleTime;
            champion.healArray.push(healAmount);

            logBattleEvent('heal', {
                champion: champion.name,
                healAmount: healAmount,
                item: item.name,
                type: 'item',
                source: 'Gargoyle Stoneplate',
                message: `${champion.name} healed for ${healAmount} from Gargoyle Stoneplate`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} healed for ${healAmount} from Gargoyle Stoneplate`);
        }   
    });
};

const sunlightCapeStateMap = new Map();

export function sunlightCapeEffect(champion: Champion, target: Champion, surroundingOpponents: Champion[], battleTime: number){
    if(!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);
    const burnDamage = target.statsByStarLevel[target.starLevel].hp * 0.01;

    if(!sunlightCapeStateMap.has(champion.id)){
        sunlightCapeStateMap.set(champion.id, {
            effectUsed: true, 
            timeSinceEffectUsed: 0,
        });
    };

    const state = sunlightCapeStateMap.get(champion.id);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Sunlight Cape' &&
            item.burn &&
            item.wound &&
            state.effectUsed
        ){
            surroundingOpponents.forEach((targets: Champion) => {
                if(!targets.burn){
                    targets.burn = true;

                    logBattleEvent('burn', {
                        champion: champion.name,
                        target: targets.name,
                        burnDamage: burnDamage,
                        item: item.name,
                        type: 'item',
                        source: 'Sunlight Cape',
                        message: `${targets.name} is being burnt by ${champion.name}'s Sunlight Cape`,
                    }, battleTime);

                    console.log(`[${formattedTime}] ${targets.name} is being burnt by ${champion.name}'s Sunlight Cape`);
                }

                if(!targets.wound){
                    targets.wound = true;

                    logBattleEvent('wound', {
                        champion: champion.name,
                        target: targets.name,
                        item: item.name,
                        type: 'item',
                        source: 'Sunlight Cape',
                        message: `${targets.name} is being wounded by ${champion.name}'s Sunlight Cape`,
                    }, battleTime);

                    console.log(`[${formattedTime}] ${targets.name} is being wounded by ${champion.name}'s Sunlight Cape`);
                }
                if(battleTime - state.timeSinceEffectUsed >= 100){
                    targets.currentHp -= burnDamage;
                    state.burnTicks += 1;                    
                    state.timeSinceEffectUsed = battleTime;
                    target.trueDamageTakenArray.push(burnDamage);
                    champion.trueDamageArray.push(burnDamage);

                    logBattleEvent('burn', {
                        champion: champion.name,
                        target: targets.name,
                        burnDamage: burnDamage,
                        item: item.name,
                        type: 'item',
                        source: 'Sunlight Cape',
                        message: `${targets.name} burned for ${burnDamage} damage from Sunlight Cape`,
                    }, battleTime);

                    console.log(`[${formattedTime}] ${targets.name} burned for ${burnDamage} damage from Sunlight Cape`);
                }
            });
        }
    });
};

const adaptiveHelmStateMap = new Map();

export function radiantAdaptiveHelmEffect(champion: Champion, isChampionFrontOrBack: boolean, battleTime: number){
    if(!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);

    if(!adaptiveHelmStateMap.has(champion.id)){
        adaptiveHelmStateMap.set(champion.id, {
            effectUsed: false
        });
    };

    const state = adaptiveHelmStateMap.get(champion.id);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Adaptive Helm' && !state.effectUsed){
            if(isChampionFrontOrBack){  
                champion.statsByStarLevel[champion.starLevel].armor += 40;
                champion.statsByStarLevel[champion.starLevel].magicResist += 40;

                logBattleEvent('armorMagicResist', {
                    champion: champion.name,
                    armorGained: 40,
                    magicResistGained: 40,
                    item: item.name,
                    type: 'item',
                    source: 'Adaptive Helm',
                    message: `${champion.name} gained 40 armor and magic resist`,
                }, battleTime);

                console.log(`[${formattedTime}] ${champion.name} gained 40 armor and magic resist`);
            } else if(!isChampionFrontOrBack){
                champion.abilityPower += 20;

                logBattleEvent('abilityPower', {
                    champion: champion.name,
                    abilityPowerGained: 20,
                    item: item.name,
                    type: 'item',
                    source: 'Adaptive Helm',
                    message: `${champion.name} gained 20 ability power`,
                }, battleTime);

                console.log(`[${formattedTime}] ${champion.name} gained 20 ability power`);
            }
            state.effectUsed = true;
        }
    })
}

const ionicSparkStateMap = new Map();

export function radiantIonicSparkEffect(champion: Champion, target: Champion,surroundingOpponents: Champion[], battleTime: number){
    if(!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);

    if(!ionicSparkStateMap.has(champion.id)){
        ionicSparkStateMap.set(champion.id, {
            effectUsed: true,
            targetAbilityCount: [...target.abilityArray].length
        });
    };

    const state = ionicSparkStateMap.get(champion.id);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Ionic Spark' && 
            item.shred && 
            state.effectUsed
        ){
            surroundingOpponents.forEach((targets: Champion) => {
                if(!targets.shred){
                    targets.shred = true;    

                    logBattleEvent('shred', {
                        champion: champion.name,
                        target: targets.name,
                        item: item.name,
                        type: 'item',
                        source: 'Ionic Spark',
                        message: `${targets.name} is being shredded by ${champion.name}'s Ionic Spark`,
                    }, battleTime);

                    console.log(`[${formattedTime}] ${targets.name} shreded`)
                };

                if(targets.abilityArray.length > state.targetAbilityCount){
                    state.targetAbilityCount += 1;
                    const magicDamage = target.abilityManaCost * 1.6;
                    targets.currentHp -= magicDamage
                    champion.magicDamageArray.push(magicDamage);
                    target.magicDamageTakenArray.push(magicDamage);

                    logBattleEvent('magicDamage', {
                        champion: champion.name,
                        target: targets.name,
                        magicDamage: magicDamage,
                        item: item.name,
                        type: 'item',
                        source: 'Ionic Spark',
                        message: `${targets.name} took ${magicDamage} magic damage from Ionic Spark`,
                    }, battleTime);

                    console.log(`[${formattedTime}] ${targets.name} took ${magicDamage} magic damage from Ionic Spark`);
                };
            });
        };
    });
};

const evenshroudStateMap = new Map();

export function radiantEvenshroudEffect(champion: Champion, surroundingOpponents: Champion[], battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    if(!evenshroudStateMap.has(champion.id)){
        evenshroudStateMap.set(champion.id, {
            effectUsed: true,
            combastStartEffectUsed: false,
            timeSinceEffectUsed: 0 // combat start
        });
    };

    const state = evenshroudStateMap.get(champion.id);

    if(state.timeSinceEffectUsed >= 1000 && state.combastStartEffectUsed){
        champion.statsByStarLevel[champion.starLevel].armor -= 25;
        champion.statsByStarLevel[champion.starLevel].magicResist -= 25;
        console.log(`[${formattedTime}] ${champion.name} lost 25 armor and magic resist from Evenshroud combat start effect`);
    };

    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Evenshroud' && state.effectUsed){
            surroundingOpponents.forEach((targets: Champion) =>{
                if(!targets.sunder){
                    targets.sunder = true;

                    logBattleEvent('sunder', {
                        champion: champion.name,
                        target: targets.name,
                        item: item.name,
                        type: 'item',
                        source: 'Evenshroud',
                        message: `${targets.name} is sundered from Evenshroud`,
                    }, battleTime);

                    console.log(`[${formattedTime}] ${targets.name} sundered from Evenshroud`);   
                };
            });
            
        if(!state.combastStartEffectUsed){      
                state.combastStartEffectUsed = true;                               
                state.timeSinceEffectUsed = battleTime;
                champion.statsByStarLevel[champion.starLevel].armor += 25;
                champion.statsByStarLevel[champion.starLevel].magicResist += 25;

                logBattleEvent('combatStart', {
                    champion: champion.name,
                    armorGained: 25,
                    magicResistGained: 25,
                    item: item.name,
                    type: 'item',
                    source: 'Evenshroud',
                    message: `${champion.name} gained 25 armor and magic resist from Evenshroud`,
                }, battleTime);

                console.log(`Combat start: [${formattedTime}] ${champion.name} gained 25 armor and magic resist from Evenshroud`);
            };
        };
    });
};


const redemptionStateMap = new Map();

export function radiantRedemptionEffect(champion: Champion, surroundingAllies: Champion[], battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion); 

    if(!redemptionStateMap.has(champion.id)){
        redemptionStateMap.set(champion.id, {
            effectUsed: false,
            timeSinceEffectUsed: 0
        });
    };

    const state = redemptionStateMap.get(champion.id);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Redemption' && !state.effectUsed && battleTime - state.timeSinceEffectUsed >= 500){
            surroundingAllies.forEach((ally: Champion) => {
                const healingAmount = Math.round(ally.statsByStarLevel[ally.starLevel].hp * 0.15);
                const reductionAmount = 10; // 10% percent

                ally.statsByStarLevel[ally.starLevel].reduction += reductionAmount;
                ally.currentHp += healingAmount;
                ally.healArray.push(healingAmount);
                
                logBattleEvent('heal', {
                    champion: champion.name,
                    ally: ally.name,
                    healAmount: healingAmount,
                    reductionAmount: reductionAmount,
                    item: item.name,
                    type: 'item',
                    source: 'Redemption',
                    message: `${ally.name} healed for ${healingAmount} and gained ${reductionAmount}% reduction from Redemption`,
                }, battleTime);

                console.log(`[${formattedTime}] ${ally.name} healed for ${healingAmount} by redemption and gained 10 reduction`);
            });

            const healingAmount = Math.round(champion.statsByStarLevel[champion.starLevel].hp * 0.15);

            champion.currentHp += healingAmount;

            logBattleEvent('heal', {
                champion: champion.name,
                healAmount: healingAmount,
                item: item.name,
                type: 'item',
                source: 'Redemption',
                message: `${champion.name} healed for ${healingAmount} from Redemption`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} healed for ${healingAmount} by redemption and gained 10% reduction`);

            state.timeSinceEffectUsed = battleTime;
        };
    });
};

const edgeOfNightStateMap = new Map();

export function EdgeOfNightEffect(champion: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    if(!edgeOfNightStateMap.has(champion.id)){
        edgeOfNightStateMap.set(champion.id, {
            effectUsed: false,
            effectExpired: false,
            timeSinceEffectUsed: 0
        });
    }

    const state = edgeOfNightStateMap.get(champion.id);
    
    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Edge of Night'){
            if(!state.effectUsed && champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.6){
                champion.attackSpeed *= 1.15;
                state.effectUsed = true
                champion.immunity = true;  
                state.timeSinceEffectUsed = battleTime;

                logBattleEvent('combatStart', {
                    champion: champion.name,
                    attackSpeedGained: 15,
                    immunityGained: 5,
                    item: item.name,
                    type: 'item',
                    source: 'Edge of Night',
                    message: `${champion.name} gained 15% attack speed and 5 second immunity from Edge of Night`,
                }, battleTime);

                console.log(`[${formattedTime}] ${champion.name} gained 15% attack speed and 5 second immunity from Edge of Night`);
            };
            
            if(state.effectUsed && !state.effectExpired && 
               battleTime - state.timeSinceEffectUsed >= 500){
                champion.immunity = false;
                state.effectExpired = true;

                logBattleEvent('immunity', {
                    champion: champion.name,
                    immunityLost: 5,
                    item: item.name,
                    type: 'item',
                    source: 'Edge of Night',
                    message: `${champion.name} lost their immunity from Edge of Night`,
                }, battleTime);

                console.log(`[${formattedTime}] ${champion.name} lost their immunity`);
            };
        };
    });
};

const statikkShivStateMap = new Map();

export function radiantStatikkShivEffect(champion: Champion, target: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length || !target) return;

    const formattedTime = getFormattedTime(champion);

    if(!statikkShivStateMap.has(champion.id)){
        statikkShivStateMap.set(champion.id, {
            effectUsed: false,
            lastProcessedAttackCount: 0  
        });
    }

    const state = statikkShivStateMap.get(champion.id);

    if(champion.attacks && 
       champion.attacks.length > 0 && 
       champion.attacks.length % 3 === 0 &&
       champion.attacks.length > state.lastProcessedAttackCount) {
        
        state.effectUsed = true;
        state.lastProcessedAttackCount = champion.attacks.length;
    }

    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Statikk Shiv' && state.effectUsed){
            const magicDamage = 35;

            if(!target.shred){
                target.shred = true;  

                logBattleEvent('shred', {
                    champion: champion.name,
                    target: target.name,
                    item: item.name,
                    type: 'item',
                    source: 'Statikk Shiv',
                    message: `${target.name} shreded from Statikk Shiv`,
                }, battleTime);

                console.log(`[${formattedTime}] ${target.name} shreded from Statikk Shiv`);
            }

            target.currentHp -= magicDamage;            
            target.magicDamageTakenArray.push(magicDamage);
            champion.magicDamageArray.push(magicDamage);
            state.effectUsed = false;

            logBattleEvent('magicDamage', {
                champion: champion.name,
                target: target.name,
                magicDamage: magicDamage,
                item: item.name,
                type: 'item',
                source: 'Statikk Shiv',
                message: `${champion.name} dealt ${magicDamage} magic damage to ${target.name}`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} dealt ${magicDamage} magic damage to ${target.name}`);
        };
    });
};

const quickSilverStateMap = new Map();

export function radiantQuickSilverEffect(champion: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    if(!quickSilverStateMap.has(champion.id)){
        quickSilverStateMap.set(champion.id, {
            effectUsed: false,
            combatStarEffectUsed: false
        });
    }

    const state = quickSilverStateMap.get(champion.id);

    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Quick Silver' && !state.effectUsed){
            // combat start
            if(!state.combatStarEffectUsed){
                champion.attackSpeed *= 1.03;
                state.combatStarEffectUsed = true;

                logBattleEvent('combatStart', {
                    champion: champion.name,
                    attackSpeedGained: 3,
                    item: item.name,
                    type: 'item',
                    source: 'Quick Silver',
                    message: `${champion.name} gained 3% attack speed from Quick Silver`,
                }, battleTime);

                console.log(`[${formattedTime}] ${champion.name} gained 3% attack speed from Quick Silver`);
            }
            // after combat start effect still active for 18 seconds
            if (battleTime % 200 === 0 && battleTime <= 1800) { 
                champion.attackSpeed *= 1.03;

                logBattleEvent('attackSpeed', {
                    champion: champion.name,
                    attackSpeedGained: 3,
                    item: item.name,
                    type: 'item',
                    source: 'Quick Silver',
                    message: `${champion.name} gained 3% attack speed from Quick Silver`,
                }, battleTime);

                console.log(`[${formattedTime}] ${champion.name} gained 3% attack speed from Quick Silver`);
            };
        };
    });
};

const blueBuffStateMap = new Map();

export function radiantBlueBuffEffect(champion: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    if(!blueBuffStateMap.has(champion.id)){
        blueBuffStateMap.set(champion.id, {
            combatStartEffectUsed: false,
            effectUsed: false,
            effectExpired: false,
            timeSinceCombatStartEffectUsed: 0,
            timeSinceEffectUsed: 0,
            abilityCount: 0,
        });
    }

    const state = blueBuffStateMap.get(champion.id);

    if(champion.abilityArray.length > state.abilityCount){
        state.abilityCount += 1;
        state.effectUsed = true;
    }

    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Blue Buff' && !state.combatStartEffectUsed){
            champion.abilityManaCost -= 10; // Max mana reduced
            state.combatStartEffectUsed = true;
            console.log(`[${formattedTime}] ${champion.name} lost 10 mana cost from Blue Buff`);
        };
        if(item.name ==='Blue Buff' && state.effectUsed){
            champion.mana += 10;
            champion.damageAmp += 0.15;
            state.timeSinceEffectUsed = battleTime;
            state.effectUsed = false;
            state.effectExpired = false;

            logBattleEvent('damageAmp', {
                champion: champion.name,
                damageAmpGained: 15,
                item: item.name,
                type: 'item',
                source: 'Blue Buff',
                message: `${champion.name} gained 15% damage amp from Blue Buff`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} gained 15% damage amp from Blue Buff`);
        };
        if(item.name === 'Blue Buff' && battleTime - state.timeSinceEffectUsed >= 800 && !state.effectExpired){
            champion.damageAmp -= 0.15;
            state.effectExpired = true;

            logBattleEvent('damageAmp', {
                champion: champion.name,
                damageAmpLost: 15,
                item: item.name,
                type: 'item',
                source: 'Blue Buff',
                message: `${champion.name} lost 15% damage amp from Blue Buff`,
            }, battleTime);

            console.log(`[${formattedTime}] ${champion.name} lost 15% damage amp from Blue Buff`);
        }
    })
}
