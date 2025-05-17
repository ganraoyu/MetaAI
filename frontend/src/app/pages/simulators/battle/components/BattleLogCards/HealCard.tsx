import { ChampionCard } from '../ChampionCard/ChampionCard'

export const HealCard = ({log}: {log: any}) => {
  return (
    <div>
        <div className='bg-gradient-to-r from-green-900/40 to-green-800/20 border-l-4 border-green-500 rounded-md p-2 shadow-md'>        
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-400">[{log.formattedTime}]</span>
                <span className="text-xs font-bold text-green-400 bg-green-400/20 px-2 py-0.5 rounded ">
                +{log.details.healAmount}
                </span>
            </div>
            <div className='grid grid-cols-3 gap-2 mb-2'>
                <div className="flex justify-end">                            
                    <ChampionCard
                        champion={log.details.healer.champion}
                        currentHp={log.details.healer.currentHp + log.details.healAmount}
                        maxHp={log.details.healer.maxHp}
                        mana={log.details.healer.mana || 0}
                        maxMana={log.details.healer.maxMana || 100}
                        shield={log.details.healer.shield || 0}
                        armor={log.details.healer.armor || 0}
                        magicResist={log.details.healer.magicResist || 0}
                        attackDamage={log.details.healer.attackDamage || 0}
                        attackSpeed={log.details.healer.attackSpeed || 0}
                        critChance={log.details.healer.critChance || 0}
                        critDamage={log.details.healer.critDamage || 0}
                        abilityPower={log.details.healer.abilityPower || 0}
                        damageAmp={log.details.healer.damageAmp || 0}
                        reduction={log.details.healer.reduction || 0}
                        range={log.details.healer.range || 0}
                    />
                </div>
                <div className="flex flex-col items-center justify-center">  
                    <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center">
                        <img src='../assets/icons/health.png' className='w-8 h-8'/>
                    </div>
                </div>
                <div className="flex justify-start">
                    <ChampionCard 
                        champion={log.details.target.champion}
                        currentHp={log.details.target.currentHp + log.details.healAmount}
                        maxHp={log.details.target.maxHp}
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
