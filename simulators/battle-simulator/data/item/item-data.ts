const { Item } = require(".././item/item.ts");

/*
cd simulators/battle-simulator/data/item
nodemon item-data.ts
*/

export const basicItems = [
  new Item({
    name: "B.F. Sword",
    description: "Grants 10% bonus Attack Damage.",
    additionalAttackDamage: 1.1, // 10% attack damag
  }),
  new Item({
    name: "Recursive Bow",
    description: "Increases Attack Speed by 10%.",
    additionalAttackSpeed: 1.1, // 10% attack speed
  }),
  new Item({
    name: "Tear of the Goddess",
    description: "Provides 15 bonus Starting Mana",
    additionalStartingMana: 15, // 15 starting mana
  }),
  new Item({
    name: "Needlessly Large Rod",
    description: "Increases Ability Power by 10.",
    additionalAbilityPower: 10, // 10 more ability power
  }),
  new Item({
    name: "Chain Vest",
    description: "Grants 20 Armor",
    additionalArmor: 20, // 20 more armor
  }),
  new Item({
    name: "Negatron Cloak",
    description: "Grants 20 Magic Resist",
    additionalMagicResist: 20, // 20 more magic resist
  }),
  new Item({
    name: "Giant's Belt",
    description: "Increases Health by 200",
    additionalHealth: 200, // 200 more health
  }),
  new Item({
    name: "Sparring Gloves",
    description: "Increases Critical Chance by 15",
    additionalCritChance: 20, // 20% crit chance
  }),
  new Item({
    name: "Spatula",
    description: "It must do something...",
  }),
];

