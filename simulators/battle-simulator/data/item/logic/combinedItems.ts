import { Item, ItemProps } from '../item'; 
import { Champion } from '../../champion/champion';
import { getFormattedTime } from '../../../utils/formattedTime';

export function dragonsClawEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    let formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Dragon\'s Claw' && 
            item.heal && 
            item.healAmount && 
            battleTime % 200 === 0 && 
            battleTime > 0 &&
            champion.currentHp !== champion.statsByStarLevel[champion.starLevel].hp
        ){
            const healAmount = Math.round(champion.statsByStarLevel[champion.starLevel].hp * item.healAmount);
            champion.currentHp += healAmount;
            champion.healArray.push(healAmount);
            console.log(`[${formattedTime}] ${champion.name} healed for ${healAmount} hp from Dragon's Claw`);
        };
    });
};

const bloodthristerStateMap = new Map();

export function bloodthristerEffect(champion: Champion, battleTime: number ){   
    if (!champion?.items?.length || !battleTime) return;

    let formattedTime = getFormattedTime(champion);
    
    if(!bloodthristerStateMap.has(champion.id)){
        bloodthristerStateMap.set(champion.id, {
            effectUsed: false
        })
    }

    const state = bloodthristerStateMap.get(champion.id);
    
    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Bloodthirster' && 
            item.shield && 
            item.shieldAmount && 
            item.shieldDuration && 
            !state.effectUsed
        ){
            if(champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.4){                
                state.effectUsed = true;
                const shieldAmount = champion.statsByStarLevel[champion.starLevel].hp * item.shieldAmount;
                champion.shield += shieldAmount
                console.log(`[${formattedTime}] ${champion.name} gained a shield for ${shieldAmount} hp`);
            }
        }
    })
}

// brambleVestStateMap = new Map();

let timeSinceLastExternalMagicDamage = 0;
let attackedArray = [];
let cooldown = 0; // 200 centiseconds, 2 seconds

export function brambleVestEffect(champion: Champion, target: Champion, battleTime: number){ // unfinished
    if (!champion?.items?.length || !battleTime) return;

    let formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Bramble Vest' && 
            item.externalMagicDamage && 
            champion.damageTakenArray.length > attackedArray.length
        ){
            if(battleTime - target.attackSpeed >= timeSinceLastExternalMagicDamage){
                if(battleTime >= cooldown){
                    target.currentHp -= item.externalMagicDamage;
                    attackedArray.push(battleTime)
                    cooldown = timeSinceLastExternalMagicDamage + battleTime + 200;
                    console.log(`[${formattedTime}] ${champion.name} dealt ${item.externalMagicDamage} magic damage to ${target.name}`);
                }
            }
        }
    })
}

export function giantSlayerEffect(champion: Champion, target: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;
    
    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Giant Slayer' && 
            target.statsByStarLevel[target.starLevel].hp > 1750
        ){
            champion.damageAmp += item.additionalDamageAmp || 0;
            console.log(`[${formattedTime}] ${champion.name} gained 20% damage amp against ${target.name} from Giant Slayer`);
        }
    })
}

export function archangelsStaffEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Archangel\'s Staff' && item.abilityPowerStacking){
            if(battleTime % 500 === 0){
                champion.abilityPower += item.additionalAbilityPowerPerStack || 0; 
                console.log(`[${formattedTime}] ${champion.name} gained ${item.additionalAbilityPowerPerStack} ability power from Archangel's Staff`);
            }
        }
    })
}

let runnansHurricaneEffectUsed = false;

export function runnansHurricaneEffect(champion: Champion){
    if (!champion?.items?.length) return;

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Runaan\s Hurricane' && !runnansHurricaneEffectUsed){
            champion.statsByStarLevel[champion.starLevel].attackDamage += champion.statsByStarLevel[champion.starLevel].attackDamage * 0.55;
            runnansHurricaneEffectUsed = true;
        }
    })
}

