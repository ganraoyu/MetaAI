import { useState, useRef, useEffect } from "react";
import { ChampionCard } from "../ChampionCard/ChampionCard";
import { BurnHover } from "./CardHovers/BurnHover";
import { FaFire } from "react-icons/fa";

export const Burn = ({ log, index }: { log: any; index: number }) => {
  const [hoveredBurnId, setHoveredBurnId] = useState<number | null>(null);
  const [clickedHoverId, setClickedHoverId] = useState<number | null>(null);
  const burnRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleBurnClicked = (id: number) => {
    if (clickedHoverId === id) {
      setClickedHoverId(null);
    } else {
      setClickedHoverId(id);
      updatePosition();
    }
  };

  const updatePosition = () => {
    if (!burnRef.current) return;
    const rect = burnRef.current.getBoundingClientRect();
    const left = rect.right - 40;
    const top = rect.top + 25;
    setPosition({ top, left });
  };

  useEffect(() => {
    if (hoveredBurnId === index || clickedHoverId === index) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [hoveredBurnId, clickedHoverId, index]);

  return (
    <div>
      <div className="bg-gradient-to-r from-red-900/40 to-red-800/20 border-l-4 border-red-500 rounded-md p-2 shadow-md">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-gray-400">[{log.formattedTime}]</span>
          <span
            ref={burnRef}
            className="text-xs font-bold text-red-400 bg-red-400/20 px-2 py-0.5 rounded cursor-pointer"
            onMouseEnter={() => {
              setHoveredBurnId(index);
              updatePosition();
            }}
            onMouseLeave={() => setHoveredBurnId(null)}
            onClick={() => handleBurnClicked(index)}
          >
            -{log.details.burnDamage}
            {(hoveredBurnId === index || clickedHoverId === index) && (
              <div
                className="fixed animate-grow-in origin-top-left z-50 cursor-auto"
                style={{
                  top: `${position.top}px`,
                  left: `${position.left}px`,
                }}
              ></div>
            )}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="flex justify-end">
            <ChampionCard champion={log.details.champion} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center">
              <FaFire className="w-6 h-6" />
            </div>
          </div>
          <div className="flex justify-start">
            <ChampionCard
              champion={log.details.target.champion}
              currentHp={log.details.target.currentHp - log.details.burnAmount}
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
  );
};
