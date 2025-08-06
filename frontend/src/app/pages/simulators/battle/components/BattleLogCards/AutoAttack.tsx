import { useState, useRef, useEffect } from "react";
import { ChampionCard } from "../ChampionCard/ChampionCard.tsx";
import { DamageHover } from "./CardHovers/DamageAbilityHover.tsx";

export const AutoAttack = ({
  log,
  index,
}: {
  log: any;
  index: number;
  parentRef: any;
}) => {
  const [hoveredDamageId, setHoveredDamageId] = useState<number | null>(null);
  const [clickedDamageId, setClickedDamageId] = useState<number | null>(null);
  const damageRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleDamageClicked = (id: number) => {
    if (clickedDamageId === id) {
      setClickedDamageId(null);
    } else {
      setClickedDamageId(id);
      // Update position immediately when clicked
      updatePosition();
    }
  };

  const updatePosition = () => {
    if (!damageRef.current) return;

    const damageRect = damageRef.current.getBoundingClientRect();

    let left = damageRect.right - 40;
    let top = damageRect.top + 25;
    setPosition({ top, left });
  };

  useEffect(() => {
    // Only add event listeners if the hover is active
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
      <div className="bg-gradient-to-r from-red-900/40 to-red-800/20 border-l-4 border-red-600 rounded-md p-2 shadow-md">
        
        {/* Timestamp and damage value */}
        <div className="flex justify-between items-start cursor-pointer font-mono">
          <span className="text-xs text-gray-400">[{log.formattedTime}]</span>

          {/* Damage value with hover and click handlers */}
          <span
            ref={damageRef}
            className="text-xs font-bold text-red-400 bg-red-400/20 px-2 py-0.5 rounded relative"
            onMouseEnter={() => {
              setHoveredDamageId(index);
              updatePosition();
            }}
            onMouseLeave={() => setHoveredDamageId(null)}
            onClick={() => handleDamageClicked(index)}
          >
            -{log.details.damage}

            {/* Hover popup showing damage breakdown */}
            {(hoveredDamageId === index || clickedDamageId === index) && (
              <div
                className="fixed animate-grow-in origin-top-left z-50 cursor-auto"
                style={{
                  top: `${position.top}px`,
                  left: `${position.left}px`,
                }}
              >
                <DamageHover
                  rawDamage={
                    -Math.round(log.details.attacker.attackDamage) || 0
                  }
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

        {/* Main grid: attacker card, attack icon + crit, target card */}
        <div className="grid grid-cols-3 gap-2">
          
          {/* Attacker's champion card aligned right */}
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

          {/* Attack icon and crit indicator centered */}
          <div className="flex flex-col justify-center items-center">
            <div className="w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center">
              <img src="../assets/icons/attack.png" className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-red-500 animate-pulse mt-1 px-2 min-h-[1rem]">
              {log.details.isCrit ? "CRIT" : ""}
            </p>
          </div>

          {/* Target's champion card aligned left */}
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