const steraksGageStateMap = new Map();

export function steraksGageEffect(champion: Champion){
    if (!champion?.items?.length) return;
    
    const formattedTime = getFormattedTime(champion);

    if(!steraksGageStateMap.has(champion.id)){
        steraksGageStateMap.set(champion.id, {
            effectUsed: false
        })
    }

    const state = steraksGageStateMap.get(champion.id)

    champion.items.forEach((item: ItemProps) =>{
        if(item.name ==='Sterak\'s Gage' &&
            !state.effectUsed &&
            champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.6
        ){
            const healAmount = champion.statsByStarLevel[champion.starLevel].hp *  0.25;
            champion.currentHp += healAmount
            champion.statsByStarLevel[champion.starLevel].attackDamage *= 1.35;
            champion.healArray.push(healAmount)
            console.log(`[${formattedTime}] ${champion.name} gained ${healAmount} health from Sterak's Gage`);
            state.effectUsed = true;
        }
    })
}

const titansResolveStateMap = new Map();

export function titansResolveEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);

    if(!titansResolveStateMap.has(champion.id)){
        titansResolveStateMap.set(champion.id, {
            effectUsed: false,            
            fullStackEffectUsed: false,   
            titansResolveStacks: 0,       
            damageTakenArray: [],         
            damageTaken: false,           
        })
    }

    const state = titansResolveStateMap.get(champion.id)

    // Check if champion has taken new damage since last check
    if(champion.damageTakenArray && champion.damageTakenArray.length > state.damageTakenArray.length){
        state.damageTaken = true;
        state.damageTakenArray.push(battleTime);
    };

    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Titan\'s Resolve' &&             
            !state.effectUsed &&
            item.abilityPowerStacking && 
            state.titansResolveStacks < 25 && 
            state.damageTaken                  
        ){            
            // Apply stacking bonuses
            champion.abilityPower += 1;
            champion.statsByStarLevel[champion.starLevel].attackDamage *= 1.02;
            state.titansResolveStacks += 1;
            console.log(`[${formattedTime}] ${champion.name} gained 2% attack damage and 1 ability power (Stack ${state.titansResolveStacks}/25) from Titan's Resolve`);
            state.damageTaken = false;  // Reset damage taken flag
        } else if(state.titansResolveStacks === 25 && !state.fullStackEffectUsed){
            // Apply bonus stats when max stacks are reached
            state.effectUsed = true;      
            state.fullStackEffectUsed = true;
            champion.statsByStarLevel[champion.starLevel].armor += 20;
            champion.statsByStarLevel[champion.starLevel].magicResist += 20;
            console.log(`[${formattedTime}] ${champion.name} gained 20 armor and 20 magic resist from Titan's Resolve`);
        };
    });
};

const steadFastHeartStateMap = new Map();

export function steadfastHeartEffect(champion: Champion){
    if (!champion?.items?.length) return;

    const formattedTime = getFormattedTime(champion);

    if(!steadFastHeartStateMap.has(champion.id)){
        steadFastHeartStateMap.set(champion.id, {
            effectUsed: false,
            effectExpired: false,
        });
    }

    const state = steadFastHeartStateMap.get(champion.id);

    champion.items.forEach((item: ItemProps) =>{
        // When champion's health is ABOVE 50%, give 15 durability
        if(item.name === 'Steadfast Heart' && 
           !state.effectUsed && 
           champion.currentHp > champion.statsByStarLevel[champion.starLevel].hp * 0.5
        ){
            champion.durability += 15;
            console.log(`[${formattedTime}] ${champion.name} gained 15 durability`);
            state.effectUsed = true;
            state.effectExpired = false; // Reset expired flag
        } 
        // When champion's health drops BELOW 50%, reduce to 8 durability
        else if(item.name === 'Steadfast Heart' && 
                state.effectUsed && 
                champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.5 && 
                !state.effectExpired
        ){
            champion.durability -= 7; // Reduce from 15 to 8
            state.effectExpired = true;
            state.effectUsed = false; // Allow effect to be used again if health goes back up
            console.log(`[${formattedTime}] ${champion.name} lost 7 durability`);
        }
    });
}

