import { Item, ItemProps } from './item'; 
import { Champion } from '../champion/champion';


function getFormattedTime(champion: any){
    const mins = Math.floor(champion.battleTime / 6000);
    const secs = Math.floor((champion.battleTime % 6000) / 100);
    const cents = champion.battleTime % 100;
    const formattedTime = `${mins}:${secs.toString().padStart(2, '0')}:${cents.toString().padStart(2, '0')}`;
    return formattedTime;
}

// basic stats
export function addAdditionalItemStatistics(champion: Champion) { 
    if (!champion || !champion.items || !champion.items.length) return 'No items equipped';

    if(champion.items.length > 0 && champion.items.length <= 3){
        champion.items.forEach((item: ItemProps) => {            
            champion.currentHp += item.additionalHealth || 0;      
            champion.statsByStarLevel[champion.starLevel].hp += item.additionalHealth || 0;    
            champion.currentHp *= item.additionalPercentageHealth || 1; 
            champion.statsByStarLevel[champion.starLevel].hp *= item.additionalPercentageHealth || 1;
            champion.statsByStarLevel[champion.starLevel].hp *= item.additionalPercentageHealth || 1;           
            champion.statsByStarLevel[champion.starLevel].armor += item.additionalArmor || 0;   
            champion.statsByStarLevel[champion.starLevel].magicResist += item.additionalMagicResist || 0;
            champion.statsByStarLevel[champion.starLevel].attackDamage *= item.additionalAttackDamage || 1;
            champion.damageAmp += item.additionalDamageAmp || 0;
            champion.attackSpeed *= item.additionalAttackSpeed || 1;
            champion.manaPerAttack += item.additionalManaPerAttack || 0;
            champion.range += item.additionalAttackRange || 0;
            champion.attackCritChance += item.additionalCritChance || 0;
            champion.attackCritDamage += item.additionalCritDamage || 0;
            champion.durability += item.additionalDurability || 0;
            champion.statsByStarLevel[champion.starLevel].reduction += item.reductionAmount || 0;
            champion.abilityPower += item.additionalAbilityPower || 0;            
            champion.mana += item.additionalStartingMana || 0;  
            champion.abilityManaCost -= item.reducedMaxMana || 0;
        });
    } else if(champion.items.length === 0){
        console.log('No items equipped');
    } else {
        console.log('Max 3 items can be equipped');
    }
}

export function dragonsClawEffect(champion: Champion, battleTime: number){
    if (!champion || !champion.items || !champion.items.length || !battleTime) return 'No items equipped';

    let formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Dragon\'s Claw' && 
            item.heal && item.healAmount && 
            battleTime % 200 === 0 && 
            battleTime > 0
        ){
            const healAmount = Math.round(champion.statsByStarLevel[champion.starLevel].hp * item.healAmount);
            champion.currentHp += healAmount;
            champion.healArray.push(healAmount);
            console.log(`[${formattedTime}] ${champion.name} healed for ${healAmount} hp`);
        }
    })
}

const bloodthristerStateMap = new Map();
let bloodthristerEffectUsed = false;

export function bloodthristerEffect(champion: Champion, battleTime: number ){   
    if(!champion || !champion.items || !champion.items.length || !battleTime) return 'No items equipped';

    let formattedTime = getFormattedTime(champion);
    
    if(!bloodthristerStateMap.has(champion.id)){
        bloodthristerStateMap.set(champion.id, {
            bloodthristerEffectUsed: false
        })
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Bloodthirster' && 
            item.shield && 
            item.shieldAmount && 
            item.shieldDuration && 
            !bloodthristerEffectUsed
        ){
            if(champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.4){
                champion.shield += (champion.statsByStarLevel[champion.starLevel].hp * item.shieldAmount);
                bloodthristerEffectUsed = true;
                console.log(`[${formattedTime}] ${champion.name} gained a shield for ${champion.statsByStarLevel[champion.starLevel].hp * item.shieldAmount} hp`);
            }
        }
    })
}

