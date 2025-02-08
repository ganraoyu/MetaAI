const { Item } = require('.././item/item.ts');

/*
cd simulators/battle-simulator/data/item
nodemon item-data.ts
*/

const basicItems = [
    new Item({
    name:'B.F. Sword',
    description: 'nothing',
    additionalAttackDamage: 10, // 10 attack damage
    }), 
    new Item({
        name:'Recurve Bow',
        description:'nothing',
        additionalAttackSpeed: 1.1, // 10% attack speed
    }),
    new Item({
        name:'Tear of the Goddess',
        description:'nothing',
        additionalStartingMana: 15, // 15 starting mana
    }), 
    new Item({
        name: 'Needlessly Large Rod',
        description: 'nothing',
        additionalAbilityPower: 10 // 10 ability power
    })
]

const combinedItems = [
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

    if(!basicItems){
        return 'Item not found'
    }
}

console.log(getItemByName('Tear of the Goddess'))

console.log(getItemByName('Guinsoo\'s Rageblade'))

module.exports = { getItemByName }
