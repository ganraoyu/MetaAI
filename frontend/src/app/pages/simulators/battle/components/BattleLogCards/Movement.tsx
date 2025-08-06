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
    <div className="font-mono">
      <div className="bg-gradient-to-r from-teal-900/40 to-teal-800/20 border-l-4 border-teal-500 rounded-md p-2 shadow-md">
        {/* Timestamp and position container - flex with justify-between to match AutoAttack */}
        <div className="flex justify-between items-center cursor-pointer">
          {/* Timestamp top left */}
          <div className="text-xs text-gray-400 select-none">
            [{log.formattedTime}]
          </div>

          {/* Positions top right */}
          <div
            className="text-xs font-bold text-teal-400 bg-teal-400/20 px-2 py-0.5 rounded select-none cursor-pointer flex items-center space-x-1"
          >
            <div>
              [{mover.prevPosition[0]}, {mover.prevPosition[1]}]
            </div>
              <p>{'->'}</p>
            <div>
              [{mover.newPosition[0]}, {mover.newPosition[1]}]
            </div>
          </div>
        </div>

        {/* Champion card centered with margin top same as AutoAttack */}
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
    </div>
  );
};
