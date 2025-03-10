import { ItemProps } from './item'; 

function getFormattedTime(champion: any){
    const mins = Math.floor(champion.battleTime / 6000);
    const secs = Math.floor((champion.battleTime % 6000) / 100);
    const cents = champion.battleTime % 100;
    const formattedTime = `${mins}:${secs.toString().padStart(2, '0')}:${cents.toString().padStart(2, '0')}`;
    return formattedTime;
}

export function addAdditionalItemStatistics(champion: any) { // basic stats
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

export function dragonsClawEffect(champion: any, battleTime: number){
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

let bloodthristerEffectUsed = false

export function bloodthristerEffect(champion: any, battleTime: number ){   
    if(!champion || !champion.items || !champion.items.length || !battleTime) return 'No items equipped';

    let formattedTime = getFormattedTime(champion);
    
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

export function brambleVestEffect(champion: any, target: any, battleTime: number){ // unfinished
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

export function giantSlayerEffect(champion: any, target: any, battleTime: number){
    if(!champion || !champion.items || !champion.items.length || !battleTime) return 'No items equipped';
    
    const formattedTime = getFormattedTime(champion);
    
    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Giant Slayer' && target.statsByStarLevel[target.starLevel].hp > 1750 && !giantSlayerEffectUsed){
            champion.damageAmp += item.additionalDamageAmp;
            console.log(`[${formattedTime}] ${champion.name} gained 20% damage amp against ${target.name}`);
            giantSlayerEffectUsed = true
        }
    })
}

export function archangelsStaffEffect(champion: any, battleTime: number){
    if(!champion || !champion.items || !champion.items.length || !battleTime) return 'No items equipped';

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Archangel\'s Staff' && item.abilityPowerStacking){
            if(battleTime % 500 === 0){
                champion.abilityPower += item.additionalAbilityPowerPerStack; 
                console.log(`[${formattedTime}] ${champion.name} gained ${item.additionalAbilityPowerPerStack} ability power`);
            }
        }
    })
}

let runnansHurricaneEffectUsed = false;

export function runnansHurricaneEffect(champion: any, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return 'No items equipped';

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Runaan\s Hurricane' && !runnansHurricaneEffectUsed){
            champion.attackDamage += champion.attackDamage * 0.55;
            runnansHurricaneEffectUsed = true;
        }
    })
}

let steraksGageEffectUsed = false;

export function steraksGageEffect(champion: any, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;
    
    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) =>{
        if(item.name ==='Sterak\'s Gage' &&
            !steraksGageEffectUsed &&
            champion.currentHp <= champion.statsByStarLevel[champion.starLevel].hp * 0.6
        ){
            champion.currentHp += champion.statsByStarLevel[champion.starLevel].hp *  0.25;
            champion.attackDamage *= 1.35 ;
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

export function titansResolveEffect(champion: any, battleTime: number){
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
            champion.attackDamage *= 1.02;
            titansResolveStacks += 1;
            console.log(`[${formattedTime}] ${champion.name} gained 2% attack damage and 1 ability power (Stack ${titansResolveStacks}/25)`);
            damageTaken = false; 
            return;
        };

        if(titansResolveStacks === 25 && !titansResolveFullStackEffectUsed){
            titansResolveEffectUsed = true;      
            titansResolveFullStackEffectUsed = true;
            champion.armor += 20;
            champion.magicResist += 20;
            console.log(`[${formattedTime}] ${champion.name} gained 20 armor and 20 magic resist`);
            return;
        };
    });
};

let steadfastHeartEffectUsed = true;
let steadFastHeartAfterEffectUsed = false;

export function steadfastHeartEffect(champion: any, battleTime: number){
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
        }
    });
};

let crownguardEffectUsed = false;
let crownguardEffectExpired = false;

export function crownguardEffect(champion: any, battleTime: number){
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
            console.log(`[${formattedTime}] ${champion.name} gained ${champion.statsByStarLevel[champion.starLevel].hp * item.shieldAmount} shield`)
        } 
        if(item.name === 'Crownguard' && battleTime >= 800 && !crownguardEffectExpired){
            crownguardEffectExpired = true;
            champion.shield = 0;
            console.log(`[${formattedTime}] ${champion.name} lost their shield`)
        }
    })
}

let handOfJusticeEffectUsed = false;

export function handOfJusticeEffect(champion: any, battleTime: number){
    if(!champion || !champion.items || !champion.items.length) return;

    const formattedTime = getFormattedTime(champion);

    champion.items.forEach((item: ItemProps) => {
        if(item.name === 'Hand of Justice' && !handOfJusticeEffectUsed ){
            champion.attackDamage += 15;
            champion.abilityPower += 15;
            champion.omnivamp += 15;
            handOfJusticeEffectUsed = true;
            
            console.log(`[${formattedTime}] ${champion.name} used HOJ effect`)

            if(Math.random() * 100 < 50){
                champion.attackDamage += 15;
                champion.abilityPower += 15;
                console.log(`[${formattedTime}] ${champion.name} gained 30 attack damage and omnivamp.`)
            } else{
                champion.omnivamp += 15;
                console.log(`[${formattedTime}] ${champion.name} gained 30 omnivamp.`)
            }
        }
    })
}