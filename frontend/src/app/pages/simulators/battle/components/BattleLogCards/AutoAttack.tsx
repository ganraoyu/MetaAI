import { useState } from 'react'
import { ChampionCard } from '../ChampionCard/ChampionCard.tsx'
import { ChampionCardDamageHover } from '../ChampionCard/ChampionCardDamageHover.tsx'

const AutoAttack = ({log, index} : {log: any, index: number}) => {
    const [hoveredDamageId, setHoveredDamageId] = useState<number | null>(null)
    const [clickedDamageId, setClickedDamageId] = useState<number | null>(null)

    const handleDamageClicked = (id: number) => {
        if(clickedDamageId === id) {
            setClickedDamageId(null)
        } else {
            setClickedDamageId(id)
        }
    }
    return (
    <div>
        <div className='bg-gradient-to-r from-red-900/40 to-red-800/20 border-l-4 border-red-600 rounded-md p-2 shadow-md'>
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-400">[{log.formattedTime}]</span>
                <span 
                className="text-xs font-bold text-red-400 bg-red-400/20 px-2 py-0.5 rounded  "
                onMouseEnter={() => setHoveredDamageId(index)}
                onMouseLeave={() => setHoveredDamageId(null)}
                onClick={() => handleDamageClicked(index)}
                >
                {log.details.damage}
                    {(hoveredDamageId === index || clickedDamageId === index) && (
                    <div className="absolute mt-1 animate-grow-in origin-top-right z-50">
                        <ChampionCardDamageHover 
                        rawDamage={log.details.damage || 0}
                        finalDamage={log.details.damage || 0}
                        armorReduction={{
                            percentage: Math.round(log.details.armorReductionPercentage || 0),
                            value: log.details.target.armor || 0
                        }}
                        magicResistReduction={{
                            percentage: Math.round(log.details.magicResistReductionPercentage || 0),
                            value: log.details.target.magicResist || 0
                        }}
                        otherModifiers={log.details.modifiers || []}
                        damageType={log.details.damageType || 'physical'}
                        />
                    </div>
                    )}
                </span>
            </div>
            <div className='grid grid-cols-3 gap-2 mb-4'>
                <div className="flex justify-end">
                    <ChampionCard 
                        champion={log.details.attacker.champion}
                        starLevel={log.details.attacker.starLevel}
                        cost={log.details.attacker.cost}
                        currentHp={log.details.attacker.currentHp || 0}
                        maxHp={log.details.attacker.maxHp || 100}
                        mana={log.details.attacker.mana || 0}
                        maxMana={log.details.attacker.maxMana || 100}
                        shield={log.details.attacker.shield || 0}                          
                        trait1={log.details.attacker.traits[0] || ''}
                        trait2={log.details.attacker.traits[1] || ''}
                        trait3={log.details.attacker.traits[2] || ''}
                        item1={log.details.attacker.items?.[0]?.name || ''}
                        item2={log.details.attacker.items?.[1]?.name || ''}
                        item3={log.details.attacker.items?.[2]?.name || ''}
                        armor={log.details.attacker.armor || 0}
                        magicResist={log.details.attacker.magicResist || 0}
                        attackDamage={log.details.attacker.attackDamage || 0}
                        attackSpeed={log.details.attacker.attackSpeed || 0}
                        critChance={log.details.attacker.critChance || 0}
                        critDamage={log.details.attacker.critDamage || 0}
                        abilityPower={log.details.attacker.abilityPower || 0}
                        damageAmp={log.details.attacker.damageAmp || 0}
                        omnivamp={log.details.attacker.omnivamp || 0}
                        reduction={log.details.attacker.reduction || 0}
                        range={log.details.attacker.range || 0}
                    />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <p className="text-xs font-bold text-red-500 animate-pulse mt-1 px-2">
                        {log.details.isCrit ? 'CRIT' : ''}
                    </p>
                </div>
                <div className="flex justify-start">
                    <ChampionCard 
                        champion={log.details.target.champion}
                        starLevel={log.details.target.starLevel}
                        currentHp={log.details.target.currentHp || 0}
                        cost={log.details.target.cost}
                        maxHp={log.details.target.maxHp || 100}
                        mana={log.details.target.mana || 0}
                        maxMana={log.details.target.maxMana || 100}
                        shield={log.details.target.shield || 0}
                        trait1={log.details.target.traits[0] || ''}
                        trait2={log.details.target.traits[1] || ''}
                        trait3={log.details.target.traits[2] || ''}
                        item1={log.details.target.items?.[0]?.name || ''}
                        item2={log.details.target.items?.[1]?.name || ''}
                        item3={log.details.target.items?.[2]?.name || ''}
                        armor={log.details.target.armor || 0}
                        magicResist={log.details.target.magicResist || 0}
                        attackDamage={log.details.target.attackDamage || 0}
                        attackSpeed={log.details.target.attackSpeed || 0}
                        critChance={log.details.target.critChance || 0}
                        critDamage={log.details.target.critDamage || 0}
                        abilityPower={log.details.target.abilityPower || 0}
                        damageAmp={log.details.target.damageAmp || 0}
                        omnivamp={log.details.target.omnivamp || 0}
                        reduction={log.details.target.reduction || 0}
                        range={log.details.target.range || 0}
                    />
                </div>
            </div>
        </div>
    </div>
    )
}

export default AutoAttack