let timeSinceLastExternalMagicDamage = 0;
let attackedArray = [];
let cooldown = 0; // 200 centiseconds, 2 seconds

export function brambleVestEffect(champion: Champion, target: Champion, battleTime: number){ // unfinished
    if(!champion || !champion.items || !champion.items.length || !battleTime) return 'No items equipped';

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

let giantSlayerEffectUsed = false

export function giantSlayerEffect(champion: Champion, target: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length || !battleTime) return 'No items equipped';
    
    const formattedTime = getFormattedTime(champion);
    
    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Giant Slayer' && target.statsByStarLevel[target.starLevel].hp > 1750 && !giantSlayerEffectUsed){
            champion.damageAmp += item.additionalDamageAmp || 0;
            console.log(`[${formattedTime}] ${champion.name} gained 20% damage amp against ${target.name}`);
            giantSlayerEffectUsed = true
        }
    })
}

export function archangelsStaffEffect(champion: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length || !battleTime) return 'No items equipped';

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Archangel\'s Staff' && item.abilityPowerStacking){
            if(battleTime % 500 === 0){
                champion.abilityPower += item.additionalAbilityPowerPerStack || 0; 
                console.log(`[${formattedTime}] ${champion.name} gained ${item.additionalAbilityPowerPerStack} ability power`);
            }
        }
    })
}

let runnansHurricaneEffectUsed = false;

export function runnansHurricaneEffect(champion: Champion){
    if(!champion || !champion.items || !champion.items.length) return 'No items equipped';

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Runaan\s Hurricane' && !runnansHurricaneEffectUsed){
            champion.statsByStarLevel[champion.starLevel].attackDamage += champion.statsByStarLevel[champion.starLevel].attackDamage * 0.55;
            runnansHurricaneEffectUsed = true;
        }
    })
}

let steraksGageEffectUsed = false;

export function steraksGageEffect(champion: Champion){
    if(!champion || !champion.items || !champion.items.length) return;
    
    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) =>{
        if(item.name ==='Sterak\'s Gage' &&
            !steraksGageEffectUsed &&
            champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.6
        ){
            champion.currentHp += champion.statsByStarLevel[champion.starLevel].hp *  0.25;
            champion.statsByStarLevel[champion.starLevel].attackDamage *= 1.35;
            console.log(`[${formattedTime}] ${champion.name} gained ${champion.statsByStarLevel[champion.starLevel].hp *  0.25} health`);
            steraksGageEffectUsed = true;
        }
    })
}

let titansResolveEffectUsed = false;
let titansResolveFullStackEffectUsed = false;
let titansResolveStacks = 0;
let damageTakenArray = [];
let damageTaken = false;

export function titansResolveEffect(champion: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    if(champion.damageTakenArray && champion.damageTakenArray.length > damageTakenArray.length){
        damageTaken = true;
        damageTakenArray.push(battleTime);
    };

    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Titan\'s Resolve' &&             
            !titansResolveEffectUsed &&
            item.abilityPowerStacking && 
            titansResolveStacks < 25 &&
            damageTaken
        ){            
            champion.abilityPower += 1;
            champion.statsByStarLevel[champion.starLevel].attackDamage *= 1.02;
            titansResolveStacks += 1;
            console.log(`[${formattedTime}] ${champion.name} gained 2% attack damage and 1 ability power (Stack ${titansResolveStacks}/25)`);
            damageTaken = false; 
            return;
        } else if(titansResolveStacks === 25 && !titansResolveFullStackEffectUsed){
            titansResolveEffectUsed = true;      
            titansResolveFullStackEffectUsed = true;
            champion.statsByStarLevel[champion.starLevel].armor += 20;
            champion.statsByStarLevel[champion.starLevel].magicResist += 20;
            console.log(`[${formattedTime}] ${champion.name} gained 20 armor and 20 magic resist`);
            return;
        };
    });
};

let steadfastHeartEffectUsed = true;
let steadFastHeartAfterEffectUsed = false;

