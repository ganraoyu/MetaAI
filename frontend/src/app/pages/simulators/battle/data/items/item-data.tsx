export const combinedItems = [
    {
        name: 'Guinsoo\'s Rageblade',
        description: 'Attacks grant 5% Attack Speed. Stacks infinitely.',
        additionalAttackSpeed: 1.1, // 10% attack speed
        additionalAbilityPower: 10, // 10 ability power  
        attackSpeedStacking: true,
        additionalAttackSpeedPerStack: 1.05, //5% attack speed per stack
        image: '../assets/items/combined/GuinsoosRageblade.png',
        components: ['Recurve Bow', 'Needlessly Large Rod'],
        componentsImages: ['../assets/items/basic/RecurveBow.png', '../assets/items/basic/NeedlesslyLargeRod.png']
    },
    {
        name: 'Infinity Edge',
        description: 'Ability can critically strike. If the holder already has a critical strike, gain 10% critical strike damage instead.',        
        abilityCritStrike: true,
        additionalAttackDamage: 1.35, // 35% more attack damage
        additionalCritChance: 35, // 35% crit chance
        image: '../assets/items/combined/InfinityEdge.png',
        components: ['B.F. Sword', 'Sparring Gloves'],
        componentsImages: ['../assets/items/basic/BFSword.png', '../assets/items/basic/SparringGloves.png']
    },
    {
        name: 'Jeweled Gauntlet',
        description: 'Ability can critically strike. If the holder already has a critical strike, gain 10% critical strike damage instead.',        
        abilityCritStrike: true,
        additionalAbilityPower: 35, // 35 base ability power
        additionalCritChance: 35, // 35% crit chance
        image: '../assets/items/combined/JeweledGauntlet.png',
        components: ['Needlessly Large Rod', 'Sparring Gloves'],
        componentsImages: ['../assets/items/basic/NeedlesslyLargeRod.png', '../assets/items/basic/SparringGloves.png']
    },
    {
        name: 'Last Whisper',
        description: 'Physical damage 30% Sunders the target for 3 seconds. This effect does not stack.',
        sunder: true, 
        sunderRadius: 3, // 3 hexes
        additionalAttackDamage: 1.15, // 15% more attack damage
        additionalAttackSpeed: 1.2, // 20% more attack speed
        additionalCritChance: 20, // 20% crit chance
        image: '../assets/items/combined/LastWhisper.png',
        components: ['Recurve Bow', 'Sparring Gloves'],
        componentsImages: ['../assets/items/basic/RecurveBow.png', '../assets/items/basic/SparringGloves.png']
    },
    {
        name: 'Warmog\'s Armor',
        description: 'Gain 12% max health',
        additionalHealth: 600, // 600 more health
        additionalPercentageHealth: 1.12, // 50% more health
        image: '../assets/items/combined/WarmogsArmor.png',
        components: ['Giant\'s Belt', 'Giant\'s Belt'],
        componentsImages: ['../assets/items/basic/GiantsBelt.png', '../assets/items/basic/GiantsBelt.png']
    },
    {
        name: 'Spear of Shojin',
        description: 'Attacks grant 5 bonus Mana.',
        additionalAttackSpeed: 1.15, // 15% more attack speed
        additionalStartingMana: 15, // 15 starting mana
        additionalManaPerAttack: 5, // 5 mana per attack
        additionalAbilityPower: 15, // 15 ability power
        image: '../assets/items/combined/SpearOfShojin.png',
        components: ['Tear of the Goddess', 'B.F. Sword'],
        componentsImages: ['../assets/items/basic/TearoftheGoddess.png', '../assets/items/basic/BFSword.png']
    },
    {
        name: 'Death Blade',
        description: 'Perfect peace and calm for the holder - and all who face it.',
        additionalAttackDamage: 1.3, // 30% more attack damage
        additionalDamageAmp: 0.1, // 10% more damage
        image: '../assets/items/combined/DeathBlade.png',
        components: ['B.F. Sword', 'B.F. Sword'],
        componentsImages: ['../assets/items/basic/BFSword.png', '../assets/items/basic/BFSword.png']
    },
    {
        name: 'Bloodthrister',
        description: 'Once per combat at 40% Health, gain a 25% max Health Shield that lasts up to 5 seconds.',
        additionalAttackDamage: 1.15, // 15% more attack damage
        additionalAbilityPower: 15, // 15 ability power
        additionalMagicResist: 20, // 20 more magic resist
        shield: true,
        shieldAmount: 0.25, // 25% max health shield
        shieldDuration: 5, // 5 seconds
        omnivamp: 25, // 25% omnivamp
        image: '../assets/items/combined/Bloodthrister.png',
        components: ['B.F. Sword', 'Negatron Cloak'],
        componentsImages: ['../assets/items/basic/BFSword.png', '../assets/items/basic/NegatronCloak.png']
    },
    {
        name: 'Rabadon\'s Deathcap',
        description: 'This humble hat can help you make, or unmake, the world itself.',
        additionalAbilityPower: 50, // 50 ability power
        additionalDamageAmp: 0.15, // 15% more damage
        image: '../assets/items/combined/RabadonsDeathcap.png',
        components: ['Needlessly Large Rod', 'Needlessly Large Rod'],
        componentsImages: ['../assets/items/basic/NeedlesslyLargeRod.png', '../assets/items/basic/NeedlesslyLargeRod.png']
    },
    {
        name: 'Dragon\'s Claw',
        description: 'Gain 9% max health. Every 2 seconds, heal 2.5% max Health.',
        additionalMagicResist: 60, // 60 more magic resist
        additionalPercentageHealth: 1.07, // 7% more health
        heal: true,
        healAmount: 0.025, // 2.5% healing of max health every 2 seconds
        image: '../assets/items/combined/DragonsClaw.png',
        components: ['Negatron Cloak', 'Negatron Cloak'],
        componentsImages: ['../assets/items/basic/NegatronCloak.png', '../assets/items/basic/NegatronCloak.png']
    },
    {
        name: 'Bramble Vest',
        description: 'Gain 7% max health. Take 8% reduced damage from attacks. When struck by any attack, deal 100 magic damage to all adjacent enemies. (Cooldown: 2 seconds)',
        additionalArmor: 60, // 60 more armor
        additionalPercentageHealth: 1.07, // 7% more health
        reduction: true,
        reductionAmount: 8, // 8% reduced damage
        externalMagicDamage: 100,
        image: '../assets/items/combined/BrambleVest.png',
        components: ['Chain Vest', 'Chain Vest'],
        componentsImages: ['../assets/items/basic/ChainVest.png', '../assets/items/basic/ChainVest.png']
    },
    {
        name: 'Archangel\'s Staff',
        description: 'Grant 20 bonus Ability Power. Combat start: Grant 30 Ability Power every 5 seconds.',
        additionalAbilityPower: 20, // 20 ability power
        additionalStartingMana: 20, // 20 starting mana
        abilityPowerStacking: true,
        abilityPowerStackInterval: 5, // every 5 seconds
        additionalAbilityPowerPerStack: 30, // 30 ability power
        image: '../assets/items/combined/ArchangelsStaff.png',
        components: ['Tear of the Goddess', 'Needlessly Large Rod'],
        componentsImages: ['../assets/items/basic/TearoftheGoddess.png', '../assets/items/basic/NeedlesslyLargeRod.png']
    },
    {
        name: 'Giant Slayer',
        description: 'Gain 20% additional Damage Amp against enemies with more than 1750 max Health.',
        additionalAttackSpeed: 1.1,
        additionalAbilityPower: 25,
        additionalAttackDamage: 1.25,
        additionalDamageAmp: 0.05,
        image: '../assets/items/combined/GiantSlayer.png',
        components: ['B.F. Sword', 'Recurve Bow'],
        componentsImages: ['../assets/items/basic/BFSword.png', '../assets/items/basic/RecurveBow.png']
    },
    {
        name: 'Runaan\'s Hurricane',
        description: 'Attacks fire a bolt at a nearby enemy, dealing 55% Attack Damage as physical damage.',
        additionalAttackSpeed: 1.1,
        additionalAttackDamage: 1.1,
        additionalMagicResist: 20,
        image: '../assets/items/combined/RunaansHurricane.png',
        components: ['Recurve Bow', 'Negatron Cloak'],
        componentsImages: ['../assets/items/basic/RecurveBow.png', '../assets/items/basic/NegatronCloak.png']
    },
    {
        name: 'Sterak\'s Gage',
        description: 'Once per combat at 60% Health, gain 25% max Health and 35% Attack Damage.',
        additionalHealth: 200,
        additionalAttackDamage: 1.15,
        image: '../assets/items/combined/SteraksGage.png',
        components: ['Giant\'s Belt', 'B.F. Sword'],
        componentsImages: ['../assets/items/basic/GiantsBelt.png', '../assets/items/basic/BFSword.png']
    },
    {
        name: 'Titan\'s Resolve',
        description: 'Gain 2% Attack Damage and 1 Ability Power when attacking or taking damage, stacking up to 25 times.',
        additionalAttackSpeed: 1.1,
        additionalArmor: 20,
        abilityPowerStacking: true,
        image: '../assets/items/combined/TitansResolve.png',
        components: ['Chain Vest', 'Recurve Bow'],
        componentsImages: ['../assets/items/basic/ChainVest.png', '../assets/items/basic/RecurveBow.png']
    },
    {
        name: 'Steadfast Heart',
        description: 'Take 8% less damage. While above 50% Health, take 15% less damage instead.',
        additionalHealth: 200,
        additionalArmor: 20,
        additionalCritChance: 15,
        image: '../assets/items/combined/SteadfastHeart.png',
        components: ['Chain Vest', 'Negatron Cloak'],
        componentsImages: ['../assets/items/basic/ChainVest.png', '../assets/items/basic/NegatronCloak.png']

    },
    {
        name: 'Crownguard',
        description: 'Combat start: Shields the holder for 25% of their max health for 8 seconds. When the shield breaks or expires, gain 40 Ability Power.',
        additionalHealth: 200,
        additionalMagicResist: 20,
        additionalAbilityPower: 20,
        shield: true,
        shieldAmount: 0.30,
        shieldDuration: 8,
        image: '../assets/items/combined/Crownguard.png',
        components: ['Negatron Cloak', 'Needlessly Large Rod'],
        componentsImages: ['../assets/items/basic/NegatronCloak.png', '../assets/items/basic/NeedlesslyLargeRod.png']
    },
    {
        name: 'Hand Of Justice',
        description: 'Gain 2 effects: • 15% Attack Damage and 15 Ability Power. • 15% Omnivamp. Each round, randomly double 1 of these effects. Omnivamp: heal for some of damage dealt',
        additionalStartingMana: 15,
        additionalCritChance: 20,
        image: '../assets/items/combined/HandOfJustice.png',
        components: ['Sparring Gloves', 'Tear of the Goddess'],
        componentsImages: ['../assets/items/basic/SparringGloves.png', '../assets/items/basic/TearoftheGoddess.png']
    },
    {
        name: 'Guardbreaker',
        description: 'After damaging a Shield, deal 25% more damage for 3 seconds.',
        additionalHealth: 200,
        additionalAttackSpeed: 1.2,
        additionalCritChance: 20,
        additionalAbilityPower: 20,
        image: '../assets/items/combined/Guardbreaker.png',
        components: ['Giant\'s Belt', 'Sparring Gloves'],
        componentsImages: ['../assets/items/basic/GiantsBelt.png', '../assets/items/basic/SparringGloves.png']
    },
    {
        name: 'Nashor\'s Tooth',
        description: 'After casting an ability, gain 60% Attack Speed for 5 seconds.',
        additionalHealth: 150,
        additionalAbilityPower: 10,
        additionalAttackSpeed: 1.1,
        image: '../assets/items/combined/NashorsTooth.png',
        components: ['Giant\'s Belt', 'Recurve Bow'],
        componentsImages: ['../assets/items/basic/GiantsBelt.png', '../assets/items/basic/RecurveBow.png']
    },
    {
        name: 'Hextech Gunblade',
        description: 'Heal the lowest percent Health ally for 25% of damage dealt.',
        additionalAttackSpeed: 1.2,
        additionalAbilityPower: 20,
        heal: true,
        healAmount: 0.25,
        image: '../assets/items/combined/HextechGunblade.png',
        components: ['Needlessly Large Rod', 'B.F. Sword'],
        componentsImages: ['../assets/items/basic/NeedlesslyLargeRod.png', '../assets/items/basic/BFSword.png']
    },
    {
        name: 'Protector\'s Vow',
        description: 'Once per combat at 40% Health, gain a 25% max Health Shield that lasts 5 seconds and gain 20 Armor and 20 Magic Resist.',
        additionalArmor: 20,
        additionalStartingMana: 30,
        shield: true,
        shieldAmount: 0.30,
        image: '../assets/items/combined/ProtectorsVow.png',
        components: ['Chain Vest', 'Tear of the Goddess'],
        componentsImages: ['../assets/items/basic/ChainVest.png', '../assets/items/basic/TearoftheGoddess.png']
    },
    {
        name: 'Red Buff',
        description: 'Deal 6% bonus damage. Attacks and Abilities 1% Burn and 33% Wound enemies for 5 seconds.',
        additionalAttackSpeed: 1.4,
        additionalDamageAmp: 0.06,
        burn: true,
        wound: true,
        image: '../assets/items/combined/RedBuff.png',
        components: ['Recurve Bow', 'Recurve Bow'],
        componentsImages: ['../assets/items/basic/RecurveBow.png', '../assets/items/basic/RecurveBow.png']
    },
    {
        name: 'Morellonomicon',
        description: 'Attacks and Abilities deal 1% Burn and 33% Wound to enemies for 10 seconds.',
        additionalAbilityPower: 20,
        additionalHealth: 150,
        additionalAttackSpeed: 1.1,
        burn: true,
        wound: true,
        image: '../assets/items/combined/Morellonomicon.png',
        components: ['Needlessly Large Rod', 'Giant\'s Belt'],
        componentsImages: ['../assets/items/basic/NeedlesslyLargeRod.png', '../assets/items/basic/GiantsBelt.png']
    },
    {
        name: 'Gargoyle Stoneplate',
        description: 'Gain 10 Armor and 10 Magic Resist for each enemy targeting the holder.',
        additionalMagicResist: 30,
        additionalArmor: 30,
        additionalHealth: 100,
        image: '../assets/items/combined/GargoyleStoneplate.png',
        components: ['Chain Vest', 'Negatron Cloak'],
        componentsImages: ['../assets/items/basic/ChainVest.png', '../assets/items/basic/NegatronCloak.png']
    },
    {
        name: 'Sunfire Cape',
        description: 'Every 2 seconds, deal 1% Burn and 33% Wound to an enemy within 2 hexes for 10 seconds.',
        additionalHealth: 250,
        additionalArmor: 20,
        burn: true,
        wound: true,
        image: '../assets/items/combined/SunfireCape.png',
        components: ['Chain Vest', 'Giant\'s Belt'],
        componentsImages: ['../assets/items/basic/ChainVest.png', '../assets/items/basic/GiantsBelt.png']
    },
    {
        name: 'Ionic Spark',
        description: '30% Shred enemies within 2 hexes. When enemies cast an Ability, deal magic damage equal to 160% of the Mana spent.',
        additionalHealth: 150,
        additionalAbilityPower: 15,
        additionalMagicResist: 25,
        shred: true,
        image: '../assets/items/combined/IonicSpark.png',
        components: ['Needlessly Large Rod', 'Negatron Cloak'],
        componentsImages: ['../assets/items/basic/NeedlesslyLargeRod.png', '../assets/items/basic/NegatronCloak.png']
    },
    {
        name: 'Adaptive Helm',
        description: 'Combat Start: Gain different bonuses based on starting position. Front Two Rows: 40 Armor and Magic Resist. Gain 1 Mana when struck by an attack. Back Two Rows: 20 Ability Power. Gain 10 Mana every 3 seconds.',
        additionalAbilityPower: 15,
        additionalStartingMana: 15,
        additionalMagicResist: 20,
        image: '../assets/items/combined/AdaptiveHelm.png',
        components: ['Negatron Cloak', 'Tear of the Goddess'],
        componentsImages: ['../assets/items/basic/NegatronCloak.png', '../assets/items/basic/TearoftheGoddess.png']
    },
    {
        name: 'Evenshroud',
        description: '30% Sunder enemies within 2 hexes. Gain 25 Armor and Magic Resist for the first 10 seconds of combat.',
        additionalHealth: 150,
        additionalMagicResist: 20,
        sunder: true,
        image: '../assets/items/combined/Evenshroud.png',
        components: ['Sparring Gloves', 'Recurve Bow'],
        componentsImages: ['../assets/items/basic/SparringGloves.png', '../assets/items/basic/RecurveBow.png']
    },
    {
        name: 'Redemption',
        description: 'Heal allies within 1 hex for 15% of their missing Health every 5 seconds. They also take 10% less damage for 5 seconds (damage reduction does not stack).',
        additionalHealth: 100,
        additionalStartingMana: 15,
        heal: true,
        image: '../assets/items/combined/Redemption.png',
        components: ['Tear of the Goddess', 'Giant\'s Belt'],
        componentsImages: ['../assets/items/basic/TearoftheGoddess.png', '../assets/items/basic/GiantsBelt.png']
    },
    {
        name: 'Edge of Night',
        description: 'Once per combat: At 60% Health, briefly become untargetable and shed negative effects. Then, gain 15% bonus Attack Speed.',
        additionalAttackSpeed: 1.1,
        additionalArmor: 20,
        image: '../assets/items/combined/EdgeOfNight.png',
        components: ['Chain Vest', 'B.F. Sword'],
        componentsImages: ['../assets/items/basic/ChainVest.png', '../assets/items/basic/BFSword.png']
    },
    {
        name: 'Statikk Shiv',
        description: 'Every 3rd attack deals 35 magic damage and 30% Shreds 4 enemies for 5 seconds.',
        additionalAttackSpeed: 1.15,
        additionalStartingMana: 15,
        additionalAbilityPower: 15,
        shred: true,
        image: '../assets/items/combined/StatikkShiv.png',
        components: ['Tear of the Goddess', 'Recurve Bow'],
        componentsImages: ['../assets/items/basic/TearoftheGoddess.png', '../assets/items/basic/RecurveBow.png']
    }, 
    {
        name: 'Quick Silver',
        description: 'Combat start: Gain immunity to crowd control for 18 seconds. During this time, gain 3% Attack Speed every 2 seconds.',
        additionalAttackSpeed: 1.3,
        additionalCritChance: 20,
        image: '../assets/items/combined/QuickSilver.png',
        components: ['Sparring Gloves', 'Negatron Cloak'],
        componentsImages: ['../assets/items/basic/SparringGloves.png', '../assets/items/basic/NegatronCloak.png']
    },
    {
        name: 'Blue Buff',
        description: 'Max mana reduced by 10. Gain 10 Mana after casting. When the holder gets a takedown, they deal 5% more damage for 8 seconds.',
        additionalAttackSpeed: 1.15,
        additionalStartingMana: 30,
        additionalAbilityPower: 15,
        additionalDamageAmp: 0.05,
        image: '../assets/items/combined/BlueBuff.png',
        components: ['Tear of the Goddess', 'Tear of the Goddess'],
        componentsImages: ['../assets/items/basic/TearoftheGoddess.png', '../assets/items/basic/TearoftheGoddess.png']
    },
];