const { getChampionByName } = require('../champion/champion-data.ts');
const { getItemByName } = require('../item/item-data.ts');
/*
cd simulators/battle-simulator/data/champion
nodemon champion.ts
*/
const { v4: uuidv4 } = require('uuid');

interface ItemProperties {
    name: string;
    description: string;
    additionalAttackDamage?: number;
    additionalAttackSpeed?: number;
    additionalManaPerAttack?: number;
    additionalCritDamage?: number;
    additionalCritChance?: number;
    additionalDamageAmp?: number;
    reducedMaxMana?: number;
    additionalStartingMana?: number;
    additionalArmor?: number;
    additionalMagicResist?: number;
    additionalHealth?: number;
    additionalAbilityPower?: number;
    additionalOmniVamp?: number;
    additionalDurability?: number;
    additionalAttackRange?: number;
    sunder?: number;
    shred?: number;
    sunderRadius?: number;
    shredRadius?: number;
    attackSpeedStacking?: boolean;
    additionalAttackSpeedPerStack?: number;
    abilityCritStrike?: boolean;
}

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
    omnivamp: number;
    durability: number;
    items: ItemProperties[];
    currentHp: number;
    armor: number;
    magicResist: number;
    gameTime: number;
    attacks: number[];
    timeStep: number;
    id: string;
    damageArray: number[];
    abilityArray: number[];
    healArray: number[];

    constructor(
        name: string,
        cost: number, 
        traitsList: string[],
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
        abilityPower: number,  
        omnivamp: number,
        durability: number,
        items: ItemProperties[] = [],
        starLevel?: number 

    ) {
        this.name = name;
        this.cost = cost;
        this.traitsList = traitsList;
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
        this.damageArray = [];
        this.abilityArray = [];
        this.healArray = [];
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
        this.currentHp -= damage;
        if (this.currentHp <= 0) {
            this.currentHp = 0;
            console.log(`${this.name} has died.`);
        }
    }

    attack(target: Champion) {
        // Time step for the game loop
  
        this.gameTime += this.timeStep; // Increment the game time by the time step
        
        let championAttackTime = 1 / this.attackSpeed;
    
        const ability = target.getStats().ability;
        const damageReduction = ability.reduction;
        const damage = this.getStats().attackDamage;
        const armor = target.getStats().armor; 
        const critRate = this.attackCritChance;
        const critDamageAmp = this.attackCritDamage;
    
        if(this.attacks.length > 0){
            championAttackTime = this.attacks.length * ( 1 / this.attackSpeed );
        } else {
            championAttackTime = 1 / this.attackSpeed;
        }
    
        if (this.items) {
            this.items.forEach(item => {
                if (item.attackSpeedStacking && item.additionalAttackSpeedPerStack) {
                    this.attackSpeed *= item.additionalAttackSpeedPerStack;
                    console.log(`${this.name}'s attack speed increased to ${this.attackSpeed.toFixed(2)}`);
                }
            });
        } else {
            this.attackSpeed = this.attackSpeed;
            console.log('attackSpeed', this.attackSpeed);
        }
      
        if (this.gameTime >= 1 / this.attackSpeed) {

            // Reset gameTime for the next attack interval
            this.gameTime = 0;

            console.log('attackSpeed', this.attackSpeed);
    
            if (damageReduction !== 0) {
                // Calculate damage with damage reduction
                let reducedDamage = damage - (damage * damageReduction / 100);
                reducedDamage = Math.max(0, reducedDamage); // Ensure no negative damage
                
                if(armor > 0){
                    let physicalDamageTaken = reducedDamage - (reducedDamage * armor / 100);
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
                }
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
                    return true; 
                } else {
                    let normalDamage = Math.round(physicalDamageTaken);
                    target.takeDamage(normalDamage);
                    console.log(`[${championAttackTime.toFixed(2)}s] ${this.name} attacks ${target.name} for ${normalDamage}`);
                    this.mana += this.manaPerAttack;
                    this.attacks.push(1);
                    this.damageArray.push(normalDamage);
                    console.log(`${this.name}'s damage array`, this.damageArray);
                    return true;
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
                    return true; 
                } else {
                    let normalDamage = Math.round(damage);
                    target.takeDamage(normalDamage);
                    console.log(`[${championAttackTime.toFixed(2)}s] ${this.name} attacks ${target.name} for ${normalDamage}`);
                    this.mana += this.manaPerAttack;
                    this.attacks.push(1);
                    this.damageArray.push(normalDamage);
                    console.log(`${this.name}'s damage array`, this.damageArray);
                    return true; 
                }
            }
        }

        return false; // No attack occurred
    }
    
    isAlive() {
        return this.currentHp > 0;
    }

    useAbility(target: Champion) {
        let championAttackTime = 1 / this.attackSpeed;
    
        const ability = this.getStats().ability;
        const abilityReduction = this.getStats().ability;
        const damage = ability.damage;
        const magicDamage = ability.magicDamage;
        const damageReduction = abilityReduction.reduction;
        const heal = ability.healing;
        const armor = target.armor;
        const magicResist = target.magicResist;
    
        if (this.attacks.length > 0) {
            championAttackTime = this.attacks.length * (1 / this.attackSpeed);
        } else {
            championAttackTime = 1 / this.attackSpeed;
        }

        if (this.items) {
            this.items.forEach(item => {
                if(item.abilityCritStrike) {
                    this.abilityCritChance = this.attackCritChance
                    this.abilityCritDamage = this.attackCritDamage
                }
            });
        }

        const critRate = this.abilityCritChance;
        const critDamage = this.attackCritDamage;  
        
        if (this.mana >= this.abilityManaCost) {
            this.mana -= this.abilityManaCost;
            if (damageReduction === 0) {
                if (armor > 0 || magicResist > 0) {
                    if (Math.random() * 100 <= critRate) {                   
                        let physicalDamageTaken = damage - ((damage) * armor / 100);
                        let magicDamageTaken = magicDamage - ((magicDamage) * magicResist / 100);                    
                        const totalCritDamage = (Math.round(physicalDamageTaken + magicDamageTaken) * critDamage); 
                        target.takeDamage(totalCritDamage);
    
                        console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability does ${totalCritDamage} Crit damage`);                   
                        console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability heals for ${heal} health`);
    
                        this.abilityArray.push(totalCritDamage);
                        console.log(`${this.name}'s ability array`, this.abilityArray);
                    } else {
                        let physicalDamageTaken = damage - ((damage) * armor / 100);
                        let magicDamageTaken = magicDamage - ((magicDamage) * magicResist / 100);
                        const totalDamage = (Math.round(physicalDamageTaken + magicDamageTaken));
                        target.takeDamage(totalDamage);
    
                        console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability does ${totalDamage} damage`);
                        console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability heals for ${heal} health`);
    
                        this.abilityArray.push(totalDamage);
                        console.log(`${this.name}'s ability array`, this.abilityArray);
                    }
                }
            }
    
            if (damageReduction !== 0) {
                if (armor > 0 || magicResist > 0) {
                    if (Math.random() * 100 <= critRate) {
                        let physicalDamageTaken = damage - ((damage) * armor / 100);
                        let magicDamageTaken = magicDamage - ((magicDamage) * magicResist / 100);
                        const totalCritDamage = (Math.round(physicalDamageTaken + magicDamageTaken) * critDamage); 
                        const totalDamage = (Math.round(totalCritDamage - (totalCritDamage * damageReduction / 100)));
                        target.takeDamage(totalDamage);
    
                        console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability does ${totalDamage} Crit damage`);
                        console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability heals for ${heal} health`);
    
                        this.abilityArray.push(totalDamage);
                        console.log(`${this.name}'s ability array`, this.abilityArray);
                    } else {
                        let physicalDamageTaken = damage - ((damage) * armor / 100);
                        let magicDamageTaken = magicDamage - ((magicDamage) * magicResist / 100);
                        const totalDamage = (Math.round((physicalDamageTaken + magicDamageTaken) - ((physicalDamageTaken + magicDamageTaken) * damageReduction / 100)));
                        target.takeDamage(totalDamage);
    
                        console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability does ${totalDamage} damage`);
                        console.log(`[${championAttackTime.toFixed(2)}s] ${this.name}'s ability heals for ${heal} health`);
    
                        this.abilityArray.push(totalDamage);
                        console.log(`${this.name}'s ability array`, this.abilityArray);
                    }
                }
            }

            if (heal > 0) {
                this.currentHp += heal;
                if(this.currentHp > this.statsByStarLevel[this.starLevel].hp) {
                    this.currentHp = this.statsByStarLevel[this.starLevel].hp;
                }
                this.healArray.push(heal);
                console.log(`${this.name}'s healing array`, this.healArray);
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