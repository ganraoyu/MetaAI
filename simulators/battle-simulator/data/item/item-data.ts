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
        description: 'Physical damage 30% Sunders the target for 3 seconds. This effect does not stack.',
        sunder: true, 
        sunderRadius: 3, // 3 hexes
        additionalAttackDamage: 1.15, // 15% more attack damage
        additionalAttackSpeed: 1.2, // 20% more attack speed
        additionalCritChance: 20 // 20% crit chance
    }),
    new Item({
        name: 'Warmog\'s Armor',
        description: 'Gain 12% max health',
        additionalHealth: 600, // 600 more health
        additionalPercentageHealth: 1.12, // 50% more health
    }),
    new Item({
        name: 'Spear of Shojin',
        description: 'Attacks grant 5 bonus Mana.',
        additionalAttackSpeed: 1.15, // 15% more attack speed
        additionalStartingMana: 15, // 15 starting mana
        additionalManaPerAttack: 5, // 5 mana per attack
        additionalAbilityPower: 15, // 15 ability power
    }),
    new Item({
        name: 'Death Blade',
        description: 'Perfect peace and calm for the holder - and all who face it.',
        additionalAttackDamage: 1.3, // 30% more attack damage
        additionalDamageAmp: 0.1, // 10% more damage
    }),
    new Item({
        name: 'Bloodthirster',
        description: 'Once per combat at 40% Health, gain a 25% max Health Shield that lasts up to 5 seconds.',
        additionalAttackDamage: 1.15, // 15% more attack damage
        additionalAbilityPower: 15, // 15 ability power
        additionalMagicResist: 20, // 20 more magic resist
        shield:true,
        shieldAmount: 0.25, // 25% max health shield
        shieldDuration: 5, // 5 seconds
        omnivamp: 25, // 25% omnivamp
    }),
    new Item({
        name: 'Rabadon\'s Deathcap',
        description: 'This humble hat can help you make, or unmake, the world itself.',
        additionalAbilityPower: 50, // 50 ability power
        additionalDamageAmp: 0.15, // 15% more damage
    }),
    new Item({
        name: 'Dragon\'s Claw',
        description: 'Gain 9% max health. Every 2 seconds, heal 2.5% max Health.',
        additionalMagicResist: 60, // 60 more magic resist
        additionalPercentageHealth: 1.07, // 7% more health
        heal: true,
        healAmount: 0.025 // 2.5% healing of max health every 2 seconds
    }),
    new Item({
        name: 'Bramble Vest',
        description: 'Gain 7% max health. Take 8% reduced damage from attacks. When struck by any attack, deal 100 magic damage to all adjacent enemies. (Cooldown: 2 seconds)',
        additionalArmor: 60, // 60 more armor
        additonalPercentageHealth: 1.07, // 7% more health
        reduction: true,
        reductionAmount: 8, // 8% reduced damage
        externalMagicDamage: 100
    }),
    new Item({
        name: 'Archangel\'s Staff',
        description: 'Grant 20 bonus Ability Power. Combat start: Grant 30 Ability Power every 5 seconds.',
        additionlAbilityPower: 20, // 20 ability power
        additionalStartingMana: 20, // 20 starting mana
        abilityPowerStacking: true,
        abilityPowerStackInterval: 5, // every 5 seconds
        additionalAbilityPowerPerStack: 30 // 30 ability power
    }),
    new Item({
        name: 'Giant Slayer', 
        description: 'Gain 20% additional Damage Amp against enemies with more than 1750 max Health.',
        additionalAttackSpeed: 1.1, // 10% attack speed
        additionalAbilityPower: 25, // 25 flat AP
        additionalAttackDamage: 1.25, // 25% attack damage
        additionalDamageAmp: 0.2, // 20% damage amp
    }),
    new Item({
        name: 'Runaan\'s Hurricane',
        description: 'Attacks fire a bolt at a nearby enemy, dealing 55% Attack Damage as physical damage.',
        additionalAttacKSpeed: 1.1, // 10% attack speed
        additionalAttackDamage: 1.1, // 10% attack damage
        additonalMagicResist: 20, // 20 more magic resist
    }),
    new Item({
        name: 'Sterak\'s Gage',
        description: 'Once per combat at 60% Health, gain 25% max Health and 35% Attack Damage.',
        additionalHealth: 200, // 200 more health
        additionalAttackDamage: 1.15, // 15% more attack damage
    }),
    new Item({
        name: 'Titan\'s Resolve',
        description: 'Gain 2% Attack Damage and 1 Ability Power when attacking or taking damage, stacking up to 25 times.',
        additionalAttackSpeed: 1.1, // 10% attack speed
        additionalArmor: 20, // 20 more armor
        abilityPowerStacking: true,
        additionalAbilityPowerPerStack: 30
    }),
    new Item({
        name: 'Steadfast Heart',
        description: 'Take 8% less damage. While above 50% Health, take 15% less damage instead.',
        additionalHealth: 200, // 200 more health
        additionalArmor: 20, // 20 more armor
        additionalCritChance: 15, // 15% crit damage
    }),
    new Item({
        name: 'Crownguard',
        description: 'Combat start: Shields the holder for 25% of their max health for 8 seconds. When the shield breaks or expires, gain 40 Ability Power.',
        additionalHealth: 200, // 200 more health
        additionalMagicResist: 20, // 20 more magic resist
        additionalAbilityPower: 20, // 20 ability power
        shield: true,
        shieldAmount: 0.30, // 30% max health shield
        shieldDuration: 8, // 8 seconds
    }),
    new Item({
        name: 'Hand of Justice',
        description: 'Gain 2 effects: • 15% Attack Damage and 15 Ability Power. • 15% Omnivamp. Each round, randomly double 1 of these effects. Omnivamp: heal for some of damage dealt',
        additionalStartingMana: 15,
        additionalCritChance: 20,
    }),
    new Item({
        name: 'Guardbreaker',
        description: 'After damaging a Shield, deal 25% more damage for 3 seconds.',
        additionalHealth: 200,
        additionalAttackSpeed: 1.2,
        additionalCritChance: 20,
        additionalAbilityPower:20,
    }),
    new Item({
        name: 'Nashor\'s Tooth',
        description: 'After casting an ability, gain 60% Attack Speed for 5 seconds.',
        additionalHealth: 150, // 150 more health
        additionalAbilityPower: 10, // 10 ability power
        additionalAttackSpeed: 1.1, // 10% attack speed
    }),
    new Item({
        name: 'Hextech Gunblade',
        description: 'Heal the lowest percent Health ally for 25% of damage dealt.',
        additionalAttackSpeed: 1.2, // 20% attack speed
        additionalAbilityPower: 20,
        heal: true,
        healAmount: 0.25 // 25% healing of damage dealt
    }),
    new Item({
        name: 'Protector\'s Vow',
        description: 'Once per combat at 40% Health, gain a 25% max Health Shield that lasts 5 seconds and gain 20 Armor and 20 Magic Resist.',
        additionalArmor: 20,
        additionalStartingMana: 30,
        shield:true,
        shieldAmount: 0.30
    }),
    new Item({
        name: 'Red Buff',
        description: 'Deal 6% bonus damage. Attacks and Abilities 1% Burn and 33% Wound enemies for 5 seconds.',
        additionalAttackSpeed: 1.4,
        additionalDamageAmp: 0.06,
        burn: true,
        wound: true
    }),
    new Item({
        name: 'Morellonomicon',
        description: 'Attacks and Abilities deal 1% Burn and 33% Wound to enemies for 10 seconds.',
        additionalAbilityPower: 20,
        additionalHp: 150,
        additionalAttackSpeed: 1.1,
        burn: true,
        wound: true,
    }),
    new Item({
        name: 'Gargoyle Stoneplate',
        description: 'Gain 10 Armor and 10 Magic Resist for each enemy targeting the holder.',
        additionalMagicResist: 30,
        additionalArmor: 30,
        additionalHealth: 100,
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

// console.log(combinedItems[6])

module.exports = { getItemByName, basicItems, combinedItems }