export function lastWhisperEffect(champion: Champion, target: Champion, battleTime: number){
    if (!champion?.items?.length) return;

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Last Whisper'){
            if(!target.sunder){
                target.sunder = true;
                console.log(`[${formattedTime}] ${target.name} is sundered by ${champion.name}`);
            }
        }
    })
}

const crownGuardStateMap = new Map();

export function crownguardEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);

    if(!crownGuardStateMap.has(champion.id)){
        crownGuardStateMap.set(champion.id, {
            effectUsed: false,
            effectExpired: false,
        });
    }

    const state = crownGuardStateMap.get(champion.id);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Crownguard' && 
            item.shield && 
            item.shieldAmount && 
            item.shieldDuration && 
            !state.effectUsed
        ){
            const shieldAmount = champion.statsByStarLevel[champion.starLevel].hp * item.shieldAmount;
            champion.shield += shieldAmount
            state.effectUsed = true;
            console.log(`[${formattedTime}] ${champion.name} gained ${shieldAmount} shield from Crownguard`);
        } else if(item.name === 'Crownguard' && battleTime >= 800 && !state.effectExpired){
            state.effectExpired = true;
            champion.shield = 0;
            console.log(`[${formattedTime}] ${champion.name} lost their shield`);
        };
    });
};

const handOfJusticeStateMap = new Map();

export function handOfJusticeEffect(champion: Champion){
    if (!champion?.items?.length) return;

    const formattedTime = getFormattedTime(champion);

    if(!handOfJusticeStateMap.has(champion.id)){
        handOfJusticeStateMap.set(champion.id, {
            effectUsed: false
        })
    }

    const state = handOfJusticeStateMap.get(champion.id);

    champion.items.forEach((item: ItemProps) => {

        // Base effect gives 15 AP and 15 omnivamp
        if(item.name === 'Hand of Justice' && !state.effectUsed ){
            champion.statsByStarLevel[champion.starLevel].attackDamage += 15;
            champion.abilityPower += 15;
            champion.omnivamp += 15;
            state.effectUsed = true;
            console.log(`[${formattedTime}] ${champion.name} used HOJ effect`);
            
            // Randomly choose between 30 AD/AP or 30 omnivamp total. This is including in the base effect
            if(Math.random() * 100 < 50){
                champion.statsByStarLevel[champion.starLevel].attackDamage += 15;
                champion.abilityPower += 15;
                console.log(`[${formattedTime}] ${champion.name} gained 30 attack damage and ability power from HOJ.`);
            } else{
                champion.omnivamp += 15;
                console.log(`[${formattedTime}] ${champion.name} gained 30 omnivamp from HOJ.`);
            };
        };
    });
};


const guardBreakerStateMap = new Map();

export function guardBreakerEffect(champion: Champion, target: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);

    if(!guardBreakerStateMap.has(champion.id)){
        guardBreakerStateMap.set(champion.id, {
            effectUsed: false,
            attackShield: false,
            attackShieldArray: [],
            timeSinceEffectUsed: 0
        })
    }

    const state = guardBreakerStateMap.get(champion.id);
    
    if(target.shieldDamageTakenArray.length > state.attackShieldArray.length){
        state.attackShield = true;
        state.attackShieldArray.push(battleTime);
    };

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Guardbreaker' && !state.effectUsed && state.attackShield){
            champion.damageAmp += 0.25;
            state.timeSinceEffectUsed = battleTime;
            state.effectUsed = true;
            console.log(`[${formattedTime}] ${champion.name} gained 25% damage amp.`);
        } else if(item.name === 'Guardbreaker' && 
            state.attackShield && 
            state.effectUsed && 
            (battleTime - state.timeSinceEffectUsed) >= 300
        ){
            champion.damageAmp -= 0.25;
            state.effectUsed = false;
            state.attackShield = false;
            console.log(`[${formattedTime}] ${champion.name} lost 25% damage amp.`);
        };
    });
};


