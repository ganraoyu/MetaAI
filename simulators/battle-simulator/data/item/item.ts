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
    additionalMagicResist?: number;
    additionalHealth?: number;
    additionalAbilityPower?: number;
    sunder?: number;
    shred?: number;
    sunderRadius?: number;
    shredRadius?: number;
}

export class Item {
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
    additionalMagicResist: number;
    additionalHealth: number;
    additionalAbilityPower: number;
    sunder: number;
    shred: number;
    sunderRadius: number;
    shredRadius: number;

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
        additionalMagicResist = 0,
        additionalHealth = 0,
        additionalAbilityPower = 0,
        sunder = 0,
        shred = 0,
        sunderRadius = 0,
        shredRadius = 0,
    }: ItemProps) {
        this.name = name;
        this.description = description;
        this.additionalAttackDamage = additionalAttackDamage;
        this.additionalAttackSpeed = additionalAttackSpeed;
        this.additionalManaPerAttack = additionalManaPerAttack;
        this.additionalStartingMana = additionalStartingMana;
        this.additionalCritDamage = additionalCritDamage;
        this.additionalCritAmp = additionalCritAmp;
        this.additionalDamageAmp = additionalDamageAmp;
        this.reducedMaxMana = reducedMaxMana;
        this.additionalArmor = additionalArmor;
        this.additionalMagicResist = additionalMagicResist;
        this.additionalHealth = additionalHealth;
        this.additionalAbilityPower = additionalAbilityPower;
        this.sunder = sunder;
        this.shred = shred;
        this.sunderRadius = sunderRadius;
        this.shredRadius = shredRadius;
    }
}

// Export the Item class using module.exports
module.exports = { Item };