export const combinedItems = [
  new Item({
    name: "Guinsoo's Rageblade",
    description: "Attacks grant 5% Attack Speed. Stacks infinitely.",
    additionalAttackSpeed: 1.1, // 10% attack speed
    additionalAbilityPower: 10, // 10 ability power
    attackSpeedStacking: true,
    additionalAttackSpeedPerStack: 1.05, //5% attack speed per stack
  }),
  new Item({
    name: "Infinity Edge",
    description:
      "Ability can critically strike. If the holder already has a critical strike, gain 10% critical strike damage instead.",
    abilityCritStrike: true,
    additionalAttackDamage: 1.35, // 35% more attack damage
    additionalCritChance: 35, // 35% crit chance
  }),
  new Item({
    name: "Jeweled Gauntlet",
    description:
      "Ability can critically strike. If the holder already has a critical strike, gain 10% critical strike damage instead.",
    abilityCritStrike: true,
    additionalAbilityPower: 35, // 35 base ability power
    additionalCritChance: 35, // 35% crit chance
  }),
  new Item({
    name: "Last Whisper",
    description:
      "Physical damage 30% Sunders the target for 3 seconds. This effect does not stack.",
    sunder: true,
    sunderRadius: 3, // 3 hexes
    additionalAttackDamage: 1.15, // 15% more attack damage
    additionalAttackSpeed: 1.2, // 20% more attack speed
    additionalCritChance: 20, // 20% crit chance
  }),
  new Item({
    name: "Warmog's Armor",
    description: "Gain 12% max health",
    additionalHealth: 600, // 600 more health
    additionalPercentageHealth: 1.12, // 50% more health
  }),
  new Item({
    name: "Spear of Shojin",
    description: "Attacks grant 5 bonus Mana.",
    additionalAttackSpeed: 1.15, // 15% more attack speed
    additionalStartingMana: 15, // 15 starting mana
    additionalManaPerAttack: 5, // 5 mana per attack
    additionalAbilityPower: 15, // 15 ability power
  }),
  new Item({
    name: "Death Blade",
    description: "Perfect peace and calm for the holder - and all who face it.",
    additionalAttackDamage: 1.3, // 30% more attack damage
    additionalDamageAmp: 0.1, // 10% more damage
  }),
  new Item({
    name: "Bloodthirster",
    description:
      "Once per combat at 40% Health, gain a 25% max Health Shield that lasts up to 5 seconds.",
    additionalAttackDamage: 1.15, // 15% more attack damage
    additionalAbilityPower: 15, // 15 ability power
    additionalMagicResist: 20, // 20 more magic resist
    shield: true,
    shieldAmount: 0.25, // 25% max health shield
    shieldDuration: 5, // 5 seconds
    omnivamp: 25, // 25% omnivamp
  }),
  new Item({
    name: "Rabadon's Deathcap",
    description: "This humble hat can help you make, or unmake, the world itself.",
    additionalAbilityPower: 50, // 50 ability power
    additionalDamageAmp: 0.15, // 15% more damage
  }),
  new Item({
    name: "Dragon's Claw",
    description: "Gain 9% max health. Every 2 seconds, heal 2.5% max Health.",
    additionalMagicResist: 60, // 60 more magic resist
    additionalPercentageHealth: 1.07, // 7% more health
    heal: true,
    healAmount: 0.025, // 2.5% healing of max health every 2 seconds
  }),
  new Item({
    name: "Bramble Vest",
    description:
      "Gain 7% max health. Take 8% reduced damage from attacks. When struck by any attack, deal 100 magic damage to all adjacent enemies. (Cooldown: 2 seconds)",
    additionalArmor: 60, // 60 more armor
    additionalPercentageHealth: 1.07, // 7% more health
    reduction: true,
    reductionAmount: 8, // 8% reduced damage
    externalMagicDamage: 100,
  }),
  new Item({
    name: "Archangel's Staff",
    description:
      "Grant 20 bonus Ability Power. Combat start: Grant 30 Ability Power every 5 seconds.",
    additionlAbilityPower: 20, // 20 ability power
    additionalStartingMana: 20, // 20 starting mana
    abilityPowerStacking: true,
    abilityPowerStackInterval: 5, // every 5 seconds
    additionalAbilityPowerPerStack: 30, // 30 ability power
  }),
  new Item({
    name: "Giant Slayer",
    description: "Gain 20% additional Damage Amp against enemies with more than 1750 max Health.",
    additionalAttackSpeed: 1.1, // 10% attack speed
    additionalAbilityPower: 25, // 25 flat AP
    additionalAttackDamage: 1.25, // 25% attack damage
    additionalDamageAmp: 0.05, // 5% damage amp
  }),
  new Item({
    name: "Runaan's Hurricane",
    description:
      "Attacks fire a bolt at a nearby enemy, dealing 55% Attack Damage as physical damage.",
    additionalAttacKSpeed: 1.1, // 10% attack speed
    additionalAttackDamage: 1.1, // 10% attack damage
    additionalMagicResist: 20, // 20 more magic resist
  }),
  new Item({
    name: "Sterak's Gage",
    description: "Once per combat at 60% Health, gain 25% max Health and 35% Attack Damage.",
    additionalHealth: 200, // 200 more health
    additionalAttackDamage: 1.15, // 15% more attack damage
  }),
  new Item({
    name: "Titan's Resolve",
    description:
      "Gain 2% Attack Damage and 1 Ability Power when attacking or taking damage, stacking up to 25 times.",
    additionalAttackSpeed: 1.1, // 10% attack speed
    additionalArmor: 20, // 20 more armor
    abilityPowerStacking: true,
  }),
  new Item({
    name: "Steadfast Heart",
    description: "Take 8% less damage. While above 50% Health, take 15% less damage instead.",
    additionalHealth: 200, // 200 more health
    additionalArmor: 20, // 20 more armor
    additionalCritChance: 15, // 15% crit damage
  }),
  new Item({
    name: "Crownguard",
    description:
      "Combat start: Shields the holder for 25% of their max health for 8 seconds. When the shield breaks or expires, gain 40 Ability Power.",
    additionalHealth: 200, // 200 more health
    additionalMagicResist: 20, // 20 more magic resist
    additionalAbilityPower: 20, // 20 ability power
    shield: true,
    shieldAmount: 0.3, // 30% max health shield
    shieldDuration: 8, // 8 seconds
  }),
  new Item({
    name: "Hand Of Justice",
    description:
      "Gain 2 effects: • 15% Attack Damage and 15 Ability Power. • 15% Omnivamp. Each round, randomly double 1 of these effects. Omnivamp: heal for some of damage dealt",
    additionalStartingMana: 15,
    additionalCritChance: 20,
  }),
  new Item({
    name: "Guardbreaker",
    description: "After damaging a Shield, deal 25% more damage for 3 seconds.",
    additionalHealth: 200,
    additionalAttackSpeed: 1.2,
    additionalCritChance: 20,
    additionalAbilityPower: 20,
  }),
  new Item({
    name: "Nashor's Tooth",
    description: "After casting an ability, gain 60% Attack Speed for 5 seconds.",
    additionalHealth: 150, // 150 more health
    additionalAbilityPower: 10, // 10 ability power
    additionalAttackSpeed: 1.1, // 10% attack speed
  }),
  new Item({
    name: "Hextech Gunblade",
    description: "Heal the lowest percent Health ally for 25% of damage dealt.",
    additionalAttackSpeed: 1.2, // 20% attack speed
    additionalAbilityPower: 20,
    heal: true,
    healAmount: 0.25, // 25% healing of damage dealt
  }),
  new Item({
    name: "Protector's Vow",
    description:
      "Once per combat at 40% Health, gain a 25% max Health Shield that lasts 5 seconds and gain 20 Armor and 20 Magic Resist.",
    additionalArmor: 20,
    additionalStartingMana: 30,
    shield: true,
    shieldAmount: 0.3,
  }),
  new Item({
    name: "Red Buff",
    description:
      "Deal 6% bonus damage. Attacks and Abilities 1% Burn and 33% Wound enemies for 5 seconds.",
    additionalAttackSpeed: 1.4,
    additionalDamageAmp: 0.06,
    burn: true,
    wound: true,
  }),
  new Item({
    name: "Morellonomicon",
    description: "Attacks and Abilities deal 1% Burn and 33% Wound to enemies for 10 seconds.",
    additionalAbilityPower: 20,
    additionalHp: 150,
    additionalAttackSpeed: 1.1,
    burn: true,
    wound: true,
  }),
  new Item({
    name: "Gargoyle Stoneplate",
    description: "Gain 10 Armor and 10 Magic Resist for each enemy targeting the holder.",
    additionalMagicResist: 30,
    additionalArmor: 30,
    additionalHealth: 100,
  }),
  new Item({
    name: "Sunfire Cape",
    description:
      "Every 2 seconds, deal 1% Burn and 33% Wound to an enemy within 2 hexes for 10 seconds.",
    additionalHealth: 250,
    additionalArmor: 20,
    burn: true,
    wound: true,
  }),
  new Item({
    name: "Ionic Spark",
    description:
      "30% Shred enemies within 2 hexes. When enemies cast an Ability, deal magic damage equal to 160% of the Mana spent.",
    additionalHealth: 150,
    additionalAbilityPower: 15,
    additionalMagicResist: 25,
    shred: true,
  }),
  new Item({
    name: "Adaptive Helm",
    description:
      "Combat Start: Gain different bonuses based on starting position. Front Two Rows: 40 Armor and Magic Resist. Gain 1 Mana when struck by an attack. Back Two Rows: 20 Ability Power. Gain 10 Mana every 3 seconds.",
    additionalAbilityPower: 15,
    additionalStartingMana: 15,
    additionalMagicResist: 20,
  }),
  new Item({
    name: "Evenshroud",
    description:
      "30% Sunder enemies within 2 hexes. Gain 25 Armor and Magic Resist for the first 10 seconds of combat.",
    additionalHeatlh: 150,
    additionalMagicresist: 20,
    sunder: true,
  }),
  new Item({
    name: "Redemption",
    description:
      "Heal allies within 1 hex for 15% of their missing Health every 5 seconds. They also take 10% less damage for 5 seconds (damage reduction does not stack).",
    additionalHealth: 100,
    additionalStartingMana: 15,
    heal: true,
  }),
  new Item({
    name: "Edge of Night",
    description:
      "Once per combat: At 60% Health, briefly become untargetable and shed negative effects. Then, gain 15% bonus Attack Speed.",
    additionalAttackSpeed: 1.1,
    additionalArmor: 20,
  }),
  new Item({
    name: "Statikk Shiv",
    description: "Every 3rd attack deals 35 magic damage and 30% Shreds 4 enemies for 5 seconds.",
    additionalAttackSpeed: 1.15,
    additionalStartingMana: 15,
    additionalAbilityPower: 15,
    shred: true,
  }),
  new Item({
    name: "Quick Silver",
    description:
      "Combat start: Gain immunity to crowd control for 18 seconds. During this time, gain 3% Attack Speed every 2 seconds.",
    additionalAttacKSpeed: 1.3,
    additionalCritChance: 0.2,
  }),
  new Item({
    name: "Blue Buff",
    description:
      " Max mana reduced by 10. Gain 10 Mana after casting. When the holder gets a takedown, they deal 5% more damage for 8 seconds.",
    additionalAttackSpeed: 1.15,
    additionalStartingMana: 30,
    additionalAbilityPower: 15,
    additionalDamageAmp: 0.05,
  }),
];

