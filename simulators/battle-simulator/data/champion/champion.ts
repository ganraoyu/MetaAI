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
}

type StatsByStarLevel = {
    [starLevel: number]: StarLevelStats;
};

class Champion {
    name: string;
    cost: number;
    traitsList: string[];
    shield: number;
    statsByStarLevel: StatsByStarLevel;
    attackSpeed: number;
    abilityName: string;
    range: number;
    starLevel: number;
    mana: number;
    manaPerAttack: number;
    abilityManaCost: number;
    attackCritChance: number;
    attackCritDamage: number;    
    abilityPower: number;
    abilityCritChance: number;
    abilityCritDamage: number;
    damageAmp: number;
    omnivamp: number;
    durability: number;
    items: typeof ItemProps[];
    currentHp: number;
    armor: number;
    magicResist: number;
    gameTime: number;
    attacks: number[];
    timeStep: number;
    id: string;
    damageTakenArray: number[];
    shieldDamageTakenAray: number[];
    damageArray: number[];
    abilityArray: number[];
    healArray: number[];
    lastAttackTime: number = 0;
    nextAttackTime: number = 0;
    nextAttackReady: boolean = true;
    battleTime: number = 0;

    constructor(
        name: string,
        cost: number, 
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
        abilityPower: number,  
        omnivamp: number,
        durability: number,
        items: typeof ItemProps[] = [],
        starLevel?: number 

    ) {
        this.name = name;
        this.cost = cost;
        this.traitsList = traitsList;
        this.shield = shield;
        this.statsByStarLevel = statsByStarLevel;
        this.attackSpeed = attackSpeed;
        this.abilityName = abilityName;
        this.range = range;
        this.starLevel = starLevel ?? 1;
        this.mana = mana;
        this.manaPerAttack = manaPerAttack;
        this.abilityManaCost = abilityManaCost;
        this.attackCritChance = attackCritChance;
        this.attackCritDamage = attackCritDamage;     
        this.abilityCritChance = abilityCritChance;   
        this.abilityCritDamage = abilityCritDamage;
        this.damageAmp = damageAmp;
        this.abilityPower = abilityPower;
        this.omnivamp = omnivamp;
        this.durability = durability;
        this.items = items;
        this.currentHp = this.statsByStarLevel[this.starLevel].hp;
        this.armor = this.statsByStarLevel[this.starLevel].armor;
        this.magicResist = this.statsByStarLevel[this.starLevel].magicResist;
        this.gameTime = 0; 
        this.attacks = [1];
        this.timeStep = 0.1;
        this.id = uuidv4();
        this.damageTakenArray = [];
        this.shieldDamageTakenAray = [];
        this.damageArray = [];
        this.abilityArray = [];
        this.healArray = [];
        this.lastAttackTime = 0;
        const firstAttackDelay = 1 / this.attackSpeed * 100;
        this.nextAttackTime = firstAttackDelay; 
        this.nextAttackReady = false;
        this.battleTime = 0;
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
    
        const ability = target.getStats().ability;
        const damageReduction = ability.reduction;
        const damage = this.getStats().attackDamage;
        const armor = target.getStats().armor; 
        const critRate = this.attackCritChance;
        const critDamageAmp = this.attackCritDamage;
        const damageAmp = this.damageAmp
    
        const mins = Math.floor(this.battleTime / 6000);
        const secs = Math.floor((this.battleTime % 6000) / 100);
        const cents = this.battleTime % 100;
        const formattedTime = `${mins}:${secs.toString().padStart(2, '0')}:${cents.toString().padStart(2, '0')}`;
        
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

        if (armor > 0) {
            finalDamage = finalDamage / (1 + (armor / 100));
        }

        if (damageReduction !== 0) {
            finalDamage = finalDamage * (1 - damageReduction / 100);
        }

        if(damageAmp > 0){
            finalDamage *= damageAmp;
        }
        
        let critChance = Math.random() * 100 <= critRate
        if (critChance) {
            finalDamage *= critDamageAmp;
        }
        
        finalDamage = Math.round(finalDamage);
        
        target.takeDamage(finalDamage);

        const attackTypeMsg = critChance ? `*Crit* ${finalDamage}` : finalDamage;
        console.log(`[${formattedTime}] ${this.name} attacks ${target.name} for ${attackTypeMsg}`);
        
        this.mana += this.manaPerAttack;
        this.attacks.push(1);
        this.damageArray.push(finalDamage);
        
        this.lastAttackTime = this.battleTime;
        const attackDelay = 1 / this.attackSpeed * 100;  
        this.nextAttackTime = this.battleTime + attackDelay;
        
        if (this.mana >= this.abilityManaCost) {
            this.useAbility(target, this.battleTime);
        }
        
        return true; // attack was successful
    }
    
    isAlive() {
        return this.currentHp > 0;
    }

    useAbility(target: Champion, currentTime: number) {
        const mins = Math.floor(currentTime / 6000);
        const secs = Math.floor((currentTime % 6000) / 100);
        const cents = currentTime % 100;
        const formattedTime = `${mins}:${secs.toString().padStart(2, '0')}:${cents.toString().padStart(2, '0')}`;
        
        const ability = this.getStats().ability;
        const damage = ability.damage;
        const magicDamage = ability.magicDamage;
        const damageReduction = ability.reduction;
        const heal = ability.healing;
        const armor = target.armor;
        const magicResist = target.magicResist;
        
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
            
            let physicalDamageTaken = damage - ((damage) * armor / 100);
            let magicDamageTaken = magicDamage - ((magicDamage) * magicResist / 100);
            
            let totalDamage = physicalDamageTaken + magicDamageTaken;

            if (damageReduction !== 0) {
                totalDamage = Math.round(totalDamage * (1 - damageReduction / 100));
            }

            if (Math.random() * 100 <= critRate) {
                totalDamage = totalDamage * critDamage;
            } 
            
            const attackTypeMsg = Math.random() * 100 <= critRate ? `*Crit* ${totalDamage}` : totalDamage;
            console.log(`[${formattedTime}] ${this.name} uses <${this.abilityName}> on ${target.name} for ${attackTypeMsg} damage`);

            target.takeDamage(totalDamage);
            this.abilityArray.push(totalDamage);
            
            if (heal > 0) {
                const oldHp = this.currentHp;
                this.currentHp += heal;
                
                if (this.currentHp > this.statsByStarLevel[this.starLevel].hp) {
                    this.currentHp = this.statsByStarLevel[this.starLevel].hp;
                }
                
                const actualHeal = this.currentHp - oldHp;
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