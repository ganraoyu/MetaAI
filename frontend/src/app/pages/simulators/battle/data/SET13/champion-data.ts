export const champions = [
    {
        name: 'Amumu',
        image: '../assets/SET13/champions/centered/Amumu.png',
        cost: 1,
        shield: 0,
        movementSpeed: 550, 
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
        abilityDescription: 'Passive: Amumu reduces all incoming damage. Every second, emit sparks that deal magic damage to adjacent enemies. Damage Reduction: 12/15/25 Damage: 10/15/25 AP',
        range: 5,
        mana: 1,
        manaPerAttack: 0,
        abilityManaCost: 70,
        attackCritChance: 50,
        attackCritDamage: 1.40,
        abilityCritChance: 0,
        abilityCritDamage: 0,
        damageAmp: 1,
        sunder: false,
        shred: false,
        wound: false,
        burn:false,
        immunity: false,
        abilityPower: 100,
        durability: 0,
        omnivamp: 0,
        items: [],
    },
    {
        name: 'Darius',
        image: '../assets/SET13/champions/centered/Darius.png',
        cost: 1,
        shield: 0,
        movementSpeed: 550,
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
                ability: { reduction: 18, damage: 263, magicDamage: 0, healing: 175 },
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
        immunity: false,
        omnivamp: 0, 
        durability: 0,
        items: [],
    },
    {
        name: 'Akali',
        image: '../assets/SET13/champions/centered/Akali.png',
        cost: 2,
        shield: 2000,
        movementSpeed: 550,
        traitsList: ['Conqueror', 'Quickstriker'],
        statsByStarLevel: {
            1: { 
                hp: 700, 
                attackDamage: 45, 
                armor: 45, 
                magicResist: 45,  
                ability: { reduction: 0, damage: 0, magicDamage: 368, healing: 0 },
            },
            2: { 
                hp: 1260, 
                attackDamage: 81, 
                armor: 45,  
                magicResist: 45,  
                ability: { reduction: 0, damage: 0, magicDamage: 414, healing: 0 },
            },
            3: { 
                hp: 2520, 
                attackDamage: 162, 
                armor: 45,
                magicResist: 45,
                ability: { reduction: 0, damage: 0, magicDamage: 630, healing: 0 },
            }
        },
        attackSpeed: 0.75,
        abilityName: 'Shuriken Flip',
        abilityDescription: 'Akali dashes through enemies, dealing damage to each target she passes.',
        range: 1,
        mana: 0,
        manaPerAttack: 10,
        abilityManaCost: 55,
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
        immunity: false,
        durability: 0,
        omnivamp: 12,
        items: [],
    },
    {
        name: 'Ambessa',
        cost: 4,
        image: '../assets/SET13/champions/centered/Ambessa.png',
        abilityName: 'Unrelenting Huntress',
        abilityDescription: 'Ambessa switches between two stances on cast: Chains: Gain +1 Range. Attacks deal physical damage. On cast, dash to target and strike in a half-circle, dealing (AD) physical damage to enemies hit. Fists: Gain Omnivamp and attack twice as fast. On cast, briefly Stun target before slamming them into the ground, dealing (AD) physical damage, then dash away. Chains damage: 150/150/350% AD Fists Omnivamp: 25/25/45% AP',
    },
    {
        name: 'Blitzcrank',
        cost: 3,
        image: '../assets/SET13/champions/centered/Blitzcrank.png',
        abilityName: 'Obsolete Technology', 
        abilityDescription: 'Passive: After surviving damage, deal 0.03% of the damage absorbed as magic damage to target. Active: Blitzcrank gains a Shield for 4 seconds. Shock the nearest 3 enemies for magic damage and reduce their damage by 0.1% for 4 seconds. Shield: 450/470/520 AP Damage: 40/60/100 AP'
    },
    {
        name: 'Caitlyn',
        cost: 5,
        image: '../assets/SET13/champions/centered/Caitlyn.png',
        abilityName: ''
    },
    {
        name: 'Cassiopeia',
        cost: 3,
        image: '../assets/SET13/champions/centered/Cassiopeia.png',
        abilityName: 'Thorned Miasma',
        abilityDescription: 'Cassiopeia blasts a target and deals magic damage. Every third cast, splash miasma to 2 enemies within 3 hexes, dealing magic damage to each. Damage: 230/345/550 AP Third Cast Damage: 160/240/385 AP'
    },
    {
        name: 'Ekko',
        cost: 4,
        image: '../assets/SET13/champions/centered/Ekko.png',
        abilityName: 'Splitting Seconds',
        abilityDescription: "Summon an assault of afterimages that deals magic damage to the target and magic damage to other nearby enemies. Afterimages reduce their target's Magic Resist by 5 for the rest of combat. Damage: 285% / 430% / 1200% (AP). Secondary Damage: 145% / 215% / 400% (AP). Additional Targets: 2 / 2 / 4."
    },
    {
        name: 'Elise',
        cost: 4,
        image: '../assets/SET13/champions/centered/Elise.png',
        abilityName: 'Cocoon',
        abilityDescription: 'Elise jumps to a nearby hex and web all enemies within 2 hexes, stunning them for some seconds and dealing magic damage and healing herself Stun: 1.75/2/8 sec Melee Damage: 120/180/1200% AP Melee Heal: 400/450/2000% AP Ranged Damage: 220/330/1000% AP Secondary Damage: 90/135/400% AP'
    },
    {
        name: 'Heimerdinger',
        cost: 4,
        image: '../assets/SET13/champions/centered/Heimerdinger.png'
    },
    {
        name: 'Illaoi',
        cost: 4,
        image: '../assets/SET13/champions/centered/Illaoi.png'
    },
    {
        name: 'Irelia',
        cost: 1,
        image: '../assets/SET13/champions/centered/Irelia.png',
    },
    {
        name: 'Jayce',
        cost: 5,
        image: '../assets/SET13/champions/centered/Jayce.png'
    },
    {
        name: 'Jinx',
        cost: 5,
        image: '../assets/SET13/champions/centered/Jinx.png'
    },
    {
        name: 'Kog\'Maw',
        cost: 3,
        image: '../assets/SET13/champions/centered/KogMaw.png'
    },
    {
        name: 'LeBlanc',
        cost: 5,
        image: '../assets/SET13/champions/centered/LeBlanc.png'
    },
    {
        name: 'Leona',
        cost: 2,
        image: '../assets/SET13/champions/centered/Leona.png'
    },
    {
        name: 'Loris',
        cost: 3,
        image: '../assets/SET13/champions/centered/Loris.png'
    },
    {
        name: 'Malzahar',
        cost: 5,
        image: '../assets/SET13/champions/centered/Malzahar.png'
    },
    {
        name: 'Mel',
        cost: 6,
        image: '../assets/SET13/champions/centered/Mel.png'
    },
    {
        name: 'Morgana',
        cost: 1,
        image: '../assets/SET13/champions/centered/Morgana.png'
    },
    {
        name: 'Nocturne',
        cost: 2,
        image: '../assets/SET13/champions/centered/Nocturne.png'
    },
    {
        name: 'Mordekaiser',
        cost: 5,
        image: '../assets/SET13/champions/centered/Mordekaiser.png'
    },
    {
        name: 'Corki',
        cost: 4,
        image: '../assets/SET13/champions/centered/Corki.png',
        abilityName: 'Broadside Barrage',
        abilityDescription: 'Corki locks onto a target and strafe to a nearby position, unleashing a barrage of missiles split between the target and all enemies within two hexes. Each missile deals physical damage and reduces Armor by 1. Every 7th missile deals physical damage and reduces Armor by 1 Missiles Barrage: 21/21/35 Damage: 0.35/0.35/0.6 + 6/9/36 AD Third Damage: 0.35/0.35/0.6 + 6/9/36 AD',
    },
    {
        name: 'Dr Mundo',
        cost: 4,
        image: '../assets/SET13/champions/centered/DrMundo.png',
        abilityName: 'Maximum Dosage',
        abilityDescription: 'Dr. Mundo becomes energized and heals himself over 2 seconds. While energized, deal magic damage to a nearby enemy each second. Afterwards, deal (health) magic damage to all enemies within 2 hexes.Experiment Bonus: On takedown, gain max Health for the rest of combat. Heal: 500/600/1000 + 0.25 (Health & AP) Damage: 80/120/800 AP Health Damage: 0.12/0.12/0.4'
    },
    {
        name: 'Twitch',
        cost: 4,
        image: '../assets/SET13/champions/centered/Twitch.png'
    },
    {
        name: 'Vi',
        cost: 4,
        image: '../assets/SET13/champions/centered/Vi.png'  
    },
    {
        name: 'Zoe',
        cost: 4,
        image: '../assets/SET13/champions/centered/Zoe.png'
    },
    {
        name: 'Ezreal',
        cost: 3,
        image: '../assets/SET13/champions/centered/Ezreal.png',
        abilityName: 'Essence Flux',
        abilityDescription: 'Ezreal fires a shot towards current target that deals physical damage to all enemies within 1 hex. Then, deal physical damage to the unit in the center of the blast. Damage: 1.4 + 20/30/50 AD Center Damage: 1.4 + 20/30/50 AD'
    },
    {
        name: 'Gangplank',
        cost: 3,
        image: '../assets/SET13/champions/centered/Gangplank.png'
    },
    {
        name: 'Nami',
        cost: 3,
        image: '../assets/SET13/champions/centered/Nami.png'
    },
    {
        name: 'Nunu & Willump',
        cost: 3,
        image: '../assets/SET13/champions/centered/NunuWillump.png'
    },
    {
        name: 'Scar',
        cost: 3,
        image: '../assets/SET13/champions/centered/Scar.png'
    },
    {
        name: 'Swain',
        cost: 3,
        image: '../assets/SET13/champions/centered/Swain.png'
    },
    {
        name: 'Twisted Fate',
        cost: 3,
        image: '../assets/SET13/champions/centered/TwistedFate.png'
    },
    {
        name: 'Camille',
        cost: 2,
        image: '../assets/SET13/champions/centered/Camille.png',
        abilityName: 'Adaptive Strike',
        abilityDescription: 'Camille kicks the target, dealing Adaptive Damage. Heal for 0.4% of the damage dealt.Adaptive Damage: Uses the damage type the target resists less Adaptive Damage: 245/245/265%',
    },
    {
        name: 'Rell',
        cost: 2,
        image: '../assets/SET13/champions/centered/Rell.png'
    },
    {
        name: 'Renata Glasc',
        cost: 2,
        image: '../assets/SET13/champions/centered/RenataGlasc.png'
    },
    {
        name: 'Sett',
        cost: 2,
        image: '../assets/SET13/champions/centered/Sett.png'    
    },
    {
        name: 'Tristana',
        cost: 2,
        image: '../assets/SET13/champions/centered/Tristana.png'
    },
    {
        name: 'Urgot',
        cost: 2,
        image: '../assets/SET13/champions/centered/Urgot.png'
    },
    {
        name: 'Vander',
        cost: 2,
        image: '../assets/SET13/champions/centered/Vander.png'
    },
    {
        name: 'Vladimir',
        cost: 2,
        image: '../assets/SET13/champions/centered/Vladimir.png'
    },
    {
        name: 'Zeri',
        cost: 2,
        image: '../assets/SET13/champions/centered/Zeri.png'
    },
    {
        name: 'Ziggs',
        cost: 2,
        image: '../assets/SET13/champions/centered/Ziggs.png'
    },
    {
        name: 'Draven',
        cost: 1,
        image: '../assets/SET13/champions/centered/Draven.png',
        abilityName: 'Spinning Axe',
        abilityDescription: 'Passive: If Draven has an empowered axe in hand, it replaces his next attack, dealing physical damage. Empowered axes return to Draven after hitting an enemy. Active: Spin an empowered axe. Damage: 10% / 15% / 25% (AP) + 140% / 140% / 150% / 150% (AD)'
    },
    {
        name: 'Lux',
        cost: 1,
        image: '../assets/SET13/champions/centered/Lux.png'
    },
    {
        name: 'Rumble',
        cost: 5,
        image: '../assets/SET13/champions/centered/Rumble.png'
    },
    {
        name: 'Zyra',
        cost: 1,
        image: '../assets/SET13/champions/centered/Zyra.png'
    },
    {
        name: 'Singed',
        cost: 1,
        image: '../assets/SET13/champions/centered/Singed.png'
    },
    {
        name: 'Steb',
        cost: 1,
        image: '../assets/SET13/champions/centered/Steb.png'
    },
    {
        name: 'Maddie',
        cost: 1,
        image: '../assets/SET13/champions/centered/Maddie.png'
    },
    {
        name: 'Trundle',
        cost: 1,
        image: '../assets/SET13/champions/centered/Trundle.png'
    },
    {
        name: 'Vex',
        cost: 1,
        image: '../assets/SET13/champions/centered/Vex.png'
    },
    {
        name: 'Violet',
        cost: 1,
        image: '../assets/SET13/champions/centered/Violet.png'
    },
    {
        name: 'Viktor',
        cost: 6,
        image: '../assets/SET13/champions/centered/Viktor.png'
    },
    {
        name: 'Sevika',
        cost: 5,
        image: '../assets/SET13/champions/centered/Sevika.png'
    },
    {
        name: 'Powder',
        cost: 1,
        image: '../assets/SET13/champions/centered/Powder.png'
    },
    {
        name: 'Renni',
        cost: 3,
        image: '../assets/SET13/champions/centered/Renni.png'
    },
    {
        name: 'Smeech',
        cost: 3,
        image: '../assets/SET13/champions/centered/Smeech.png'
    },
    {
        name: 'Garen',
        cost: 4,
        image: '../assets/SET13/champions/centered/Garen.png'
    },
    {
        name: 'Silco',
        cost: 4,
        image: '../assets/SET13/champions/centered/Silco.png'
    },
];

