const { getChampionByName } = require('../champion/champion-data');
const { getItemByName } = require('../item/item-data');
const { ItemProps } = require('../item/item');
const { externalMagicDamageEffect } = require('../item/itemLogic');
type ItemProps = typeof ItemProps;

/*
cd simulators/battle-simulator/data/champion
nodemon champion.ts
*/
const { v4: uuidv4 } = require('uuid');


interface AbilityStats {
    reduction: number;
    damage: number;
    magicDamage: number;
    healing: number;
}

interface StarLevelStats {
    hp: number;
    attackDamage: number;
    armor: number;
    magicResist: number;
    ability: AbilityStats;
    reduction: number
}

type StatsByStarLevel = {
    [starLevel: number]: StarLevelStats;
};

function getFormattedTime(champion: Champion) {
    const mins = Math.floor(champion.battleTime / 6000);
    const secs = Math.floor((champion.battleTime % 6000) / 100);
    const cents = champion.battleTime % 100;
    return `${mins}:${secs.toString().padStart(2, '0')}:${cents.toString().padStart(2, '0')}`;
}

export class Champion {
    // Basic Properties
    readonly id: string = uuidv4();
    readonly name: string;
    readonly cost: number;
    readonly abilityName: string;    
    movementSpeed: number; 
    traitsList: string[];
    range: number;

    // Stats
    currentHp: number;
    shield: number;
    armor: number;
    magicResist: number;
    attackSpeed: number;
    durability: number;
    abilityPower: number;
    
    // Combat Stats
    attackCritChance: number;
    attackCritDamage: number;
    abilityCritChance: number;
    abilityCritDamage: number;
    damageAmp: number;
    sunder: boolean;
    shred: boolean;
    wound: boolean;
    burn: boolean;
    immunity: boolean;
    omnivamp: number;

    // Mana System
    mana: number;
    manaPerAttack: number;
    abilityManaCost: number;

    // Star Level
    starLevel: number;
    statsByStarLevel: StatsByStarLevel;

    // Battle State
    battleTime: number = 0;
    lastAttackTime: number = 0;
    nextAttackTime: number = 0;
    nextAttackReady: boolean = true;
    gameTime: number = 0;
    timeStep: number = 0.1;

    // Items
    items: typeof ItemProps[];

    // Combat Tracking Arrays
    attacks: number[] = [1];
    damageTakenArray: number[] = [];
    shieldDamageTakenAray: number[] = [];
    damageArray: number[] = [];
    abilityArray: number[] = [];
    healArray: number[] = [];
    currentTarget: Champion[] = [];
    currentChampionsAttacking: Champion[] = [];

    constructor(
        name: string,
        cost: number, 
        movementSpeed: number,
        traitsList: string[],
        shield: number = 0,
        statsByStarLevel: StatsByStarLevel,
        attackSpeed: number,
        abilityName: string,
        range: number,
        mana: number,
        manaPerAttack: number,
        abilityManaCost: number,
        attackCritChance: number,
        attackCritDamage: number,  
        abilityCritChance: number,    
        abilityCritDamage: number,
        damageAmp: number,
        sunder: boolean,
        shred: boolean,
        wound: boolean,
        burn: boolean,
        immunity: boolean,
        abilityPower: number,  
        omnivamp: number,
        durability: number,
        items: typeof ItemProps[] = [],
        starLevel: number = 1,
    ) {
        this.name = name;
        this.cost = cost;
        this.movementSpeed = movementSpeed;
        this.traitsList = traitsList;
        this.shield = shield;
        this.statsByStarLevel = statsByStarLevel;
        this.attackSpeed = attackSpeed;
        this.abilityName = abilityName;
        this.range = range;
        this.starLevel = starLevel;
        this.mana = mana;
        this.manaPerAttack = manaPerAttack;
        this.abilityManaCost = abilityManaCost;
        this.attackCritChance = attackCritChance;
        this.attackCritDamage = attackCritDamage;     
        this.abilityCritChance = abilityCritChance;   
        this.abilityCritDamage = abilityCritDamage;
        this.damageAmp = damageAmp;
        this.sunder = sunder;
        this.shred = shred;
        this.wound = wound;
        this.burn = burn;
        this.immunity = immunity;
        this.abilityPower = abilityPower;
        this.omnivamp = omnivamp;
        this.durability = durability;
        this.items = items;
        this.currentHp = this.statsByStarLevel[this.starLevel].hp;
        this.armor = this.statsByStarLevel[this.starLevel].armor;
        this.magicResist = this.statsByStarLevel[this.starLevel].magicResist;
        this.nextAttackTime = 1 / this.attackSpeed * 100;
    }

    getStats() {
        return this.statsByStarLevel[this.starLevel];
    }

    setStarLevel(starLevel: number) { 
        if (this.statsByStarLevel[starLevel]) {
            this.starLevel = starLevel;
            this.currentHp = this.statsByStarLevel[starLevel].hp; 
        } else {
            console.log(`Invalid star level: ${starLevel} for ${this.name}`);
        }
    }

