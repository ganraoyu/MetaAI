const { Item } = require('.././item/item.ts');

/*
cd simulators/battle-simulator/data/item
nodemon item-data.ts
*/

export const basicItems = [
    new Item({
    name:'B.F. Sword',
    description: 'Grants 10% bonus Attack Damage.',
    additionalAttackDamage: 1.1, // 10% attack damag
    }), 
    new Item({
        name:'Recurve Bow',
        description:'Increases Attack Speed by 10%.',
        additionalAttackSpeed: 1.1 // 10% attack speed
    }),
    new Item({
        name:'Tear of the Goddess',
        description:'Provides 15 bonus Starting Mana',
        additionalStartingMana: 15, // 15 starting mana
    }), 
    new Item({
        name: 'Needlessly Large Rod',
        description: 'Increases Ability Power by 10.',
        additionalAbilityPower: 10 // 10 ability power
    }),
    new Item({
        name: 'Chain Vest',
        description: 'Grants 20 Armor',
        additionalArmor: 20 // 20 armor
    }),
    new Item({
        name: 'Negatron Cloak',
        description: 'Grants 20 Magic Resist',
        additionalMagicResist: 20 // 20 magic resist
    }),
    new Item({
        name: 'Giant\'s Belt',
        description: 'Increases Health by 200',
        additionalHealth: 200 // 200 health
    }),
    new Item({
        name: 'Sparring Gloves',
        description: 'Increases Critical Chance by 15',
        additionalCritChange: 1.2 // 20% crit chance
    }),
    new Item({
        name: 'Spatula',
        description: 'It must do something...',
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
