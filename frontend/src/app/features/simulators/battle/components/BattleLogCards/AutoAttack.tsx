import { useState, useRef, useEffect } from "react";
import { ChampionCard } from "../ChampionCard/ChampionCard.tsx";
import { DamageHover } from "./CardHovers/DamageAbilityHover.tsx";

export const AutoAttack = ({ log, index }: { log: any; index: number; parentRef: any }) => {
  const [hoveredDamageId, setHoveredDamageId] = useState<number | null>(null);
  const [clickedDamageId, setClickedDamageId] = useState<number | null>(null);
  const damageRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleDamageClicked = (id: number) => {
    setClickedDamageId(clickedDamageId === id ? null : id);
    updatePosition();
  };

  const updatePosition = () => {
    if (!damageRef.current) return;
    const damageRect = damageRef.current.getBoundingClientRect();
    setPosition({ top: damageRect.top + 28, left: damageRect.right - 42 });
  };

  useEffect(() => {
    if (hoveredDamageId === index || clickedDamageId === index) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [hoveredDamageId, clickedDamageId, index]);

  return (
    <div className="font-mono">
      <div className="bg-gradient-to-r from-red-950/50 to-red-800/30 border-l-4 border-red-700 rounded-lg p-3 shadow-lg shadow-red-900/40">
        {/* Timestamp and damage row */}
        <div className="flex justify-between items-center cursor-pointer select-none">
          <span className="text-xs text-gray-400 tracking-wide">[{log.formattedTime}]</span>

          {/* Damage value */}
          <span
            ref={damageRef}
            className="text-xs text-red-500 bg-red-500/20 px-1.5 py-0.5 rounded transition-colors hover:bg-red-500/40 active:bg-red-600/50 relative"
            onMouseEnter={() => setHoveredDamageId(index)}
            onMouseLeave={() => setHoveredDamageId(null)}
            onClick={() => handleDamageClicked(index)}
          >
            -{log.details.damage}
            {(hoveredDamageId === index || clickedDamageId === index) && (
              <div
                className="fixed animate-grow-in origin-top-left z-50 cursor-auto rounded-lg shadow-xl"
                style={{ top: `${position.top}px`, left: `${position.left}px` }}
              >
                <DamageHover
                  rawDamage={-Math.round(log.details.attacker.attackDamage) || 0}
                  finalDamage={-log.details.damage || 0}
                  armorReduction={{
                    percentage: Math.round(log.details.target.armor || 0),
                    value: log.details.target.armor || 0,
                  }}
                  magicResistReduction={{
                    percentage: Math.round(log.details.target.magicResist || 0),
                    value: log.details.target.magicResist || 0,
                  }}
                  otherModifiers={log.details.modifiers || []}
                  damageType={log.details.damageType || "physical"}
                />
              </div>
            )}
          </span>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-3 gap-4 mt-3">
          {/* Attacker card */}
          <div className="flex justify-end">
            <ChampionCard
              champion={log.details.attacker.champion}
              starLevel={log.details.attacker.starLevel}
              cost={log.details.attacker.cost}
              currentHp={log.details.attacker.currentHp || 0}
              maxHp={log.details.attacker.maxHp || 100}
              mana={log.details.attacker.mana || 0}
              maxMana={log.details.attacker.abilityManaCost || 100}
              shield={log.details.attacker.shield || 0}
              trait1={log.details.attacker.traits[0] || ""}
              trait2={log.details.attacker.traits[1] || ""}
              trait3={log.details.attacker.traits[2] || ""}
              item1={log.details.attacker.items?.[0]?.name || ""}
              item2={log.details.attacker.items?.[1]?.name || ""}
              item3={log.details.attacker.items?.[2]?.name || ""}
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

          {/* Attack icon + crit */}
          <div className="flex flex-col justify-center items-center">
            <div className="w-8 h-8 rounded-full bg-red-600/40 flex items-center justify-center shadow-lg">
              <img src="../assets/icons/attack.png" className="w-5 h-5" alt="Attack icon" />
            </div>
            <p className="text-sm font-bold text-red-600 animate-pulse min-h-[1.25rem]">
              {log.details.isCrit ? "CRIT" : ""}
            </p>
          </div>

          {/* Target card */}
          <div className="flex justify-start">
            <ChampionCard
              champion={log.details.target.champion}
              starLevel={log.details.target.starLevel}
              currentHp={log.details.target.currentHp || 0}
              cost={log.details.target.cost}
              maxHp={log.details.target.maxHp || 100}
              mana={log.details.target.mana || 0}
              maxMana={log.details.target.abilityManaCost || 100}
              shield={log.details.target.shield || 0}
              trait1={log.details.target.traits[0] || ""}
              trait2={log.details.target.traits[1] || ""}
              trait3={log.details.target.traits[2] || ""}
              item1={log.details.target.items?.[0]?.name || ""}
              item2={log.details.target.items?.[1]?.name || ""}
              item3={log.details.target.items?.[2]?.name || ""}
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
  );
};
