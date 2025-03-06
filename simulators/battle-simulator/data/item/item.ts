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
    externalAttackDamage?: number;
    externalMagicDamage?: number;

    reduction?: boolean;
    heal?: boolean;
    shield?: boolean;
    sunder?: boolean;
    shred?: boolean;
    reductionAmount?: number;
    healAmount?: number;
    shieldAmount?: number;
    shieldDuration?: number;
    sunderAmount?: number;
    shredAmount?: number;

    sunderRadius?: number;
    shredRadius?: number;
    attackSpeedStacking?: boolean;
    additionalAttackSpeedPerStack?: number;
    additionalAttackRange?: number;
}

export interface ItemProps extends CombatStats, DefensiveStats, AbilityStats, SpecialEffects {
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
    readonly externalAttackDamage: number;
    readonly externalMagicDamage: number;

    readonly reduction: boolean;
    readonly heal: boolean;
    readonly shield: boolean;
    readonly sunder: boolean;
    readonly shred: boolean;
    readonly reductionAmount: number;
    readonly healAmount: number;
    readonly shieldAmount: number;
    readonly shieldDuration: number;
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
        externalAttackDamage = 0,
        externalMagicDamage = 0,
        
        reduction = false,
        heal = false,
        shield = false,
        sunder = false,
        shred = false,
        reductionAmount = 0,
        healAmount = 0,
        shieldAmount = 0,
        shieldDuration = 0,
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
        this.externalAttackDamage = externalAttackDamage;
        this.externalMagicDamage = externalMagicDamage;
        this.reduction = reduction;
        this.heal = heal;
        this.shield = shield;
        this.sunder = sunder;
        this.shred = shred;
        this.reductionAmount = reductionAmount;
        this.healAmount = healAmount;
        this.shieldAmount = shieldAmount;
        this.shieldDuration = shieldDuration;
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