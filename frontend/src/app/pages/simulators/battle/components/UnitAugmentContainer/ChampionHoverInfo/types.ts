export interface Stats {  
    abilityName: string;
    abilityDescription: string;
    range: number;
    mana: number;
    manaPerAttack: number;
    abilityManaCost: number;
    attackSpeed: number;
    attackCritChance: number;
    attackCritDamage: number;
    abilityCritChance: number;
    abilityCritDamage: number;
    damageAmp: number;
    abilityPower: number;
    durability: number;
    omnivamp: number;

    sunder: boolean;
    shred: boolean;
    wound: boolean;
    burn: boolean;
    immunity: boolean;
}

export interface StarLevelStats {
    health: number;
    armor: number;
    magicResist: number;
    attackDamage: number;

}

export interface ChampionHoverInfoProps {
    champion: string;
    cost: number;
    traits: [string, string, string];
    items?: [string?, string?, string?];
    stats: Stats;
    starLevelStats: {
    oneStar: StarLevelStats;
    twoStar: StarLevelStats;
    threeStar: StarLevelStats;
    };
    starLevel: 1 | 2 | 3;
}
