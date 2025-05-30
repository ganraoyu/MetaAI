import { ChampionCard } from '../ChampionCard/ChampionCard'

export const Ability = ({log}: {log: any}) => {
  return (
    <div>
        <div className='bg-gradient-to-r from-blue-900/40 to-blue-800/20 border-l-4 border-blue-500 rounded-md p-2 shadow-md'>
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-400">[{log.formattedTime}]</span>
                <span className="text-xs font-bold text-blue-400 bg-blue-400/20 px-2 py-0.5 rounded">
                    -{log.details.damage}
                </span>
            </div>
            <div className='grid grid-cols-3 gap-2 mb-2'>
                <div className="flex justify-end">
                <ChampionCard 
                    champion={log.details.attacker.champion}
                    currentHp={log.details.attacker.currentHp || 0}
                    maxHp={log.details.attacker.maxHp || 100}
                    mana={log.details.attacker.mana || 0}
                    maxMana={log.details.attacker.maxMana || 100}
                    shield={log.details.attacker.shield || 0}
                    armor={log.details.attacker.armor || 0}
                    magicResist={log.details.attacker.magicResist || 0}
                    attackDamage={log.details.attacker.attackDamage || 0}
                    attackSpeed={log.details.attacker.attackSpeed || 0}
                    critChance={log.details.attacker.critChance || 0}
                    critDamage={log.details.attacker.critDamage || 0}
                    abilityPower={log.details.attacker.abilityPower || 0}
                    damageAmp={log.details.attacker.damageAmp || 0}
                    reduction={log.details.attacker.reduction || 0}
                    range={log.details.attacker.range || 0}
                />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="mt-1 text-xs font-semibold text-blue-400">{log.details.ability}</div>
                </div>
                <div className="flex justify-start">
                    <ChampionCard 
                    champion={log.details.target.champion}
                    currentHp={log.details.target.currentHp || 0}
                    maxHp={log.details.target.maxHp || 100}
                    mana={log.details.target.mana || 0}
                    maxMana={log.details.target.maxMana || 100}
                    shield={log.details.target.shield || 0}
                    armor={log.details.target.armor || 0}
                    magicResist={log.details.target.magicResist || 0}
                    attackDamage={log.details.target.attackDamage || 0}
                    attackSpeed={log.details.target.attackSpeed || 0}
                    critChance={log.details.target.critChance || 0}
                    critDamage={log.details.target.critDamage || 0}
                    abilityPower={log.details.target.abilityPower || 0}
                    damageAmp={log.details.target.damageAmp || 0}
                    reduction={log.details.target.reduction || 0}
                    range={log.details.target.range || 0}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