    takeDamage(damage: number) {

        if(this.shield > 0){
            this.shield -= damage;
            this.shieldDamageTakenAray.push(damage);
        }

        if(this.shield < 0){
            const remainingDamage = Math.abs(this.shield);
            this.currentHp -= remainingDamage;
            this.shieldDamageTakenAray.push(remainingDamage);
            this.shield = 0;
        }
       
        if(this.shield === 0){
            this.currentHp -= damage;
            this.damageTakenArray.push(damage);
        }

        if (this.currentHp <= 0) {
            this.currentHp = 0;
            console.log(`${this.name} has died.`);
        }
    }

    attack(target: Champion, currentTime: number) {
        this.battleTime = currentTime;
        
        if (this.battleTime < this.nextAttackTime) {
            return false; // didn't attack yet
        }

        const armor = target.getStats().armor;
        const ability = target.getStats().ability;
        const damageReduction = ability.reduction;
        const sunder = target.sunder;
        const immunity = target.immunity
        let durability = target.durability;

        const damage = this.getStats().attackDamage;
        const critRate = this.attackCritChance;
        const critDamageAmp = this.attackCritDamage;
        const damageAmp = this.damageAmp;
        const wound = this.wound
        const omnivamp = this.omnivamp;

        const formattedTime = getFormattedTime(this);
        
        // add rage blade effect
        if (this.items) {
            this.items.forEach(item => {    
                if (item.attackSpeedStacking && item.additionalAttackSpeedPerStack) {
                    let prevAttackSpeed = this.attackSpeed;
                    this.attackSpeed *= item.additionalAttackSpeedPerStack || 1;
                    console.log(`[${formattedTime}] ${this.name}'s attack speed increased from ${prevAttackSpeed.toFixed(2)} to ${this.attackSpeed.toFixed(2)}`);
                }
            });
        }

        let finalDamage = damage;    

        if(damageAmp > 0){
            finalDamage *= damageAmp;
        }
        
        let critChance = Math.random() * 100 <= critRate

        if (critChance) {
            finalDamage *= critDamageAmp;
        }
        
        if (armor > 0) {
            if(sunder){
                finalDamage = finalDamage / (1 + ((armor * 0.7) / 100));
            } else{
                finalDamage = finalDamage / (1 + (armor / 100));
            }
        }

        if (damageReduction !== 0 || durability !== 0) {
            finalDamage = Math.max(0, (finalDamage * (1 - ((damageReduction + durability) / 100))));
        }

        finalDamage = Math.round(finalDamage);
        
        if(immunity){
            finalDamage = 0
        } 

        target.takeDamage(finalDamage);
        
        // push target to current target array if not already in it
        if(this.currentTarget.length === 0 || this.currentTarget[0].id !== target.id || this.currentTarget[0].currentHp <= 0){
            this.currentTarget.push(target)
            console.log(`${this.name}'s Current Target:'`,{name: target.name, ID: target.id});

        }

        // push attacking champion to target's currentChampionsAttacking array if not already in it
        if(!target.currentChampionsAttacking.includes(this)){
            target.currentChampionsAttacking.push(this);
            console.log(`${this.name} has started attacking ${target.name}`);
            console.log(`${target.currentChampionsAttacking.map(champion => champion.name)
                .join(', ')} ${target.currentChampionsAttacking.length > 1 ? 'are' : 'is'} now attacking ${target.name}`);
        }

        // remove dead champions
        let newCurrentChampionsAttacking = this.currentChampionsAttacking.filter(champion => champion.currentHp > 0);
                        
        if(newCurrentChampionsAttacking.length < this.currentChampionsAttacking.length){
            const deadChampions = this.currentChampionsAttacking.filter(champion => !newCurrentChampionsAttacking.includes(champion));
            console.log(`${deadChampions.map(champion => champion.name).join(', ')} ${deadChampions.length > 1 ? 'have' : 'has'} died and stopped attacking ${this.name}`);
        }

        this.currentChampionsAttacking = newCurrentChampionsAttacking;

        const attackTypeMsg = critChance ? `*Crit* ${finalDamage}` : finalDamage;
        console.log(`[${formattedTime}] ${this.name} attacks ${target.name} for ${attackTypeMsg}`);
        
        if(this.currentHp < this.statsByStarLevel[this.starLevel].hp && this.omnivamp > 0){
            let omnivampHealAmount = Math.round(finalDamage * (omnivamp / 100));

            if(wound){
                omnivampHealAmount = Math.round(omnivampHealAmount * 0.67);
            }
            
            this.currentHp += omnivampHealAmount;
            console.log(`[${formattedTime}] ${this.name} healed ${omnivampHealAmount} hp`);
            this.healArray.push(omnivampHealAmount)
        }

        this.mana += this.manaPerAttack; // increment mana
        this.attacks.push(1); // increment attack counter
        this.damageArray.push(finalDamage); // track damage dealt
        
        this.lastAttackTime = this.battleTime; // update last attack time
        const attackDelay = 1 / this.attackSpeed * 100;  // calculate attack delay
        this.nextAttackTime = this.battleTime + attackDelay; // update next attack time
        
        if (this.mana >= this.abilityManaCost) {
            this.useAbility(target, this.battleTime);
        }
         
        return true; // attack was successful
    }
    