const nashorsToothStateMap = new Map();

export function nashorsToothEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);

    if(!nashorsToothStateMap.has(champion.id)){
        nashorsToothStateMap.set(champion.id, {
            effectUsed: false,
            abilityUsed: false,
            abilityUseCount: 0, // Number of times champion's ability has been used
            timeSinceEffectUsed: 0,
        });
    };
    
    const state = nashorsToothStateMap.get(champion.id);
    
    if(champion.abilityArray.length > state.abilityUseCount){
        state.effectUsed = true;
        state.abilityUsed = true;
        state.timeSinceEffectUsed = battleTime;
        state.abilityUseCount += 1;
    };

    // Gives 60% attack speed when champion ability is used
    champion.items.forEach((item: ItemProps) => {

        if(item.name === 'Nashor\'s Tooth' && state.effectUsed && state.abilityUsed ){
            champion.attackSpeed *= 1.6; 
            state.abilityUsed = false;
            console.log(`[${formattedTime}] ${champion.name} gained 60% attack speed.`);
        }  else if(item.name === 'Nashor\'s Tooth' && 
            state.effectUsed && 
            !state.abilityUsed && 
            (battleTime - state.timeSinceEffectUsed) >= 500 // 5 seconds after ability use then remove effect
        ){
            champion.attackSpeed /= 1.6 
            state.effectUsed = false;
            state.abilityUsed = false;
            console.log(`[${formattedTime}] ${champion.name} lost 60% attack speed.`);
        };
    });
};


const hextechGunBladeStateMap = new Map();

export function hextechGunbladeEffect(champion: Champion, ally: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const damage = champion.statsByStarLevel[champion.starLevel].ability.damage;
    const magicDamage = champion.statsByStarLevel[champion.starLevel].ability.magicDamage;
    const formattedTime = getFormattedTime(champion);
    const healAmount = (champion.statsByStarLevel[champion.starLevel].attackDamage + magicDamage + damage) * 0.25;

    if(!hextechGunBladeStateMap.has(champion.id)){
        hextechGunBladeStateMap.set(champion.id, {
            effectUsed: false,
            abilityUsed: false,
            abilityUseCount: 0,
        });
    }

    const state = hextechGunBladeStateMap.get(champion.id);

    if(champion.abilityArray.length > state.abilityUseCount){
        state.effectUsed = true
        state.abilityUsed = true;  
        state.abilityUseCount += 1;
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Hextech Gunblade' && item.heal && state.effectUsed){
            if(state.abilityUsed){               
                state.effectUsed = false;
                ally.currentHp += healAmount
                champion.healArray.push(healAmount);
                console.log(`[${formattedTime}] ${champion.name} healed ${ally.name} for ${healAmount}`);
            };
        };
    });
};

const protectorsVowStateMap = new Map();

export function protectorsVowEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);
    
    if(!protectorsVowStateMap.has(champion.id)){ // Use name instead of id
        protectorsVowStateMap.set(champion.id, {
            effectUsed: false,
            effectExpired: false,
            shieldAmount: 0,
            timeSinceEffectUsed: 0
        });
    }

    const state = protectorsVowStateMap.get(champion.id);
    
    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Protector\'s Vow' && 
            !state.effectUsed && 
            !state.effectExpired &&
            champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.4
        ){
            const shieldAmount = champion.statsByStarLevel[champion.starLevel].hp * 0.25;
            champion.shield += shieldAmount;
            state.shieldAmount = shieldAmount; 
            
            champion.statsByStarLevel[champion.starLevel].armor += 20;
            champion.statsByStarLevel[champion.starLevel].magicResist += 20;
            state.timeSinceEffectUsed = battleTime;
            state.effectUsed = true;
            console.log(`[${formattedTime}] ${champion.name} gained ${shieldAmount} shield, 20 armor and 20 magic resist`);
        } else if(item.name === 'Protector\'s Vow' && 
            state.effectUsed && 
            !state.effectExpired &&
            battleTime - state.timeSinceEffectUsed >= 500
        ){
            state.effectExpired = true;

            const shieldToRemove = Math.min(champion.shield, state.shieldAmount);
            
            if(champion.shield > 0){
                champion.shield -= shieldToRemove;

                // Also remove the armor and magic resist bonuses when shield expires
                champion.statsByStarLevel[champion.starLevel].armor -= 20;
                champion.statsByStarLevel[champion.starLevel].magicResist -= 20;
                console.log(`[${formattedTime}] ${champion.name} lost ${shieldToRemove} shield, 20 armor and 20 magic resist`);
            } 
        };
    });
};