export function steadfastHeartEffect(champion: Champion){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Steadfast Heart' && 
            steadfastHeartEffectUsed && 
            champion.currentHp > champion.statsByStarLevel[champion.starLevel].hp * 0.5 &&
            steadfastHeartEffectUsed
        ){
            champion.durability += 15;
            console.log(`[${formattedTime}] ${champion.name} gained 15 durability`);
            steadfastHeartEffectUsed = false;
        } else if(item.name === 'Steadfast Heart' && 
            champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.5 && 
            !steadfastHeartEffectUsed &&
            !steadFastHeartAfterEffectUsed
        ){
            champion.durability -= 7;
            steadFastHeartAfterEffectUsed = true;
            console.log(`[${formattedTime}] ${champion.name} lost 7 durability`);
        };
    });
};

let crownguardEffectUsed = false;
let crownguardEffectExpired = false;

export function crownguardEffect(champion: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Crownguard' && 
            item.shield && 
            item.shieldAmount && 
            item.shieldDuration && 
            !crownguardEffectUsed
        ){
            champion.shield += (champion.statsByStarLevel[champion.starLevel].hp * item.shieldAmount);  
            crownguardEffectUsed = true;
            console.log(`[${formattedTime}] ${champion.name} gained ${champion.statsByStarLevel[champion.starLevel].hp * item.shieldAmount} shield`);
        } else if(item.name === 'Crownguard' && battleTime >= 800 && !crownguardEffectExpired){
            crownguardEffectExpired = true;
            champion.shield = 0;
            console.log(`[${formattedTime}] ${champion.name} lost their shield`);
        };
    });
};

let handOfJusticeEffectUsed = false;

export function handOfJusticeEffect(champion: Champion){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Hand of Justice' && !handOfJusticeEffectUsed ){
            champion.statsByStarLevel[champion.starLevel].attackDamage += 15;
            champion.abilityPower += 15;
            champion.omnivamp += 15;
            handOfJusticeEffectUsed = true;
            
            console.log(`[${formattedTime}] ${champion.name} used HOJ effect`);

            if(Math.random() * 100 < 50){
                champion.statsByStarLevel[champion.starLevel].attackDamage += 15;
                champion.abilityPower += 15;
                console.log(`[${formattedTime}] ${champion.name} gained 30 attack damage and ability power.`);
            } else{
                champion.omnivamp += 15;
                console.log(`[${formattedTime}] ${champion.name} gained 30 omnivamp.`);
            };
        };
    });
};

let guardBreakerEffectUsed = false;
let attackShield = false;
let attackShieldArray = [];
let timeSinceLastguardBreakerEffectUsed = 0

export function guardBreakerEffect(champion: Champion, target: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    if(target.shieldDamageTakenAray.length > attackShieldArray.length){
        attackShield = true;
        attackShieldArray.push(battleTime);
    };

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Guardbreaker' && !guardBreakerEffectUsed && attackShield){
            champion.damageAmp += 0.25;
            timeSinceLastguardBreakerEffectUsed = battleTime;
            guardBreakerEffectUsed = true;
            console.log(`[${formattedTime}] ${champion.name} gained 25% damage amp.`);
        } else if(item.name === 'Guardbreaker' && 
            attackShield && 
            guardBreakerEffectUsed && 
            (battleTime - timeSinceLastguardBreakerEffectUsed) >= 300
        ){
            champion.damageAmp -= 0.25;
            guardBreakerEffectUsed = false;
            attackShield = false;
            console.log(`[${formattedTime}] ${champion.name} lost 25% damage amp.`);
        };
    });
};

let nashorsToothEffectUsed = false;
let abilityNashorsToothUsed = false;
let abilityNashorsToothUsedArray = [];
let timeSinceLastNashorsToothEffectUsed = 0;

