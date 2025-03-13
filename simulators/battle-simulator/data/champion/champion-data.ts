// Importing Champion class

/*
cd simulators/battle-simulator/data/champion
nodemon champion-data.ts
*/

const champions = [
    {
        name: 'Amumu',
        cost: 1,
        shield: 0,
        traitsList: ['Automata', 'Watcher'],
        statsByStarLevel: {
            1: { 
                hp: 600, 
                attackDamage: 45, 
                armor: 35, 
                magicResist: 35,  
                ability: { reduction: 12, damage: 0, magicDamage: 10, healing: 0 },
            },
            2: { 
                hp: 1080, 
                attackDamage: 68, 
                armor: 35,  
                magicResist: 35,  
                ability: { reduction: 15, damage: 0, magicDamage: 15, healing: 0 },
            },
            3: { 
                hp: 1944, 
                attackDamage: 101, 
                armor: 50,  
                magicResist: 60,
                ability: { reduction: 25, damage: 0, magicDamage: 25, healing: 0 },
            }
        },
        attackSpeed: 0.6,
        abilityName: 'Obsolete Technology',
        abilityDescription: 'Obsolete Technology: Passive: Amumu reduces all incoming damage. Every second, emit sparks that deal magic damage to adjacent enemies.',
        range: 1,
        mana: 1,
        manaPerAttack: 0,
        abilityManaCost: 0,
        attackCritChance: 50,
        attackCritDamage: 1.40,
        abilityCritChance: 0,
        abilityCritDamage: 0,
        damageAmp: 1,
        sunder: false,
        shred: false,
        wound: false,
        burn:false,
        abilityPower: 100,
        durability: 0,
        omnivamp: 0,
        items: [],
    },
    {
        name: 'Darius',
        cost: 1,
        shield: 0,
        traitsList: ['Conqueror', 'Watcher'],
        statsByStarLevel: {
            1: { 
                hp: 600, 
                attackDamage: 55, 
                armor: 40, 
                magicResist: 40,  
                ability: { reduction: 12, damage: 242, magicDamage: 0, healing: 150 },
            },
            2: { 
                hp: 1100, 
                attackDamage: 83, 
                armor: 40,  
                magicResist: 40,  
                ability: { reduction: 0, damage: 263, magicDamage: 0, healing: 175 },
            },
            3: { 
                hp: 2100, 
                attackDamage: 124, 
                armor: 40,  
                magicResist: 40,
                ability: { reduction: 20, damage: 545, magicDamage: 0, healing: 200 },
            }
        },
        attackSpeed: 0.7,
        abilityName: 'Decimate',
        abilityDescription: 'Darius swings his axe in a powerful strike, dealing damage and healing based on missing health.',
        range: 1,
        mana: 30,
        manaPerAttack: 10,
        abilityManaCost: 70,
        attackCritChance: 25,
        attackCritDamage: 1.40,
        abilityCritChance: 0,
        abilityCritDamage: 0,
        damageAmp: 1,
        abilityPower: 100,
        sunder: false,
        shred: false,
        wound: false,
        burn: false,
        omnivamp: 0, 
        durability: 0,
        items: [],
    },
    {
        name: 'Akali',
        cost: 2,
        shield: 0,
        traitsList: ['Watcher', 'Automata'],
        statsByStarLevel: {
            1: { 
                hp: 600, 
                attackDamage: 55, 
                armor: 40, 
                magicResist: 40,  
                ability: { reduction: 0, damage: 0, magicDamage: 320, healing: 0 },
            },
            2: { 
                hp: 1100, 
                attackDamage: 83, 
                armor: 40,  
                magicResist: 40,  
                ability: { reduction: 0, damage: 0, magicDamage: 735, healing: 0 },
            },
            3: { 
                hp: 2100, 
                attackDamage: 124, 
                armor: 40,
                magicResist: 40,
                ability: { reduction: 0, damage: 0, magicDamage: 540, healing: 0 },
            }
        },
        attackSpeed: 0.6,
        abilityName: 'Shuriken Flip',
        abilityDescription: 'Akali dashes through enemies, dealing damage to each target she passes.',
        range: 1,
        mana: 0,
        manaPerAttack: 10,
        abilityManaCost: 50,
        attackCritChance: 25,
        attackCritDamage: 1.40,
        abilityCritChance: 0,
        abilityCritDamage: 0,
        damageAmp: 1,
        abilityPower: 100,
        sunder: false,
        shred: false,
        wound: false,
        durability: 0,
        omnivamp: 12,
        items: [],
    }
];

export function getChampionByName(name: string) {
    if (!name) {
        return 'Champion name cannot be empty';
    }

    const champion = champions.find(champion => champion.name === name);
    
    if (!champion) {
        return `Champion with name "${name}" not found`;
    }
    return champion;
}

// console.log(champions);

module.exports = { champions, getChampionByName };