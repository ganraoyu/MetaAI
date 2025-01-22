/*
cd simulators/battle-simulator/data/champion
nodemon champion.js
*/
const { v4: uuidv4 } = require('uuid');

class Champion {
    constructor(name, cost, traitsList, statsByStarLevel, attackSpeed, abilityName, range, mana, 
        manaPerAttack, abilityManaCost, attackCritChance, attackCritDamage, items, lastAttackTime ) {

        this.name = name;
        this.cost = cost;
        this.traitsList = traitsList;
        this.statsByStarLevel = statsByStarLevel;
        this.attackSpeed = attackSpeed;
        this.abilityName = abilityName;
        this.range = range;
        this.starLevel = 1;
        this.mana = mana;
        this.manaPerAttack = manaPerAttack;
        this.abilityManaCost = abilityManaCost;
        this.attackCritChance = attackCritChance;
        this.attackCritDamage = attackCritDamage;       
        this.items = items
        this.currentHp = this.statsByStarLevel[this.starLevel].hp;
        this.armor = this.statsByStarLevel[this.starLevel].armor;
        this.magicResist = this.statsByStarLevel[this.starLevel].magicResist; // Initialize current HP
        this.timeBetweenAttacks = 1 / this.attackSpeed;
        this.timeUntilAttack = 1 / this.attackSpeed;
        this.lastAttackTime = lastAttackTime// Initialize last attack time
        this.gameTime = 0

        this.id = uuidv4();
    }

    getStats() {
        return this.statsByStarLevel[this.starLevel];
    }

    setStarLevel(starLevel) {
        if (this.statsByStarLevel[starLevel]) {
            this.starLevel = starLevel;
            this.currentHp = this.statsByStarLevel[starLevel].hp; // Update current HP
        } else {
            console.log(`Invalid star level: ${starLevel} for ${this.name}`);
        }
    }

    takeDamage(damage) {
        this.currentHp -= damage;
        if (this.currentHp <= 0) {
            this.currentHp = 0;
            console.log(`${this.name} has died.`);
        }
    }

    attack(target) {
        const currentTime = this.gameTime; // Get the current simulated game time
        const timeSinceLastAttack = currentTime - this.lastAttackTime; // Time elapsed since the last attack

        const ability = target.getStats().ability;
        const damageReduction = ability.reduction;
        const damage = this.getStats().attackDamage;
        const armor = target.armor; 
        const critRate = this.attackCritChance;
        const critDamageAmp = this.attackCritDamage;

        if (timeSinceLastAttack >= this.timeBetweenAttacks) {
            if (damageReduction !== 0) {
                // Calculate damage with damage reduction
                let reducedDamage = damage - (damage * damageReduction / 100);
                reducedDamage = Math.max(0, reducedDamage); // Ensure no negative damage
                
                if (Math.random() * 100 <= critRate) {
                    let critDamage = Math.round(reducedDamage * critDamageAmp);
                    target.takeDamage(critDamage);
                    console.log(`[${currentTime.toFixed(2)}s] ${this.name} attacks ${target.name} for Crit ${critDamage}`);
                } else {
                    let normalDamage = Math.round(reducedDamage);
                    target.takeDamage(normalDamage);
                    console.log(`[${currentTime.toFixed(2)}s] ${this.name} attacks ${target.name} for ${normalDamage}`);
                }

                this.lastAttackTime = this.gameTime;
                this.mana += this.manaPerAttack;
                return;
            }
        }
    
        // If damage reduction is 0, proceed with checking armor
            if (armor > 0) {
                // Calculate damage with armor
                let physicalDamageTaken = damage - (damage * armor / 100);
                physicalDamageTaken = Math.max(0, physicalDamageTaken); // Ensure no negative damage
            
                if (Math.random() * 100 <= critRate) {
                    let critDamage = Math.round(physicalDamageTaken * critDamageAmp);
                    target.takeDamage(critDamage);
                    console.log(`[${currentTime.toFixed(2)}s] ${this.name} attacks ${target.name} for Crit ${critDamage}`);
                } else {
                    let normalDamage = Math.round(physicalDamageTaken);
                    target.takeDamage(normalDamage);
                    console.log(`[${currentTime.toFixed(2)}s] ${this.name} attacks ${target.name} for ${normalDamage}`);
                }
            } else {
                // No armor, full damage
                if (Math.random() * 100 <= critRate) {
                    let critDamage = Math.round(damage * critDamageAmp);
                    target.takeDamage(critDamage);
                    console.log(`[${this.gameTime.toFixed(2)}s] ${this.name} attacks ${target.name} for Crit ${critDamage}`);
                } else {
                    let normalDamage = Math.round(damage);
                    target.takeDamage(normalDamage);
                    console.log(`[${currentTime.toFixed(2)}s] ${this.name} attacks ${target.name} for ${normalDamage}`);
                }
            }
            
            this.lastAttackTime = currentTime;
            this.mana += this.manaPerAttack;
        }
    
    isAlive() {
        return this.currentHp > 0;
    }

    useAbility(target) {

        const currentTime = this.gameTime;

        const ability = this.getStats().ability;
        const abilityReduction = this.getStats().ability;
        const damage = ability.damage;
        const magicDamage = ability.magicDamage;
        const damageReduction = abilityReduction.reduction
        const heal = ability.healing;
        const armor = target.armor;
        const magicResist = target.magicResist;
    

        // calculate armor/magic resist first then reduction

        if(this.mana >= this.abilityManaCost) {
            this.mana -= this.abilityManaCost;
            if(damageReduction === 0 ){
                if(armor > 0 || magicResist > 0){
                    let physicalDamageTaken = damage - ((damage) * armor / 100);
                    let magicDamageTaken = magicDamage - ((magicDamage) * magicResist / 100);                    
                    target.takeDamage(Math.round(physicalDamageTaken + magicDamageTaken)); 
                    console.log(`[${currentTime.toFixed(2)}s] ${this.name}'s ability does ${Math.round(physicalDamageTaken + magicDamageTaken)} damage`);                   
                } else {
                    target.takeDamage(Math.round(damage + magicDamage));
                    console.log(`[${currentTime.toFixed(2)}s] ${this.name}'s ability does ${Math.round(damage + magicDamage)} damage`);
                }
            } else {
                target.takeDamage(Math.round((damage + magicDamage) - ((damage + magicDamage) * damageReduction / 100)));
                console.log(`[${currentTime.toFixed(2)}s] ${this.name}'s ability does ${Math.round((damage + magicDamage) - ((damage + magicDamage) * damageReduction / 100))} damage`);
            }
            this.currentHp += heal; 
        }
    }

    displayStats() {
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