export function nashorsToothEffect(champion: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    if(champion.abilityArray.length > abilityNashorsToothUsedArray.length){
        nashorsToothEffectUsed = true;
        abilityNashorsToothUsed = true;
        timeSinceLastNashorsToothEffectUsed = battleTime;
        abilityNashorsToothUsedArray.push(battleTime) 
    };

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Nashor\'s Tooth' && nashorsToothEffectUsed && abilityNashorsToothUsed ){
            champion.attackSpeed *= 1.6 
            abilityNashorsToothUsed = false;
            console.log(`[${formattedTime}] ${champion.name} gained 60% attack speed.`);
        }  else if(item.name === 'Nashor\'s Tooth' && 
            nashorsToothEffectUsed && 
            !abilityNashorsToothUsed && 
            (battleTime - timeSinceLastNashorsToothEffectUsed) >= 500
        ){
            champion.attackSpeed /= 1.6 
            nashorsToothEffectUsed = false;
            abilityNashorsToothUsed = false;
            console.log(`[${formattedTime}] ${champion.name} lost 60% attack speed.`);
        };
    });
};

let hextechGunbladeEffectUsed = false;
let abilityHextechGunbladeUsed = false;
let abilityHextechGunbladeUsedArray = [];

export function hextechGunbladeEffect(champion: Champion, ally: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);
    const healedHp =  champion.statsByStarLevel[champion.starLevel].attackDamage * 0.25

    if(champion.abilityArray.length > abilityHextechGunbladeUsedArray.length){
        hextechGunbladeEffectUsed = true
        abilityHextechGunbladeUsed = true;  
        abilityHextechGunbladeUsedArray.push(battleTime);
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Hextech Gunblade' && item.heal && hextechGunbladeEffectUsed){
            if(abilityHextechGunbladeUsed){
                ally.currentHp += healedHp
                hextechGunbladeEffectUsed = false;
                console.log(`[${formattedTime}] ${champion.name} healed ${ally.name} for ${healedHp}`);
            };
        };
    });
};

let protectorsVowEffectUsed = false;
let protectorsVowEffectExpired = false;
let timeSinceLastProtectorsVowEffectUsed = 0;
let protectorsVowShieldAmount = 0; 

export function protectorsVowEffect(champion: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);
    
    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Protector\'s Vow' && 
            champion.shield &&
            !protectorsVowEffectUsed && 
            !protectorsVowEffectExpired &&
            champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.4
        ){
            const shieldAmount = champion.statsByStarLevel[champion.starLevel].hp * 0.25;
            champion.shield += shieldAmount;
            protectorsVowShieldAmount = shieldAmount; 
            
            champion.statsByStarLevel[champion.starLevel].armor += 20;
            champion.statsByStarLevel[champion.starLevel].magicResist += 20;
            timeSinceLastProtectorsVowEffectUsed = battleTime;
            protectorsVowEffectUsed = true;
            console.log(`[${formattedTime}] ${champion.name} gained ${shieldAmount} shield, 20 armor and 20 magic resist`);
        } else if(item.name === 'Protector\'s Vow' && 
            protectorsVowEffectUsed && 
            !protectorsVowEffectExpired &&
            battleTime - timeSinceLastProtectorsVowEffectUsed >= 500
        ){
            protectorsVowEffectExpired = true;

            const shieldToRemove = Math.min(champion.shield, protectorsVowShieldAmount);
            
            if(champion.shield > 0){
                champion.shield -= shieldToRemove;
                console.log(`[${formattedTime}] ${champion.name} lost ${shieldToRemove} shield`);
            } else {
                return 'No shield to remove';
            };

            console.log(`[${formattedTime}] ${champion.name} lost their Protector's Vow shield and stats`);
        };
    });
};

let redBuffEffectUsed = false;
let isTargetBurned = false;
let isTargetWounded = false;
let timeSinceRedBuffEffectUsed = 0;
let attackRedBuffArray: number[] = [];
let timeSinceLastRedBuffEffect = 0;
let burnTicks = [];

