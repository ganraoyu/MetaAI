interface ItemProps {
    name: string;
    description: string;
    additionalAttackDamage?: number;
    additionalAttackSpeed?: number;
    additionalManaPerAttack?: number;
    additionalCritDamage?: number;
    additionalCritChance?: number;
    additionalDamageAmp?: number;
    reducedMaxMana?: number;
    additionalStartingMana?: number;
    additionalArmor?: number;
    additionalMagicResist?: number;
    additionalHealth?: number;
    additionalAbilityPower?: number;
    additionalOmniVamp?: number;
    additionalDurability?: number;
    additionalAttackRange?: number;
    sunder?: number;
    shred?: number;
    sunderRadius?: number;
    shredRadius?: number;
    attackSpeedStacking?: boolean;
    additionalAttackSpeedPerStack?: number;
}

export class Item {
    name: string;
    description: string;
    additionalAttackDamage: number;
    additionalAttackSpeed: number;
    additionalManaPerAttack: number;
    additionalCritDamage: number;
    additionalCritChance: number;
    additionalDamageAmp: number;
    reducedMaxMana: number;
    additionalStartingMana: number;
    additionalArmor: number;
    additionalMagicResist: number;
    additionalHealth: number;
    additionalAbilityPower: number;
    additionalOmniVamp: number;
    additionalDurability: number;
    additionalAttackRange: number;  
    sunder: number;
    shred: number;
    sunderRadius: number;
    shredRadius: number;
    attackSpeedStacking: boolean;
    additionalAttackSpeedPerStack: number;

    constructor({
        name,
        description,
        additionalAttackDamage = 0,
        additionalAttackSpeed = 0,
        additionalManaPerAttack = 0,
        additionalCritDamage = 0,
        additionalCritChance = 0,
        additionalDamageAmp = 0,
        reducedMaxMana = 0,
        additionalStartingMana = 0,
        additionalArmor = 0,
        additionalMagicResist = 0,
        additionalHealth = 0,
        additionalAbilityPower = 0,
        additionalOmniVamp = 0,
        additionalDurability = 0,
        additionalAttackRange = 0,
        sunder = 0,
        shred = 0,
        sunderRadius = 0,
        shredRadius = 0,
        attackSpeedStacking = false,
        additionalAttackSpeedPerStack = 0
    }: ItemProps) {
        this.name = name;
        this.description = description;
        this.additionalAttackDamage = additionalAttackDamage;
        this.additionalAttackSpeed = additionalAttackSpeed;
        this.additionalManaPerAttack = additionalManaPerAttack;
        this.additionalStartingMana = additionalStartingMana;
        this.additionalCritDamage = additionalCritDamage;
        this.additionalCritChance = additionalCritChance;
        this.additionalDamageAmp = additionalDamageAmp;
        this.reducedMaxMana = reducedMaxMana;
        this.additionalArmor = additionalArmor;
        this.additionalMagicResist = additionalMagicResist;
        this.additionalHealth = additionalHealth;
        this.additionalAbilityPower = additionalAbilityPower;
        this.additionalOmniVamp = additionalOmniVamp;
        this.additionalDurability = additionalDurability;
        this.additionalAttackRange = additionalAttackRange
        this.sunder = sunder;
        this.shred = shred;
        this.sunderRadius = sunderRadius;
        this.shredRadius = shredRadius;
        this.attackSpeedStacking = attackSpeedStacking;
        this.additionalAttackSpeedPerStack = additionalAttackSpeedPerStack;
    }
}

// Export the Item class using module.exports
module.exports = { Item };
