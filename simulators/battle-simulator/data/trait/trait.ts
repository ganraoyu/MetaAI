interface TraitStats {
    description?: string;   
    additionalAttackDamage?: number;
    additionalTrueDamage?: number;
    addtionalAttackSpeed?: number;
    additionalManaPerAttack?: number;
    additionalCritDamage?: number;
    additionalCritAmp?: number;
    additionalDamageAmp?: number;
    reducedMaxMana?: number;
    additionalStartingMana?: number;
    additionalArmor?: number;
    additionalMagicResistance?: number;
    additionalDamageReduction?: number;
    additionalHealth?: number;
    additionalAbilityPower?: number;
    sunder?: number;
    shred?: number;

}

interface TraitProps {
    name: string;
    level: number;
    statsByLevel: StatsByLevel;
}

type StatsByLevel = {
    [level: number]: TraitStats;
};

export class Trait {
    name: string;

    level: number;
    statsByLevel: StatsByLevel;
    
    constructor({ name, level, statsByLevel }: TraitProps) {
        this.name = name;
        this.level = level;
        this.statsByLevel = statsByLevel;
    }
    
    getCurrentLevelStats(): TraitStats {
        const defaultStats: TraitStats = {
            description: undefined,
            additionalAttackDamage: 0,
            additionalTrueDamage: 0,
            addtionalAttackSpeed: 0,
            additionalManaPerAttack: 0,
            additionalCritDamage: 0,
            additionalCritAmp: 0,
            additionalDamageAmp: 0,
            reducedMaxMana: 0,
            additionalStartingMana: 0,
            additionalArmor: 0,
            additionalMagicResistance: 0,
            additionalDamageReduction: 0,
            additionalHealth: 0,
            additionalAbilityPower: 0,
            sunder: 0,
            shred: 0,
        };

        return { ...defaultStats, ...this.statsByLevel[this.level] };
    }
}

module.exports = { Trait };