export function redBuffEffect(champion: Champion, target: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);
    const burnDamage = target.statsByStarLevel[target.starLevel].hp * 0.01;

    if(champion.damageArray.length > attackRedBuffArray.length){
        redBuffEffectUsed = true;
        isTargetWounded = true;
        isTargetBurned = true;
        timeSinceRedBuffEffectUsed = battleTime;
        attackRedBuffArray.push(battleTime);
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Red Buff' && item.burn && item.wound && redBuffEffectUsed){

            if(burnTicks.length >= 5){
                redBuffEffectUsed = false;
                isTargetBurned = false;
                isTargetWounded = false;
                timeSinceRedBuffEffectUsed = 0;
                attackRedBuffArray: []
                timeSinceLastRedBuffEffect = 0;
                target.burn = false;
                target.wound = false;
                burnTicks = []
                return 
            };

            if(isTargetBurned && !target.burn){
                target.burn = true;
                console.log(`[${formattedTime}] ${target.name} is being burnt by ${champion.name}'s Red Buff`);
            };

            if(isTargetWounded && !target.wound){
                target.wound = true;
            };
            
            if(target.burn && battleTime - timeSinceLastRedBuffEffect >= 100){
                timeSinceLastRedBuffEffect = battleTime;
                target.currentHp -= burnDamage;
                burnTicks.push(battleTime)
                console.log(`[${formattedTime}] ${target.name} burned for ${burnDamage} damage`);
            };
        };
    });
};

let morellonomiconEffectUsed = false;
let isTargetBurnedByMorellonomicon = false;
let isTargetWoundedByMorellonomicon = false;
let timeSinceMorellonomiconEffectUsed = 0;
let attackMorellonomiconArray: number[] = [];
let timeSinceLastMorellonomiconEffect = 0;
let burnTicksForMorellonomicon = [];

export function morellonomiconEffect(champion: Champion, target: Champion, battleTime: number) {
    if (!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);
    const burnDamage = target.statsByStarLevel[target.starLevel].hp * 0.01;

    if (champion.damageArray.length > attackMorellonomiconArray.length) {
        morellonomiconEffectUsed = true;
        isTargetBurnedByMorellonomicon = true;
        isTargetWoundedByMorellonomicon = true;
        timeSinceMorellonomiconEffectUsed = battleTime;
        attackMorellonomiconArray.push(battleTime);
    }

    champion.items.forEach((item: ItemProps) => {
        if (item.name === 'Morellonomicon' && item.burn && item.wound && morellonomiconEffectUsed) {

            if (burnTicksForMorellonomicon.length >= 5) {
                morellonomiconEffectUsed = false;
                isTargetBurned = false;
                isTargetWounded = false;
                timeSinceMorellonomiconEffectUsed = 0;
                attackMorellonomiconArray = [];
                timeSinceLastMorellonomiconEffect = 0;
                target.burn = false;
                target.wound = false;
                burnTicksForMorellonomicon = [];
                return;
            }

            if (isTargetBurnedByMorellonomicon && !target.burn) {
                target.burn = true;
                console.log(`[${formattedTime}] ${target.name} is being burnt by ${champion.name}'s Morellonomicon`);
            }

            if (isTargetWoundedByMorellonomicon && !target.wound) {
                target.wound = true;
            }

            if (target.burn && battleTime - timeSinceLastMorellonomiconEffect >= 100) {
                timeSinceLastMorellonomiconEffect = battleTime;
                target.currentHp -= burnDamage;
                burnTicksForMorellonomicon.push(battleTime);
                console.log(`[${formattedTime}] ${target.name} burned for ${burnDamage} damage`);
            }
        }
    });
};

let gargoyleStoneplateEffectUsed = false;
let amountOfChampionsAttacking = 0;

export function gargoyleStoneplateEffect(champion: Champion, battleTime: number){
    if (!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);
    
     if(champion.currentChampionsAttacking.length > amountOfChampionsAttacking){
        amountOfChampionsAttacking = 1;
        gargoyleStoneplateEffectUsed = true;
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Gargoyle Stoneplate' && amountOfChampionsAttacking > 0 && gargoyleStoneplateEffectUsed){
            const armorBonus = 10 * amountOfChampionsAttacking;
            const magicResistBonus = 10 * amountOfChampionsAttacking;

            champion.statsByStarLevel[champion.starLevel].armor += armorBonus;
            champion.statsByStarLevel[champion.starLevel].magicResist += magicResistBonus;
            gargoyleStoneplateEffectUsed = false
            console.log(`[${formattedTime}] ${champion.name} gained ${armorBonus} armor and ${magicResistBonus} magic resist from ${amountOfChampionsAttacking} attackers`);
        }
    });
}

