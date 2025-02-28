// Group related properties into nested interfaces
interface CombatStats {
    additionalAttackDamage?: number;
    additionalAttackSpeed?: number;
    additionalCritChance?: number;
    additionalCritDamage?: number;
    additionalDamageAmp?: number;
}

interface DefensiveStats {
    additionalHealth?: number;
    additionalPercentageHealth?: number;
    additionalArmor?: number;
    additionalMagicResist?: number;
    additionalDurability?: number;
}

interface AbilityStats {
    additionalAbilityPower?: number;
    additionalManaPerAttack?: number;
    additionalStartingMana?: number;
    reducedMaxMana?: number;
    abilityCritStrike?: boolean;
}

interface SpecialEffects {
    sunder?: boolean;
    shred?: boolean;
    sunderAmount?: number;
    shredAmount?: number;
    sunderRadius?: number;
    shredRadius?: number;
    attackSpeedStacking?: boolean;
    additionalAttackSpeedPerStack?: number;
    additionalAttackRange?: number;
}

interface ItemProps extends CombatStats, DefensiveStats, AbilityStats, SpecialEffects {
    name: string;
    description: string;
}

export class Item {
    // Basic properties
    readonly name: string;
    readonly description: string;

    // Combat stats
    readonly additionalAttackDamage: number;
    readonly additionalAttackSpeed: number;
    readonly additionalCritChance: number;
    readonly additionalCritDamage: number;
    readonly additionalDamageAmp: number;

    // Defensive stats
    readonly additionalHealth: number;
    readonly additionalPercentageHealth: number;
    readonly additionalArmor: number;
    readonly additionalMagicResist: number;
    readonly additionalDurability: number;

    // Ability related
    readonly additionalAbilityPower: number;
    readonly additionalManaPerAttack: number;
    readonly additionalStartingMana: number;
    readonly reducedMaxMana: number;
    readonly abilityCritStrike: boolean;

    // Special effects
    readonly sunder: boolean;
    readonly shred: boolean;
    readonly sunderAmount: number;
    readonly shredAmount: number;
    readonly sunderRadius: number;
    readonly shredRadius: number;
    readonly attackSpeedStacking: boolean;
    readonly additionalAttackSpeedPerStack: number;
    readonly additionalAttackRange: number;

    constructor({
        // Basic properties
        name,
        description,
        
        // Combat stats
        additionalAttackDamage = 0,
        additionalAttackSpeed = 0,
        additionalCritChance = 0,
        additionalCritDamage = 0,
        additionalDamageAmp = 0,
        
        // Defensive stats
        additionalHealth = 0,
        additionalPercentageHealth = 0,
        additionalArmor = 0,
        additionalMagicResist = 0,
        additionalDurability = 0,
        
        // Ability related
        additionalAbilityPower = 0,
        additionalManaPerAttack = 0,
        additionalStartingMana = 0,
        reducedMaxMana = 0,
        abilityCritStrike = false,
        
        // Special effects
        sunder = false,
        shred = false,
        sunderAmount = 0,
        shredAmount = 0,
        sunderRadius = 0,
        shredRadius = 0,
        attackSpeedStacking = false,
        additionalAttackSpeedPerStack = 0,
        additionalAttackRange = 0
    }: ItemProps) {
        // Basic properties
        this.name = name;
        this.description = description;

        // Combat stats
        this.additionalAttackDamage = additionalAttackDamage;
        this.additionalAttackSpeed = additionalAttackSpeed;
        this.additionalCritChance = additionalCritChance;
        this.additionalCritDamage = additionalCritDamage;
        this.additionalDamageAmp = additionalDamageAmp;

        // Defensive stats
        this.additionalHealth = additionalHealth;
        this.additionalPercentageHealth = additionalPercentageHealth;
        this.additionalArmor = additionalArmor;
        this.additionalMagicResist = additionalMagicResist;
        this.additionalDurability = additionalDurability;

        // Ability related
        this.additionalAbilityPower = additionalAbilityPower;
        this.additionalManaPerAttack = additionalManaPerAttack;
        this.additionalStartingMana = additionalStartingMana;
        this.reducedMaxMana = reducedMaxMana;
        this.abilityCritStrike = abilityCritStrike;

        // Special effects
        this.sunder = sunder;
        this.shred = shred;
        this.sunderAmount = sunderAmount;
        this.shredAmount = shredAmount;
        this.sunderRadius = sunderRadius;
        this.shredRadius = shredRadius;
        this.attackSpeedStacking = attackSpeedStacking;
        this.additionalAttackSpeedPerStack = additionalAttackSpeedPerStack;
        this.additionalAttackRange = additionalAttackRange;
    }
}

module.exports = { Item };