    isAlive() {
        return this.currentHp > 0;
    }

    useAbility(target: Champion, currentTime: number) {

        const ability = this.getStats().ability;
        const abilityPower = this.abilityPower;
        const damageAmp = this.damageAmp;
        const omnivamp = this.omnivamp;
        const wound = this.wound;
        let damage = ability.damage;
        let magicDamage = ability.magicDamage;
        const heal = ability.healing;

        const armor = target.armor;
        const magicResist = target.magicResist;
        const targetAbility = target.getStats().ability;
        const damageReduction = targetAbility.reduction;
        const sunder = target.sunder;
        const shred = target.shred;
        const immunity = target.immunity
        let durability = target.durability;

        const formattedTime = getFormattedTime(this);
        
        if (this.items) {
            this.items.forEach(item => {
                if(item.abilityCritStrike) {
                    this.abilityCritChance = this.attackCritChance;
                    this.abilityCritDamage = this.attackCritDamage;
                }
            });
        }
        
        const critRate = this.abilityCritChance;
        const critDamage = this.attackCritDamage;  
        
        if (this.mana >= this.abilityManaCost) {
            this.mana -= this.abilityManaCost;
            
                        
            if(abilityPower > 0){
                magicDamage = (1 + (abilityPower / 100)) * magicDamage;
            }

            if(damageAmp > 0){
                magicDamage *= damageAmp;
                damage *= damageAmp;
            }

            if (armor > 0) {
                if(sunder){
                    damage = damage / (1 + ((armor * 0.7) / 100));
                }
                damage = damage / (1 + (armor / 100));
            }

            if (magicResist > 0) {
                if(shred){
                    magicDamage = magicDamage / (1 + ((magicResist * 0.7) / 100));
                }
                magicDamage = magicDamage / (1 + (magicResist / 100));
            }

            let totalDamage = Math.round(damage + magicDamage);

            if (damageReduction !== 0 || durability !== 0) {
                totalDamage = Math.max(0, Math.round(totalDamage * (1 - ((damageReduction + durability) / 100))));
            }

            let critChance = Math.random() * 100 <= critRate;

            if (critChance) {
                totalDamage *= critDamage;
            } 
            
            if(immunity){
                totalDamage = 0
            }
            const attackTypeMsg = critChance ? `*Crit* ${totalDamage}` : totalDamage;
            console.log(`[${formattedTime}] ${this.name} uses <${this.abilityName}> on ${target.name} for ${attackTypeMsg} damage`);

            target.takeDamage(totalDamage);

            this.abilityArray.push(totalDamage);
            
            if(this.currentHp < this.statsByStarLevel[this.starLevel].hp && omnivamp > 0){
                let omnivampHealAmount = Math.round(totalDamage * (omnivamp / 100));
                
                if(!wound){
                     Math.round(omnivampHealAmount * 0.67);
                }

                this.currentHp += omnivampHealAmount;
                console.log(`[${formattedTime}] ${this.name} heals for ${omnivampHealAmount} health`);
                this.healArray.push(omnivampHealAmount);
            }

            if (heal > 0) {
                const oldHp = this.currentHp;
                this.currentHp += heal;
                
                if (this.currentHp > this.statsByStarLevel[this.starLevel].hp) {
                    this.currentHp = this.statsByStarLevel[this.starLevel].hp;
                }
                
                let actualHeal = this.currentHp - oldHp;

                if(wound){
                    actualHeal = Math.round(actualHeal * 0.67);
                }
                this.healArray.push(actualHeal);
                console.log(`[${formattedTime}] ${this.name}'s ability heals for ${actualHeal} health`);
            }
        }
    }

    displayStats(){
        const stats = this.getStats(); 
        return `
            Name: ${this.name}
            Cost: ${this.cost}
            Traits: ${this.traitsList}
            Current HP: ${this.currentHp}
            Ability: ${this.abilityName}
            Range: ${this.range}
            Armor: ${stats.armor}
            Magic Resist: ${stats.magicResist}
            Attack Speed: ${this.attackSpeed}
            Crit Chance: ${this.attackCritChance}
            Crit Damage: ${this.attackCritDamage}        
            Ability Power: ${this.abilityPower}    
            Durability: ${this.durability}
            Omnivamp: ${this.omnivamp}
            Star Level: ${this.starLevel}
            Stats:
                HP: ${stats.hp}
                Attack Damage: ${stats.attackDamage}
                Ability: 
                    Damage Reduction: ${stats.ability.reduction}
                    Healing: ${stats.ability.healing}
                    Damage: ${stats.ability.damage}
                    Magic Damage: ${stats.ability.magicDamage}
                    Mana: ${this.mana}
                    Mana per Attack: ${this.manaPerAttack}
                    Ability Mana Cost: ${this.abilityManaCost}
                    Id: ${this.id}
                    Items: ${this.items}
        `;
    }
}

// console.log(getChampionByName('Amumu').displayStats())

module.exports = { Champion };