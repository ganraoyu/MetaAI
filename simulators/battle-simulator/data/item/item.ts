interface ItemProps {
    name: string;
    description: string;
    additionalAttackDamage?: number;
    additionalAttackSpeed?: number;
    additionalManaPerAttack?: number;
    additionalCritDamage?: number;
    additionalCritAmp?: number;
    additionalDamageAmp?: number;
    reducedMaxMana?: number;
    additionalStartingMana?: number;
    additionalArmor?: number;
    additionalMagicResistance?: number;
    additionalHealth?: number;
    additionalAbilityPower?: number;
    sunder?: number;
    shred?: number;
}

class Item {
    name: string;
    description: string;
    additionalAttackDamage: number;
    additionalAttackSpeed: number;
    additionalManaPerAttack: number;
    additionalCritDamage: number;
    additionalCritAmp: number;
    additionalDamageAmp: number;
    reducedMaxMana: number;
    additionalStartingMana: number;
    additionalArmor: number;
    additionalMagicResistance: number;
    additionalHealth: number;
    additionalAbilityPower: number;
    sunder: number;
    shred: number;

    constructor({
        name,
        description,
        additionalAttackDamage = 0,
        additionalAttackSpeed = 0,
        additionalManaPerAttack = 0,
        additionalCritDamage = 0,
        additionalCritAmp = 0,
        additionalDamageAmp = 0,
        reducedMaxMana = 0,
        additionalStartingMana = 0,
        additionalArmor = 0,
        additionalMagicResistance = 0,
        additionalHealth = 0,
        additionalAbilityPower = 0,
        sunder = 0,
        shred = 0
    }: ItemProps) {
        // Basic attributes
        this.name = name;
        this.description = description;

        // Offensive stats
        this.additionalAttackDamage = additionalAttackDamage;
        this.additionalAttackSpeed = additionalAttackSpeed;
        this.additionalManaPerAttack = additionalManaPerAttack;
        this.additionalStartingMana = additionalStartingMana;
        this.additionalCritDamage = additionalCritDamage;
        this.additionalCritAmp = additionalCritAmp;
        this.additionalDamageAmp = additionalDamageAmp;

        // Defensive stats
        this.reducedMaxMana = reducedMaxMana;
        this.additionalArmor = additionalArmor;
        this.additionalMagicResistance = additionalMagicResistance;
        this.additionalHealth = additionalHealth;

        // Ability-related stats
        this.additionalAbilityPower = additionalAbilityPower;
        this.sunder = sunder;
        this.shred = shred;
    }
}

export { Item };
