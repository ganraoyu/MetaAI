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
        additionalAbilityPower: 10 // 10 more ability power
    }),
    new Item({
        name: 'Chain Vest',
        description: 'Grants 20 Armor',
        additionalArmor: 20 // 20 more armor
    }),
    new Item({
        name: 'Negatron Cloak',
        description: 'Grants 20 Magic Resist',
        additionalMagicResist: 20 // 20 more magic resist
    }),
    new Item({
        name: 'Giant\'s Belt',
        description: 'Increases Health by 200',
        additionalHealth: 200 // 200 more health
    }),
    new Item({
        name: 'Sparring Gloves',
        description: 'Increases Critical Chance by 15',
        additionalCritChance: 0.2 // 20% crit chance
    }),
    new Item({
        name: 'Spatula',
        description: 'It must do something...',
    })
]

export const combinedItems = [
    new Item({
        name: 'Guinsoo\'s Rageblade',
        description: 'Attacks grant 5% Attack Speed. Stacks infinitely.',
        additionalAttackSpeed: 1.1, // 10% attack speed
        additionalAbilityPower: 10, // 10 ability power  
        attackSpeedStacking: true,
        additionalAttackSpeedPerStack: 1.05 //5% attack speed per stack
    }),
    new Item({
        name: 'Infinity Edge',
        description: 'Ability can critically strike. If the holder already has a critical strike, gain 10% critical strike damage instead.',        
        abilityCritStrike: true,
        additionalAttackDamage: 1.35, // 35% more attack damage
        additionalCritChance: 35, // 35% crit chance
    }),
    new Item({
        name:'Jeweled Gauntlet',
        description: 'Ability can critically strike. If the holder already has a critical strike, gain 10% critical strike damage instead.',        
        abilityCritStrike: true,
        additionalAbilityPower: 35, // 35 base ability power
        additionalCritChance: 35, // 35% crit chance
    }),
    new Item({
        name: 'Last Whisper',
        description: 'nothing',
        sunder: true, 
        sunderRadius: 3, // 3 hexes
        additionalAttackDamage: 1.15, // 15% more attack damage
        additionalAttackSpeed: 1.2, // 20% more attack speed
        additionalCritChance: 20 // 20% crit chance
    }),
    new Item({
        name: 'Warmog\'s Armor',
        description: 'nothing',
        additionalHealth: 600, // 600 more health
        additionalPercentageHealth: 1.12, // 50% more health
    }),
    new Item({
        name: 'Spear of Shojin',
        description: 'nothing',
        additionalAttackSpeed: 1.15, // 15% more attack speed
        additionalStartingMana: 15, // 15 starting mana
        additionalManaPerAttack: 5, // 5 mana per attack
        additionalAbilityPower: 15, // 15 ability power
    }),
    new Item({
        name: 'Death Blade',
        decription: 'nothing',
        additionalAttackDamage: 1.3, // 30% more attack damage
        additionalDamageAmp: 1.1, // 30% more damage
    }),
    new Item({
        name: 'Bloodthirster',
        description: 'nothing',
        additionalAttackDamage: 1.15, // 15% more attack damage
        additionalAbilityPower: 15, // 15 ability power
        additionalMagicResist: 20, // 20 more magic resist
        omnivamp: 25, // 25% omnivamp
    }),
    new Item({
        name: 'Rabadon\'s Deathcap',
        description: 'nothing',
        additionalAbilityPower: 50, // 50 ability power
        additionalDamageAmp: 1.15, // 50% more damage
    }),
    new Item({
        name: 'Dragon\'s Claw',
        description: 'nothing',
        additionalMagicResist: 60, // 60 more magic resist
        additionalPercentageHealth: 1.07, // 7% more health
        heal: true,
        healAmount: 1.025 // 2.5% healing of max health every 2 seconds
    }),
    new Item({
        name: 'Bramble Vest',
        description: 'nothing',
        additionalArmor: 60, // 60 more armor
        additonalPercentageHealth: 1.07, // 7% more health
    })
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
