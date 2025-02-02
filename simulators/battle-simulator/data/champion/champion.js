/*
cd simulators/battle-simulator/data/champion
nodemon champion.js
*/
const { v4: uuidv4 } = require('uuid');

class Champion {
    constructor(name, cost, traitsList, statsByStarLevel, attackSpeed, abilityName, range, mana, 
        manaPerAttack, abilityManaCost, attackCritChance, attackCritDamage, items) {
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
        this.items = items;
        this.currentHp = this.statsByStarLevel[this.starLevel].hp;
        this.armor = this.statsByStarLevel[this.starLevel].armor;
        this.magicResist = this.statsByStarLevel[this.starLevel].magicResist; // Initialize current HP
        this.gameTime = 0;
        this.attacks = [1];
        this.timeStep = 0.1;
        this.id = uuidv4();
        this.damageArray = [];
        this.abilityArray = [];
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
        // Time step for the game loop
        this.gameTime += this.timeStep; // Increment the game time by the time step
        
        let championAttackTime = 1 / this.attackSpeed;
    
        const ability = target.getStats().ability;
        const damageReduction = ability.reduction;
        const damage = this.getStats().attackDamage;
        const armor = target.armor; 
        const critRate = this.attackCritChance;
        const critDamageAmp = this.attackCritDamage;
    
        if(this.attacks.length > 0){
            championAttackTime = this.attacks.length * ( 1 / this.attackSpeed );
        } else {
            championAttackTime = 1 / this.attackSpeed;
        }
    
        if (this.gameTime >= 1 / this.attackSpeed) {
            // Reset gameTime for the next attack interval
            this.gameTime = 0;
    
            if (damageReduction !== 0) {
                // Calculate damage with damage reduction
                let reducedDamage = damage - (damage * damageReduction / 100);
                reducedDamage = Math.max(0, reducedDamage); // Ensure no negative damage
                
                if (Math.random() * 100 <= critRate) {
                    let critDamage = Math.round(reducedDamage * critDamageAmp);
                    target.takeDamage(critDamage);
                    console.log(`[${championAttackTime.toFixed(2)}s] ${this.name} attacks ${target.name} for Crit ${critDamage}`);
                    this.mana += this.manaPerAttack;
                    this.attacks.push(1);
                    this.damageArray.push(critDamage)
                    console.log(`${this.name}'s damage array`, this.damageArray);
                    return true; // Attack occurred
                } else {
                    let normalDamage = Math.round(reducedDamage);
                    target.takeDamage(normalDamage);
                    console.log(`[${championAttackTime.toFixed(2)}s] ${this.name} attacks ${target.name} for ${normalDamage}`);
                    this.mana += this.manaPerAttack;
                    this.attacks.push(1);
                    this.damageArray.push(normalDamage);
                    console.log(`${this.name}'s damage array`, this.damageArray);
                    return true; // Attack occurred
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
                    console.log(`[${championAttackTime.toFixed(2)}s] ${this.name} attacks ${target.name} for Crit ${critDamage}`);
                    this.mana += this.manaPerAttack;
                    this.attacks.push(1);
                    this.damageArray.push(critDamage);
                    console.log(`${this.name}'s damage array`, this.damageArray);
                    return true; // Attack occurred
                } else {
                    let normalDamage = Math.round(physicalDamageTaken);
                    target.takeDamage(normalDamage);
                    console.log(`[${championAttackTime.toFixed(2)}s] ${this.name} attacks ${target.name} for ${normalDamage}`);
                    this.mana += this.manaPerAttack;
                    this.attacks.push(1);
                    this.damageArray.push(normalDamage);
                    console.log(`${this.name}'s damage array`, this.damageArray);
                    return true; // Attack occurred
                }
            } else {
                // No armor, full damage
                if (Math.random() * 100 <= critRate) {
                    let critDamage = Math.round(damage * critDamageAmp);
                    target.takeDamage(critDamage);
                    console.log(`[${championAttackTime.toFixed(2)}s] ${this.name} attacks ${target.name} for Crit ${critDamage}`);
                    this.mana += this.manaPerAttack;
                    this.attacks.push(1);
                    this.damageArray.push(critDamage);
                    console.log(`${this.name}'s damage array`, this.damageArray);
                    return true; // Attack occurred
                } else {
                    let normalDamage = Math.round(damage);
                    target.takeDamage(normalDamage);
                    console.log(`[${championAttackTime.toFixed(2)}s] ${this.name} attacks ${target.name} for ${normalDamage}`);
                    this.mana += this.manaPerAttack;
                    this.attacks.push(1);
                    this.damageArray.push(normalDamage);
                    console.log(`${this.name}'s damage array`, this.damageArray);
                    return true; // Attack occurred
                }
            }
        }

        return false; // No attack occurred
    }
    
    isAlive() {
        return this.currentHp > 0;
    }

    useAbility(target) {

        let championAttackTime = 1 / this.attackSpeed;

        const ability = this.getStats().ability;
        const abilityReduction = this.getStats().ability;
        const damage = ability.damage;
        const magicDamage = ability.magicDamage;
        const damageReduction = abilityReduction.reduction
        const heal = ability.healing;
        const armor = target.armor;
        const magicResist = target.magicResist;
    
        if(this.attacks.length > 0){
            championAttackTime = (this.attacks.length * ( 1 / this.attackSpeed )) - ( 1 / this.attackSpeed );
        } else {
            championAttackTime = 1 / this.attackSpeed;
        }

        // calculate armor/magic resist first then reduction

        if(this.mana >= this.abilityManaCost) {
            this.mana -= this.abilityManaCost;
            if(damageReduction === 0 ){
                if(armor > 0 || magicResist > 0){
                    let physicalDamageTaken = damage - ((damage) * armor / 100);
                    let magicDamageTaken = magicDamage - ((magicDamage) * magicResist / 100);                    
                    const totalDamage = (Math.round(physicalDamageTaken + magicDamageTaken)); 
                    target.takeDamage(totalDamage);

                    console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability does ${Math.round(physicalDamageTaken + magicDamageTaken)} damage`);                   
                    console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability heals for ${heal} health`);

                    this.abilityArray.push(totalDamage);
                    console.log(this.abilityArray);
                } else {
                    const totalDamage = (Math.round(damage + magicDamage));
                    target.takeDamage(totalDamage);

                    console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability does ${Math.round(damage + magicDamage)} damage`);
                    console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability heals for ${heal} health`);

                    this.abilityArray.push(totalDamage);
                    console.log(this.abilityArray);
                }
            } else {
                const totalDamage = (Math.round((damage + magicDamage) - ((damage + magicDamage) * damageReduction / 100)));
                target.takeDamage(totalDamage)
                console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability does ${Math.round((damage + magicDamage) - ((damage + magicDamage) * damageReduction / 100))} damage`);
                console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability heals for ${heal} health`);

                this.abilityArray.push(totalDamage);
                console.log(this.abilityArray);
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