const redBuffStateMap = new Map();

export function redBuffEffect(champion: Champion, target: Champion, battleTime: number){
    if(!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);
    const burnDamage = target.statsByStarLevel[target.starLevel].hp * 0.01;

    if(!redBuffStateMap.has(champion.id)){
        redBuffStateMap.set(champion.id, {
            effectUsed: false,
            timeSinceEffectUsed: 0,
            attackCount: 0,
            timeSinceLastEffect: 0,
            burnTicks: 0,
        });
    };

    const state = redBuffStateMap.get(champion.id);

    if(champion.damageArray.length > state.attackCount){
        state.effectUsed = true;
        state.timeSinceEffectUsed = battleTime;
        state.attackCount += 1
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Red Buff' && item.burn && item.wound && state.effectUsed){

            // Remove effect after 5 ticks
            if(state.burnTicks >= 5){
                state.effectUsed = false;
                state.timeSinceEffectUsed = 0;
                state.timeSinceLastEffect = 0;
                target.burn = false;
                target.wound = false;
                state.burnTicks = 0;
                return 
            };

            if(!target.burn){
                target.burn = true;
                console.log(`[${formattedTime}] ${target.name} is being burnt by ${champion.name}'s Red Buff`);
            };

            if(!target.wound){
                target.wound = true;
                console.log(`[${formattedTime}] ${target.name} is being wounded by ${champion.name}'s Red Buff`);
            };
            
            if(target.burn && battleTime - state.timeSinceLastEffect >= 100){
                state.timeSinceLastEffect = battleTime;
                target.currentHp -= burnDamage;
                state.burnTicks += 1;
                target.trueDamageTakenArray.push(burnDamage);
                champion.trueDamageArray.push(burnDamage);
                console.log(`[${formattedTime}] ${target.name} burned for ${burnDamage} damage`);
            };
        };
    });
};

const morellonomiconStateMap = new Map();

export function morellonomiconEffect(champion: Champion, target: Champion, battleTime: number) {
    if(!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);
    const burnDamage = target.statsByStarLevel[target.starLevel].hp * 0.01;

    if(!morellonomiconStateMap.has(champion.name)){
        morellonomiconStateMap.set(champion.name, {
            effectUsed: false,
            timeSinceEffectUsed: 0,
            attackCount: 0,
            timeSinceLastEffect: 0,
            burnTicks: 0,
        });
    }

    const state = morellonomiconStateMap.get(champion.name);

    if(champion.damageArray.length > state.attackCount){
        state.effectUsed = true;
        state.timeSinceEffectUsed = battleTime;
        state.attackCount += 1
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Morellonomicon' && item.burn && item.wound && state.effectUsed){

            // Remove effect after 5 ticks
            if(state.burnTicks >= 5){
                state.effectUsed = false;
                state.timeSinceEffectUsed = 0;
                state.timeSinceLastEffect = 0;
                target.burn = false;
                target.wound = false;
                state.burnTicks = 0;
                return 
            };

            if(!target.burn){
                target.burn = true;
                console.log(`[${formattedTime}] ${target.name} is being burnt by ${champion.name}'s Morellonomicon`);
            };

            if(!target.wound){
                target.wound = true;
                console.log(`[${formattedTime}] ${target.name} is being wounded by ${champion.name}'s Morellonomicon`);
            };
            
            if(target.burn && battleTime - state.timeSinceLastEffect >= 100){
                state.timeSinceLastEffect = battleTime;                
                state.burnTicks += 1;
                target.currentHp -= burnDamage;
                target.trueDamageTakenArray.push(burnDamage);
                champion.trueDamageArray.push(burnDamage);
                console.log(`[${formattedTime}] ${target.name} burned for ${burnDamage} damage`);
            };
        };
    });
};


