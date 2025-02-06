class Item {
    constructor(
        name,
        description,
        additionalAttackDamage,
        additionalAttackSpeed,
        additionalManaPerAttack,
        additionalCritDamage,
        additionalCritAmp,
        additionalDamageAmp,
        reducedMaxMana
    ) {
        this.name = name;
        this.description = description;
        this.additionalAttackDamage = additionalAttackDamage;
        this.additionalAttackSpeed = additionalAttackSpeed;
        this.additionalManaPerAttack = additionalManaPerAttack;
        this.additionalCritDamage = additionalCritDamage;
        this.additionalCritAmp = additionalCritAmp;
        this.additionalDamageAmp = additionalDamageAmp;
        this.reducedMaxMana = reducedMaxMana;
    }
}
