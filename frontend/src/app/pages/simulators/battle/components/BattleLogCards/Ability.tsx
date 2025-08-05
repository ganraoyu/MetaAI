import { useState, useRef, useEffect } from 'react'
import { ChampionCard } from '../ChampionCard/ChampionCard'
import { DamageHover } from './CardHovers/DamageAbilityHover.tsx'

export const Ability = ({log, index}: {log: any, index: number}) => {
  const [hoveredDamageId, setHoveredDamageId] = useState<number | null>(null)
  const [clickedDamageId, setClickedDamageId] = useState<number | null>(null)
  const damageRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleDamageClicked = (id: number) => {
    if (clickedDamageId === id) {
      setClickedDamageId(null);
    } else {
      setClickedDamageId(id);
      updatePosition();
    }
  }

  const updatePosition = () => {
    if (!damageRef.current) return;
    
    const damageRect = damageRef.current.getBoundingClientRect();

    let left = damageRect.right - 40;
    let top = damageRect.top + 25;
    setPosition({ top, left });
  };

  useEffect(() => {
    // Add event listeners for scroll and resize when hover or click is active
    if (hoveredDamageId === index || clickedDamageId === index) {
      updatePosition();

      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [hoveredDamageId, clickedDamageId, index]);

  return (
    <div>
      {/* Outer container with gradient background and border */}
      <div className='bg-gradient-to-r from-blue-900/40 to-blue-800/20 border-l-4 border-blue-500 rounded-md p-2 shadow-md'>
        
        {/* Header row: timestamp and damage value */}
        <div className="flex justify-between items-start">
          <span className="text-xs text-gray-400">[{log.formattedTime}]</span>

          {/* Damage value with hover and click handlers */}
          <span 
            ref={damageRef}
            className="text-xs font-bold text-blue-400 bg-blue-400/20 px-2 py-0.5 rounded cursor-pointer"
            onMouseEnter={() => { setHoveredDamageId(index); updatePosition(); }}
            onMouseLeave={() => setHoveredDamageId(null)}
            onClick={() => handleDamageClicked(index)}
          >
            -{log.details.damage}

            {/* Hover popup showing detailed damage breakdown */}
            {(hoveredDamageId === index || clickedDamageId === index) && (
              <div 
                className="fixed animate-grow-in origin-top-left z-50 cursor-auto"
                style={{ 
                  top: `${position.top}px`, 
                  left: `${position.left}px` 
                }}
              >
                <DamageHover 
                  rawDamage={-Math.round(log.details.attacker.abilityPower) || 0}
                  finalDamage={-log.details.damage || 0}
                  armorReduction={{
                    percentage: 0,
                    value: 0
                  }}
                  magicResistReduction={{
                    percentage: Math.round(log.details.target.magicResist || 0),
                    value: log.details.target.magicResist || 0
                  }}
                  otherModifiers={log.details.modifiers || []}
                  damageType="magic"
                />
              </div>
            )}
          </span>
        </div>

        {/* Main grid: attacker card, ability icon + name, target card */}
        <div className='grid grid-cols-3 gap-2'>
          
          {/* Attacker's champion card aligned right */}
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

          {/* Ability icon and ability name centered */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
             <img src="../assets/icons/abilitypower.png" className="w-4 h-4" />
            </div>
            <div className="mt-1 text-xs font-semibold text-blue-400">{log.details.ability}</div>
          </div>

          {/* Target's champion card aligned left */}
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