const gargoyleStoneplateStateMap = new Map();

export function gargoyleStoneplateEffect(champion: Champion, battleTime: number){
    if (!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);
    
    if(!gargoyleStoneplateStateMap.has(champion.id)){
        gargoyleStoneplateStateMap.set(champion.id, {
            effectUsed: false,
            amountOfChampionsAttacking: 0,
        });
    };

    const state = gargoyleStoneplateStateMap.get(champion.id);

     if(champion.currentChampionsAttacking.length > state.amountOfChampionsAttacking){
        state.amountOfChampionsAttacking += 1;
        state.effectUsed = true;
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Gargoyle Stoneplate' && 
            state.amountOfChampionsAttacking > 0 && 
            state.effectUsed
        ){            
            state.effectUsed = false
            const armorBonus = 10 * state.amountOfChampionsAttacking;
            const magicResistBonus = 10 * state.amountOfChampionsAttacking;
            champion.statsByStarLevel[champion.starLevel].armor += armorBonus;
            champion.statsByStarLevel[champion.starLevel].magicResist += magicResistBonus;
            console.log(`[${formattedTime}] ${champion.name} gained ${armorBonus} armor and ${magicResistBonus} magic resist from ${state.amountOfChampionsAttacking} attackers`);
        };
    });
};

const sunfireCapeStateMap = new Map();

export function sunfireCapeEffect(champion: Champion, target: Champion, surroundingOpponents: Champion[], battleTime: number){
    if(!champion?.items?.length || !battleTime) return;

    const formattedTime = getFormattedTime(champion);
    const burnDamage = target.statsByStarLevel[target.starLevel].hp * 0.01;

    if(!sunfireCapeStateMap.has(champion.id)){
        sunfireCapeStateMap.set(champion.id, {
            effectUsed: true, 
            timeSinceEffectUsed: 0,
        });
    };

    const state = sunfireCapeStateMap.get(champion.id);

    if(state.burnTicks >= 5){
        state.effectUsed = false;
        state.timeSinceEffectUsed = 0;
        return;
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Sunfire Cape' &&
            item.burn &&
            item.wound &&
            state.effectUsed
        ){
            surroundingOpponents.forEach((targets: Champion) => {
                if(!targets.burn){
                    targets.burn = true;
                    console.log(`[${formattedTime}] ${targets.name} is being burnt by ${champion.name}'s Sunfire Cape`);
                }

                if(!targets.wound){
                    targets.wound = true;
                    console.log(`[${formattedTime}] ${targets.name} is being wounded by ${champion.name}'s Sunfire Cape`);
                }
                if(battleTime - state.timeSinceEffectUsed >= 100){
                    targets.currentHp -= burnDamage;
                    state.burnTicks += 1;                    
                    state.timeSinceEffectUsed = battleTime;
                    target.trueDamageTakenArray.push(burnDamage);
                    champion.trueDamageArray.push(burnDamage);
                    console.log(`[${formattedTime}] ${targets.name} burned for ${burnDamage} damage from Sunfire Cape`);
                }
            });
        }
    });
};

const adaptiveHelmStateMap = new Map();

