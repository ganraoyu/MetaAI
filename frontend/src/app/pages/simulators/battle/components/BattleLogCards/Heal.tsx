import { useState, useRef, useEffect } from "react";
import { ChampionCard } from "../ChampionCard/ChampionCard";
import { HealHover } from "./CardHovers/HealHover";

export const Heal = ({ log, index }: { log: any; index: number }) => {
  const [hoveredHealId, setHoveredHealId] = useState<number | null>(null);
  const [clickedHoverId, setClickedHoverId] = useState<number | null>(null);
  const healRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleHealClicked = (id: number) => {
    if (clickedHoverId === id) {
      setClickedHoverId(null);
    } else {
      setClickedHoverId(id);
      updatePosition();
    }
  };

  const updatePosition = () => {
    if (!healRef.current) return;
    const rect = healRef.current.getBoundingClientRect();
    setPosition({ top: rect.top + 28, left: rect.right - 42 });
  };

  useEffect(() => {
    if (hoveredHealId === index || clickedHoverId === index) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [hoveredHealId, clickedHoverId, index]);

  return (
    <div className="font-mono">
      <div className="bg-gradient-to-r from-green-950/50 to-green-800/30 border-l-4 border-green-700 rounded-lg p-3 shadow-lg shadow-green-900/40 mb-2">
        {/* Timestamp and Heal Value */}
        <div className="flex justify-between items-center cursor-pointer select-none">
          <span className="text-xs text-gray-400 tracking-wide">[{log.formattedTime}]</span>

          <span
            ref={healRef}
            className="text-xs text-green-400 bg-green-400/20 px-1.5 py-0.5 rounded transition-colors hover:bg-green-400/40 active:bg-green-500/50 relative"
            onMouseEnter={() => { setHoveredHealId(index); updatePosition(); }}
            onMouseLeave={() => setHoveredHealId(null)}
            onClick={() => handleHealClicked(index)}
          >
            +{log.details.healAmount}
            {(hoveredHealId === index || clickedHoverId === index) && (
              <div
                className="fixed animate-grow-in origin-top-left z-50 cursor-auto rounded-lg shadow-xl"
                style={{ top: `${position.top}px`, left: `${position.left}px` }}
              >
                <HealHover
                  healAmount={log.details.healAmount}
                  source={log.details.source}
                />
              </div>
            )}
          </span>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-3 gap-4 mt-2">
          {/* Healer card */}
          <div className="flex justify-end">
            <ChampionCard
              champion={log.details.healer.champion}
              starLevel={log.details.healer.starLevel}
              cost={log.details.healer.cost}
              currentHp={log.details.healer.currentHp + log.details.healAmount}
              maxHp={log.details.healer.maxHp}
              mana={log.details.healer.mana || 0}
              maxMana={log.details.healer.maxMana || 100}
              shield={log.details.healer.shield || 0}
              trait1={log.details.healer.traits?.[0] || ""}
              trait2={log.details.healer.traits?.[1] || ""}
              trait3={log.details.healer.traits?.[2] || ""}
              item1={log.details.healer.items?.[0]?.name || ""}
              item2={log.details.healer.items?.[1]?.name || ""}
              item3={log.details.healer.items?.[2]?.name || ""}
              armor={log.details.healer.armor || 0}
              magicResist={log.details.healer.magicResist || 0}
              attackDamage={log.details.healer.attackDamage || 0}
              attackSpeed={log.details.healer.attackSpeed || 0}
              critChance={log.details.healer.critChance || 0}
              critDamage={log.details.healer.critDamage || 0}
              abilityPower={log.details.healer.abilityPower || 0}
              damageAmp={log.details.healer.damageAmp || 0}
              omnivamp={log.details.healer.omnivamp || 0}
              reduction={log.details.healer.reduction || 0}
              range={log.details.healer.range || 0}
            />
          </div>

          {/* Heal icon */}
          <div className="flex flex-col justify-center items-center">
            <div className="w-8 h-8 rounded-full bg-green-600/40 flex items-center justify-center shadow-lg">
              <img src="../assets/icons/health.png" className="w-5 h-5" alt="Heal icon" />
            </div>
            <p className="text-sm font-bold text-green-500 min-h-[1.25rem]">{log.details.healer.source}</p>
          </div>

          {/* Target card */}
          <div className="flex justify-start">
            <ChampionCard
              champion={log.details.target.champion}
              starLevel={log.details.target.starLevel}
              cost={log.details.target.cost}
              currentHp={log.details.target.currentHp + log.details.healAmount}
              maxHp={log.details.target.maxHp}
              mana={log.details.target.mana || 0}
              maxMana={log.details.target.maxMana || 100}
              shield={log.details.target.shield || 0}
              trait1={log.details.target.traits?.[0] || ""}
              trait2={log.details.target.traits?.[1] || ""}
              trait3={log.details.target.traits?.[2] || ""}
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