export const radiantItems = [
  new Item({
    name: "Guinsoo's Reckoning",
    description: "Attacks grant 10% Attack Speed. Stacks infinitely.",
    additionalAbilityPower: 10, // 10 ability power
    additonalAttackSpeed: 1.2, // 10% attack speed
    attackSpeedStacking: true,
    additionalAttackSpeedPerStack: 1.1, //10% attack speed per stack
  }),
  new Item({
    name: "Zenith Edge",
    description:
      "Ability can critically strike. If the holder already has a critical strike, gain 10% critical strike damage instead.",
    abilityCritStrike: true,
    additionalAttackDamage: 1.75, // 70% more attack damage
    additionalCritChance: 75, // 75% crit chance
  }),
  new Item({
    name: "Jeweled Gauntlet",
    description:
      "Ability can critically strike. If the holder already has a critical strike, gain 10% critical strike damage instead.",
    abilityCritStrike: true,
    additionalAbilityPower: 75, // 75 base ability power
    additionalCritChance: 75, // 75% crit chance
  }),
  new Item({
    name: "Eternal Whisper",
    description:
      "Physical damage 30% Sunders the target for the rest of combat. This effect does not stack.",
    additionalAttackDamage: 1.45, // 35% more attack damage
    additionalAttackSpeed: 1.25, // 20% more attack speed
    additionalCritChance: 55, // 20% crit chance
  }),
  new Item({
    name: "Warmog's Pride",
    description: "Gain 20% max health",
    additionalHealth: 1000, // 600 more health
    additionalPercentageHealth: 1.2, // 20% more health
  }),
  new Item({
    name: "Spear of Hirana",
    description: "Attacks grant 10 bonus Mana.",
    additionalAttackSpeed: 1.35, // 25% more attack speed
    additionalStartingMana: 20, // 20 starting mana
    additionalManaPerAttack: 10, // 10 mana per attack
    additionalAbilityPower: 35, // 30 ability power
  }),
  new Item({
    name: "Death Blade",
    description: "Perfect peace and calm for the holder - and all who face it.",
    additionalAttackDamage: 1.5, // 50% more attack damage
    additionalDamageAmp: 0.2, // 20% more damage
  }),
  new Item({
    name: "Luminous Deathblade",
    description: "It glows in the presence of enemies. Or friends. Or anything alive, really.",
    additonalAttackDamage: 2.05, // 105% more attack damage
    additionalDamageAmp: 0.25, // 25% more damage
  }),
  new Item({
    name: "Blessed Bloodthirster",
    description:
      "Once per combat at 40% Health, gain a 50% max Health Shield that lasts up to 5 seconds.",
    additionalAttackDamage: 1.4, // 40% more attack damage
    additionalAbilityPower: 40, // 40 ability power
    additionalMagicResist: 20, // 20 more magic resist
    shield: true,
    shieldAmount: 0.4, // 40% max health shield
    shieldDuration: 5, // 5 seconds
    omnivamp: 40, // 40% omnivamp
  }),
  new Item({
    name: "Rabadon's Ascended Deathcap",
    description: "It's witnessed - and unleashed - miracles and calamities both.",
    additionalAbilityPower: 80, // 80 ability power
    additionalDamageAmp: 0.5, // 50% more damage
  }),
  new Item({
    name: "Dragon's Will",
    description: "Gain 15% max health. Every 2 seconds, heal 5% max Health.",
    additionalMagicResist: 115, // 100 more magic resist
    additionalPercentageHealth: 1.15, // 15% more health
    heal: true,
    healAmount: 0.1, // 10% healing of max health every 2 seconds
  }),
  new Item({
    name: "Rosethorn Vest",
    description:
      "Gain 15% max health. Take 25% reduced damage from attacks. When struck by any attack, deal 175 magic damage to all adjacent enemies. (Cooldown: 2 seconds)",
    additionalArmor: 100, // 100 more armor
    additionalHealthPercent: 1.15, // 15% more health
    reduction: true,
    reductionAmount: 25, // 25% reduced damage
    externalMagicDamage: 175,
  }),
  new Item({
    name: "Urf-Angel's Staff",
    description: "Combat start: Grant 40 Ability Power every 4 seconds.",
    additionalAbilityPower: 60, // 60 ability power
    additonalStartingMana: 30, // 30 starting mana
    abilityPowerStacking: true,
    abilityPowerStackInterval: 4, // every 4 seconds
    additionalAbilityPowerPerStack: 40, // 40 ability power
  }),
  new Item({
    name: "Demon Slayer",
    description: "Gain 30% additional Damage Amp against enemies with more than 1750 max Health.",
    additionalAttackDamage: 1.5, // 50% more attack damage
    additionalAbilityPower: 50, // 50 base ability power
    additionalDamageAmp: 0.2, // 20% damage amp
    additionalAttacKSpeed: 1.1, // 10% attack speed
  }),
  new Item({
    name: "Runaan's Tempest",
    description:
      "Attacks fire a bolt at a nearby enemy, dealing 100% Attack Damage as physical damage.",
    additionalAttackSpeed: 1.2, // 20% attack speed
    additionalAttackDamage: 1.4, // 40% attack damage
    additionalMagicResist: 20, // 20 more magic resist
  }),
  new Item({
    name: "Sterak's Megashield",
    description: "Once per combat at 60% Health, gain 40% max Health and 80% Attack Damage.",
    additionalHealth: 400, // 400 more health
    additionalAttackDamage: 1.3, // 30% more attack damage
  }),
  new Item({
    name: "Titan's Vow",
    description:
      "Gain 3% Attack Damage and 3 Ability Power when attacking or taking damage, stacking up to 25 times. At full stacks, gain 50 Armor and 50 Magic Resist.",
    additionalAttackSpeed: 1.3, // 20% attack speed
    additionalArmor: 35, // 35 more armor
    abilityPowerStacking: true,
  }),
  new Item({
    name: "Dvarapala Stoneplate",
    description:
      "Gain 15 Armor and 15 Magic Resist for each enemy targeting the holder. Also, heal 1.5% max Health each second.",
    additionalMagicResist: 50,
    additionalArmor: 50,
    additionalHealth: 250,
    heal: true,
    healAmount: 0.015, // 1.5% healing of max health every second
  }),
  new Item({
    name: "Royal Crownshield",
    description:
      "Combat start: Shields the holder for 50% of their max health for 8 seconds. When the shield breaks or expires, gain 50 Ability Power.",
    additionalAbilityPower: 40, // 40 ability power
    additionalArmor: 40, // 40 more armor
    additionalHealth: 200, // 200 more health
    shield: true,
    shieldAmount: 0.5, // 50% max health shield
    shieldDuration: 8, // 8 seconds
  }),
  new Item({
    name: "Fist Of Fairness",
    description:
      "Gain 2 effects: 35% Attack Damage and 35 Ability Power. 20% Omnivamp. While above 50% health, double the Attack Damage and Ability Power. While below 50% Health, doubl the Omnivamp.",
    additionalStartingMana: 15,
    additionalCritChance: 40,
  }),
  new Item({
    name: "Willbreaker",
    description: "After damaging a Shield, deal 50% more damage for 3 seconds.",
    additionalAbilityPower: 30, // 50 ability power
    additionalAttackSpeed: 1.3, // 30% attack speed
    additionalCritChance: 20, // 20% crit chance
    additionalHealth: 150, // 150 more health
    additionalDamageAmp: 0.2, // 20% more damage
  }),
  new Item({
    name: "The Bashor's Gift",
    description: "After casting an ability, gain 120% Attack Speed for 8 seconds.",
    additinalAbilityPower: 30, // 30 ability power
    additionalHeath: 200, // 200 more health
    additinalAttackSpeed: 1.2, // 20% attack speed
  }),
  new Item({
    name: "Hextech Lifeblade",
    description: "Heal the lowest percent Health ally for 40% of damage dealt.",
    additionalAttackSpeed: 1.4, // 40% attack speed
    additionalAbilityPower: 40, // 40 ability power
    heal: true,
    healAmount: 0.4, // 40% healing of damage dealt
  }),
  new Item({
    name: "Bulwark's Oath",
    description:
      "Once per combat at 40% Health, gain a 50% max Health Shield that lasts 10 seconds and gain 60 Armor and 60 Magic Resist.",
    additionalArmor: 40, // 40 more armor
    additionalStartingMana: 30, // 30 starting mana
    shield: true,
    shieldAmount: 0.5, // 50% max health shield
    shieldDuration: 10, // 10 seconds
  }),
  new Item({
    name: "Crest Of Cinders",
    description: "Attacks and Abilities 2% Burn and 33% Wound enemies for 5 seconds.",
    additionalAttackSpeed: 1.6, // 60% attack speed
    additionalDamageAmp: 0.1, // 10% more damage
    wound: true,
    burn: true,
  }),
  new Item({
    name: "More Morellonomicon",
    description: "Attacks and Abilities deal 2% Burn and 33% Wound to enemies for 8 seconds.",
    additionalAbilityPower: 50, // 50 ability power
    additionalAttacKSpeed: 1.25, // 25% attack speed
    additionalHealth: 150, // 150 more health
    wound: true,
    burn: true,
  }),
  new Item({
    name: "Legacy Of The Colossus",
    description: "Gain 16% durability. While above 40% Health, instead gain 30% Durability.",
    additionalArmor: 40, // 40 more armor
    additionalCritChance: 20, // 20% crit chance
    additionalHealth: 500, // 500 more health
  }),
  new Item({
    name: "Sunlight Cape",
    description:
      "Gain 12% max Health. Every 1.5 seconds, deal 2% Burn and 33% Wound to an enemy within 3 hexes for 8 seconds.",
    additionalArmor: 40, // 40 more armor
    additionalHealth: 300, // 300 more health
    burn: true,
    wound: true,
  }),
  new Item({
    name: "Covalent Spark",
    description:
      "30% Shred enemies within 3 hexes. When enemies cast an Ability, deal magic damage equal to 200% of the Mana spent. Also, heal 1.5% max Health per second.",
    additionalHealth: 200, // 200 more health
    additionalAbilityPower: 15, // 15 ability power
    shred: true,
    heal: true,
    healAmount: 0.015, // 1.5% healing of max health every second
  }),
  new Item({
    name: "Jak'sho the Protean",
    description:
      "Combat start: Gain different bonuses based on starting position. Front Two Rows: 60 Armor and Magic Resist. Gain 2 Mana when struck by an attack. Back Two Rows: 40 Ability Power. Gain 20 Mana every 3 seconds.",
    additionalStartingMana: 15, // 15 starting mana
    additionalAbilityPower: 25, // 25 ability power
  }),
  new Item({
    name: "Equinox",
    description:
      "30% Sunder enemies within 3 hexes. Gain 70 Armor and Magic Resist for the first 20 seconds of combat.",
    additionalHealth: 500, // 500 more health
    sunder: true,
  }),
  new Item({
    name: "Absolution",
    description:
      "Heal allies within 2 hexes for 25% of their missing Health every 5 seconds. They also gain 10% Durability for 5 seconds (this does not stack).",
    additionalStartingMana: 15, // 15 starting mana
    additionalHealth: 400, // 400 more health
    heal: true,
  }),
  new Item({
    name: "Brink Of Dawn",
    description:
      "Once per combat: At 60% Health, briefly become untargetable and shed negative effects. Then, heal 100% missing health and gain 85% bonus Attack Speed.",
    additionalAttackSpeed: 1.3, // 30% attack speed
    additionalArmor: 30, // 30 more armor
  }),
  new Item({
    name: "Statikk's Favor",
    description: "Every 3rd attack deals 95 magic damage and 30% Shreds 8 enemies for 5 seconds.",
    additionalAbilityPower: 50, // 50 ability power
    additionalAttackSpeed: 1.2, // 20% attack speed
    additionalStartingMana: 15, // 15 starting mana
    shred: true,
  }),
  new Item({
    name: "Quickestsilver",
    description:
      "Combat start: Gain immunity to crowd control for 45 seconds. For 18 seconds, gain 7% Attack Speed every 2 seconds.",
    additionalAttackSpeed: 1.5, // 50% attack speed
    additionalCritChance: 0.4, // 40% crit chance
  }),
  new Item({
    name: "Blue Blessing",
    description:
      "Gain 10 Mana after casting. When the holder gets a takedown, they deal 20% more damage for 12 seconds.",
    additionalAbilityPower: 60, // 60 ability power
    additionalStartingMana: 30, // 30 starting mana
    additionalAttackSpeed: 1.6, // 60% attack speed
  }),
];

export function getItemByName(name: string) {
  if (!name) {
    return "Champion name cannt be Empty";
  }

  const basicItem = basicItems.find((basicItems) => basicItems.name === name);
  const combinedItem = combinedItems.find((combinedItems) => combinedItems.name === name);
  const radiantItem = radiantItems.find((radiantItems) => radiantItems.name === name);

  if (basicItem) {
    return basicItem;
  } else if (combinedItem) {
    return combinedItem;
  } else if (radiantItem) {
    return radiantItem;
  }

  if (!basicItems || !combinedItems) {
    return "Item not found";
  }
}

// console.log(combinedItems[6])

module.exports = { getItemByName, basicItems, combinedItems, radiantItems };
