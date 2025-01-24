const { Champion } = require('.././champion/champion.js');

/*
cd simulators/battle-simulator/data/champion
nodemon champion-data.js
*/

const champions = [
    new Champion(
        'Amumu',
        1, // cost
        'Automata, Watcher', // traits 
        {
            1: { 
                hp: 600, 
                attackDamage: 45, 
                armor: 35, 
                magicResist: 35,  
                ability: { reduction: 12, damage: 0, magicDamage: 10, healing: 0},
            },
            2: { 
                hp: 1080, 
                attackDamage: 68, 
                armor: 35,  
                magicResist: 35,  
                ability: { reduction: 15, damage: 0 , magicDamage: 15, healing: 0 },
            },
            3: { 
                hp: 1944, 
                attackDamage: 101, 
                armor: 50,  
                magicResist: 60,
                ability: { reduction: 25, damage: 0, magicDamage: 25, healing: 0 },
            }
        },
        0.6, // attack speed
        'Obsolete Technology: Passive: Amumu reduces all incoming damage. Every second, emit sparks that deal magic damage to adjacent enemies. ', // ability name
        1, // range
        1, // mana
        0, // mana per attack
        0, // ability mana cost
        50, // attack crit chance
        1.40, // attack crit damage
        []
    ),  
    new Champion(
        'Darius',
        1, // cost
        'Conqueror, Watcher', // traits 
        {
            1: { 
                hp: 600, 
                attackDamage: 55, 
                armor: 40, 
                magicResist: 40,  
                ability: { reduction: 12, damage: 110, magicDamage: 10,  healing: 150 },
            },
            2: { 
                hp: 1100, 
                attackDamage: 83, 
                armor: 40,  
                magicResist: 40,  
                ability: { reduction: 15, damage: 166, magicDamage: 36, healing: 175 },
            },
            3: { 
                hp: 2100, 
                attackDamage: 124, 
                armor: 40,  
                magicResist: 40,
                ability: { reduction: 20, damage: 248, magicDamage: 540, healing: 200 },
            }
        },
        0.7, // attack speed
        'Obsolete Technology: Passive: Amumu reduces all incoming damage. Every second, emit sparks that deal magic damage to adjacent enemies. ', // ability name
        1, // range
        30, // mana
        10, // mana per attack
        70, // ability mana cost
        25, // attack crit chance
        1.40, // attack crit damage
        []
    ), 
    new Champion(
        'Akali',
        1, // cost
        'Conqueror, Watcher', // traits 
        {
            1: { 
                hp: 600, 
                attackDamage: 55, 
                armor: 40, 
                magicResist: 40,  
                ability: { reduction: 12, damage: 0, magicDamage: 10, healing: 0 },
            },
            2: { 
                hp: 1100, 
                attackDamage: 83, 
                armor: 40,  
                magicResist: 40,  
                ability: { reduction: 15, damage: 120, magicDamage: 360, healing: 0 },
            },
            3: { 
                hp: 2100, 
                attackDamage: 124, 
                armor: 40,  
                magicResist: 40,
                ability: { reduction: 20, damage: 180, magicDamage: 540, healing: 0 },
            }
        },
        1, // attack speed
        'Obsolete Technology: Passive: Amumu reduces all incoming damage. Every second, emit sparks that deal magic damage to adjacent enemies. ', // ability name
        1, // range
        60, // mana
        10, // mana per attack
        70, // ability mana cost
        25, // attack crit chance
        1.40, // attack crit damage
        []
    ), 
];

function getChampionByName(name) {
    if (!name) {
        return 'Champion name cannot be empty';
    }
    const champion = champions.find(champion => champion.name === name);
    if (!champion) {
        return `Champion with name "${name}" not found`;
    }
    return champion;
}

console.log(getChampionByName('Amumu'))
//console.log(getChampionByName('Amumu'))
module.exports = { champions, getChampionByName };