let sunfireCapeEffectUsed = true;
let burnTicksForSunfireCape = [];
let isTargetBurnedBySunfireCape = false;
let isTargetWoundedBySunfireCape = false;
let timeSinceLastSunfireCapeEffect = 0;

export function sunfireCapeEffect(champion: Champion, target: Champion, surroundingOpponents: Champion[], battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);
    const burnDamage = target.statsByStarLevel[target.starLevel].hp * 0.01;

    if(burnTicksForSunfireCape.length >= 5){
        sunfireCapeEffectUsed = false;
        isTargetBurnedBySunfireCape = false;
        isTargetWoundedBySunfireCape = false;
        timeSinceLastSunfireCapeEffect = 0;
        burnTicksForSunfireCape = [];
    }

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Sunfire Cape' &&
            item.burn &&
            item.wound &&
            sunfireCapeEffectUsed
        ){
            if(battleTime - timeSinceLastSunfireCapeEffect >= 100){
                surroundingOpponents.forEach((targets: Champion) => {
                    if(!isTargetBurnedBySunfireCape && !targets.burn){
                        targets.burn = true;
                        console.log(`[${formattedTime}] ${targets.name} is being burnt by ${champion.name}'s Sunfire Cape`);
                    }

                    if(!isTargetWoundedBySunfireCape && !targets.wound){
                        targets.wound = true;
                    }

                    targets.currentHp -= burnDamage;
                    burnTicksForSunfireCape.push(battleTime);
                    timeSinceLastSunfireCapeEffect = battleTime;
                    console.log(`[${formattedTime}] ${targets.name} burned for ${burnDamage} damage`)

                });
            };
        };
    });
};

let adaptiveHelmEffectUsed = false;

export function adaptiveHelmEffect(champion: Champion, isChampionFrontOrBack: boolean, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Adaptive Helm' && !adaptiveHelmEffectUsed){
            if(isChampionFrontOrBack){  
                champion.statsByStarLevel[champion.starLevel].armor += 40;
                champion.statsByStarLevel[champion.starLevel].magicResist += 40;
                console.log(`[${formattedTime}] ${champion.name} gained 40 armor and magic resist`);
            } else if(!isChampionFrontOrBack){
                champion.abilityPower += 20;
                console.log(`[${formattedTime}] ${champion.name} gained 20 ability power`);
            }
            adaptiveHelmEffectUsed = true;
        }
    })
}

let ionicSparkEffectUsed = true; // passive

export function ionicSparkEffect(champion: Champion, surroundingOpponents: Champion[], battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Ionic Spark' && item.shred && ionicSparkEffectUsed){
            surroundingOpponents.forEach((targets: Champion) => {
                if(!targets.shred){
                    targets.shred = true;    
                    console.log(`[${formattedTime}] ${targets.name} shreded`)
                }

            })
        }
    })
};

let evenshroudEffectUsed = true; // passive
let combatStartEvenshroudEffectUsed = false;
let timeSinceEvenshroudEffectUsed = 0; // combat start 

export function evenshroudEffect(champion: Champion, surroundingOpponents: Champion[], battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    if(timeSinceEvenshroudEffectUsed >= 1000 && combatStartEvenshroudEffectUsed){
        champion.statsByStarLevel[champion.starLevel].armor -= 25;
        champion.statsByStarLevel[champion.starLevel].magicResist -= 25;
        console.log(`[${formattedTime}] ${champion.name} lost 25 armor and magic resist from evenshround combat start effect`);
    }

    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Evenshroud' && evenshroudEffectUsed){
            surroundingOpponents.forEach((targets: Champion) =>{
                if(!targets.sunder){
                    targets.sunder = true;
                    console.log(`[${formattedTime}] ${targets.name} sundered from evenshroud`);   
                }
            })
            
            if(!combatStartEvenshroudEffectUsed){
                champion.statsByStarLevel[champion.starLevel].armor += 25;
                champion.statsByStarLevel[champion.starLevel].magicResist += 25;
                combatStartEvenshroudEffectUsed = true;          
                timeSinceEvenshroudEffectUsed = battleTime
                console.log(`Combat start: [${formattedTime}] ${champion.name} gained 25 armor and magic resist from evenshround`);
            }
        }
    })
}

