import { ChampionCard } from "../ChampionCard/ChampionCard.tsx";

export const Movement = ({
  log,
  index,
  parentRef,
}: {
  log: any;
  index: number;
  parentRef?: any;
}) => {
  const mover = log.details.mover;

  return (
    <div className="bg-gradient-to-r from-teal-950/50 to-teal-800/30 border-l-4 border-teal-700 rounded-lg p-3 shadow-lg shadow-teal-900/40">
      {/* Timestamp and movement positions */}
      <div className="flex justify-between items-center cursor-pointer select-none">
        <span className="text-xs text-gray-400 tracking-wide">
          [{log.formattedTime}]
        </span>

        <span className="text-xs font-semibold text-teal-400 bg-teal-400/20 px-1.5 py-0.5 rounded transition-colors hover:bg-teal-400/40 active:bg-teal-500/50 relative flex items-center gap-1">
          <span>
            [{mover.prevPosition[0]}, {mover.prevPosition[1]}]
          </span>
          <span>→</span>
          <span>
            [{mover.newPosition[0]}, {mover.newPosition[1]}]
          </span>
        </span>
      </div>

      {/* Mover ChampionCard */}
      <div className="flex justify-center mt-2">
        <ChampionCard
          champion={mover.champion}
          starLevel={mover.starLevel}
          cost={mover.cost}
          currentHp={mover.currentHp}
          maxHp={mover.maxHp}
          mana={mover.mana}
          maxMana={mover.maxMana}
          shield={mover.shield}
          trait1={mover.traits[0] || ""}
          trait2={mover.traits[1] || ""}
          trait3={mover.traits[2] || ""}
          item1={mover.items?.[0]?.name || ""}
          item2={mover.items?.[1]?.name || ""}
          item3={mover.items?.[2]?.name || ""}
          armor={mover.armor}
          magicResist={mover.magicResist}
          attackDamage={mover.attackDamage}
          attackSpeed={mover.attackSpeed}
          critChance={mover.critChance}
          critDamage={mover.critDamage}
          abilityPower={mover.abilityPower}
          damageAmp={mover.damageAmp}
          omnivamp={mover.omnivamp}
          reduction={mover.reduction || 0}
          range={mover.range}
        />
      </div>
    </div>
  );
};
