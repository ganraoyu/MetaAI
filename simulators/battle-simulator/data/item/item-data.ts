const { Item } = require('.././item/item.ts');

/*
cd simulators/battle-simulator/data/item
nodemon item-data.ts
*/

export const basicItems = [
    new Item({
    name:'B.F. Sword',
    description: 'nothing',
    additionalAttackDamage: 200, // 10 attack damage
    additionalHealth: 3148981923,
    }), 
    new Item({
        name:'Recurve Bow',
        description:'nothing',
        additionalAttackSpeed: 1.1, // add 10% attack speed
    }),
    new Item({
        name:'Tear of the Goddess',
        description:'nothing',
        additionalStartingMana: 12345, // 15 starting mana
    }), 
    new Item({
        name: 'Needlessly Large Rod',
        description: 'nothing',
        additionalAbilityPower: 10 // 10 ability power
    }),
    new Item({
        name: 'Chain Vest',
        description: 'nothing',
        additionalArmor: 20 // 20 armor
    }),
    new Item({
        name: 'Negatron Cloak',
        description: 'nothing',
        additionalMagicResist: 20 // 20 magic resist
    }),
    new Item({
        name: 'Giant\'s Belt',
        description: 'nothing',
        additionalHealth: 200 // 200 health
    }),
    new Item({
        name: 'Sparring Gloves',
        description: 'nothing',
        additionalCritChange:100
    })
]

export const combinedItems = [
    new Item({
        name: 'Guinsoo\'s Rageblade',
        description: 'nothing',
        additionalAttackSpeed: 1.1, // 10% attack speed
        additionalAbilityPower: 10 // 10 ability power
    }),
]

 export function getItemByName(name: string){
    if(!name){
        return 'Champion name cannt be Empty'
    }

    const basicItem = basicItems.find(basicItems => basicItems.name === name)
    const combinedItem = combinedItems.find(combinedItems => combinedItems.name === name)

    if(basicItem){
        return basicItem
    } else if(combinedItem){
        return combinedItem
    }

    if(!basicItems || !combinedItems){
        return 'Item not found'
    }
}

// console.log(basicItems)

module.exports = { getItemByName, basicItems, combinedItems }