let redemptionEffectUsed = false;
let timeSinceRedemptionEffectUsed = 0;

export function redemptionEffect(champion: Champion, surroundingAllies: Champion[], battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion); 

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Redemption' && !redemptionEffectUsed && battleTime - timeSinceRedemptionEffectUsed >= 500){
            surroundingAllies.forEach((ally: Champion) => {
                const healingAmount = Math.round(ally.statsByStarLevel[ally.starLevel].hp * 0.15);
                const reductionAmount = ally.statsByStarLevel[champion.starLevel].reduction += 10; // 10% percent

                ally.statsByStarLevel[ally.starLevel].reduction += reductionAmount;
                ally.currentHp += healingAmount;
                ally.healArray.push(healingAmount);
                
                console.log(`[${formattedTime}] ${ally.name} healed for ${healingAmount} by redemption and gained 10 reduction`);
            })

            const healingAmount = Math.round(champion.statsByStarLevel[champion.starLevel].hp * 0.15);

            champion.currentHp += healingAmount
            console.log(`[${formattedTime}] ${champion.name} healed for ${healingAmount} by redemption and gained 10% reduction`)

            timeSinceRedemptionEffectUsed = battleTime
        }
    })
}

let edgeOfNightEffectUsed = false;
let edgeOfNightEffectExpired = false;
let timeSinceEdgeOfNightEffectUsed = 0;

export function edgeOfNightEffect(champion: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);
    
    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Edge of Night'){
            if(!edgeOfNightEffectUsed && champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.6){
                champion.attackSpeed *= 1.15;
                edgeOfNightEffectUsed = true
                champion.immunity = true;  
                timeSinceEdgeOfNightEffectUsed = battleTime;
                console.log(`[${formattedTime}] ${champion.name} gained 15% attack speed and 5 second immunity from Edge of Night`);
            };
            
            if(edgeOfNightEffectUsed && !edgeOfNightEffectExpired && 
               battleTime - timeSinceEdgeOfNightEffectUsed >= 500){
                champion.immunity = false;
                edgeOfNightEffectExpired = true;
                console.log(`[${formattedTime}] ${champion.name} lost their immunity`);
            };
        };
    });
};


export function statikkShivEffect(champion: Champion, target: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Stattik Shiv'){
            if((champion.attacks.length - 1) % 3 === 0){
                const magicDamage = 35;

                target.shred = true;
                target.currentHp -= magicDamage;
                champion.magicDamageArray.push(magicDamage);
                target.magicDamageTakenArray.push(magicDamage);
                console.log(`[${formattedTime}] ${champion.name} dealt ${magicDamage} magic damage to ${target.name}`);
            };
        };
    });
};

let quickSilverEffectUsed = false;
let combatStartQuickSilverEffectUsed = false

export function quickSilverEffect(champion: Champion, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) =>{
        if(item.name === 'Quick Silver' && !quickSilverEffectUsed){
            // combat start
            if(!combatStartQuickSilverEffectUsed){
                champion.attackSpeed *= 1.03;
                combatStartQuickSilverEffectUsed = true;
                console.log(`[${formattedTime}] ${champion.name} gained 3% attack speed from Quick Silver`);
            }
            // after combat start effect still active for 18 seconds
            if (battleTime % 200 === 0 && battleTime <= 1800) { 
                champion.attackSpeed *= 1.03;
                console.log(`[${formattedTime}] ${champion.name} gained 3% attack speed from Quick Silver`);
            }
        }
    })
}