export function adaptiveHelmEffect(champion: Champion, isChampionFrontOrBack: boolean, battleTime: number){
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
                console.log(`[${formattedTime}] ${champion.name} gained 40 armor and magic resist`);
            } else if(!isChampionFrontOrBack){
                champion.abilityPower += 20;
                console.log(`[${formattedTime}] ${champion.name} gained 20 ability power`);
            }
            state.effectUsed = true;
        }
    })
}

const ionicSparkStateMap = new Map();

export function ionicSparkEffect(champion: Champion, target: Champion,surroundingOpponents: Champion[], battleTime: number){
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
                    console.log(`[${formattedTime}] ${targets.name} shreded`)
                };

                if(targets.abilityArray.length > state.targetAbilityCount){
                    state.targetAbilityCount += 1;
                    const magicDamage = target.abilityManaCost * 1.6;
                    targets.currentHp -= magicDamage
                    champion.magicDamageArray.push(magicDamage);
                    target.magicDamageTakenArray.push(magicDamage);
                    console.log(`[${formattedTime}] ${targets.name} took ${magicDamage} magic damage from Ionic Spark`);
                };
            });
        };
    });
};

const evenshroudStateMap = new Map();

export function evenshroudEffect(champion: Champion, surroundingOpponents: Champion[], battleTime: number){
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
                    console.log(`[${formattedTime}] ${targets.name} sundered from Evenshroud`);   
                };
            });
            
        if(!state.combastStartEffectUsed){      
                state.combastStartEffectUsed = true;                               
                state.timeSinceEffectUsed = battleTime;
                champion.statsByStarLevel[champion.starLevel].armor += 25;
                champion.statsByStarLevel[champion.starLevel].magicResist += 25;
                console.log(`Combat start: [${formattedTime}] ${champion.name} gained 25 armor and magic resist from Evenshroud`);
            };
        };
    });
};


const redemptionStateMap = new Map();

export function redemptionEffect(champion: Champion, surroundingAllies: Champion[], battleTime: number){
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
                
                console.log(`[${formattedTime}] ${ally.name} healed for ${healingAmount} by redemption and gained 10 reduction`);
            });

            const healingAmount = Math.round(champion.statsByStarLevel[champion.starLevel].hp * 0.15);

            champion.currentHp += healingAmount;
            console.log(`[${formattedTime}] ${champion.name} healed for ${healingAmount} by redemption and gained 10% reduction`);

            state.timeSinceEffectUsed = battleTime;
        };
    });
};

const edgeOfNightStateMap = new Map();

export function edgeOfNightEffect(champion: Champion, battleTime: number){
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
                console.log(`[${formattedTime}] ${champion.name} gained 15% attack speed and 5 second immunity from Edge of Night`);
            };
            
            if(state.effectUsed && !state.effectExpired && 
               battleTime - state.timeSinceEffectUsed >= 500){
                champion.immunity = false;
                state.effectExpired = true;
                console.log(`[${formattedTime}] ${champion.name} lost their immunity`);
            };
        };
    });
};

const statikkShivStateMap = new Map();

export function statikkShivEffect(champion: Champion, target: Champion, battleTime: number){
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
                console.log(`[${formattedTime}] ${target.name} shreded from Statikk Shiv`);
            }

            target.currentHp -= magicDamage;            
            target.magicDamageTakenArray.push(magicDamage);
            champion.magicDamageArray.push(magicDamage);
            state.effectUsed = false;
            console.log(`[${formattedTime}] ${champion.name} dealt ${magicDamage} magic damage to ${target.name}`);
        };
    });
};

const quickSilverStateMap = new Map();

export function quickSilverEffect(champion: Champion, battleTime: number){
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
                console.log(`[${formattedTime}] ${champion.name} gained 3% attack speed from Quick Silver`);
            }
            // after combat start effect still active for 18 seconds
            if (battleTime % 200 === 0 && battleTime <= 1800) { 
                champion.attackSpeed *= 1.03;
                console.log(`[${formattedTime}] ${champion.name} gained 3% attack speed from Quick Silver`);
            };
        };
    });
};

