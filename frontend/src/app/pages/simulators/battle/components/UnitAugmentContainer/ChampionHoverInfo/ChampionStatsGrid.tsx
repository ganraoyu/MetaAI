import { ChampionHoverInfoProps } from "../../types";

interface ChampionStatsGridProps extends ChampionHoverInfoProps {}

const StatRow = ({
  label,
  icon,
  value,
  size,
}: {
  label: string;
  icon?: string;
  value: React.ReactNode;
  size: { width: string; height: string };
}) => {
  return (
    <div className="flex items-center gap-2 px-2 py-1 w-full">
      {icon && (
        <div
          style={{ width: "1.5rem", height: "1.5rem" }}
          className="flex items-center justify-center shrink-0"
        >
          <img
            src={icon}
            alt={`${label} icon`}
            style={size}
            className="shrink-0"
          />
        </div>
      )}
      <div className="flex-1 flex justify-center">
        <p className="text-white text-[0.75rem] font-[400] text-center">
          {value}
        </p>
      </div>
    </div>
  );
};

export const ChampionStatsGrid = ({
  stats,
  starLevelStats,
}: ChampionStatsGridProps) => {
  return (
    <div>
      {/* Stats */}
      <div className="grid grid-rows-5 grid-cols-2 gap-y-1 gap-x-4">
        <StatRow
          label="Health"
          icon="../assets/icons/health.png"
          value={`${starLevelStats?.oneStar.health}/${starLevelStats?.twoStar.health}/${starLevelStats?.threeStar.health}`}
          size={{ width: "1.375rem", height: "1.375rem" }}
        />
        <StatRow
          label="Mana"
          icon="../assets/icons/mana.png"
          value={`${stats?.mana}/${stats?.abilityManaCost}`}
          size={{ width: "1.125rem", height: "1.125rem" }}
        />
        <StatRow
          label="Attack Damage"
          icon="../assets/icons/attack.png"
          value={`${starLevelStats?.oneStar.attackDamage}/${starLevelStats?.twoStar.attackDamage}/${starLevelStats?.threeStar.attackDamage}`}
          size={{ width: "1.125rem", height: "1.125rem" }}
        />
        <StatRow
          label="Ability Power"
          icon="../assets/icons/abilitypower.png"
          value={stats?.abilityPower}
          size={{ width: "0.875rem", height: "0.875rem" }}
        />
        <StatRow
          label="Armor"
          icon="../assets/icons/armor.png"
          value={starLevelStats?.oneStar.armor}
          size={{ width: "1.125rem", height: "1.125rem" }}
        />
        <StatRow
          label="Magic Resist"
          icon="../assets/icons/magicresist.png"
          value={starLevelStats?.oneStar.magicResist}
          size={{ width: "1.375rem", height: "1.375rem" }}
        />
        <StatRow
          label="Attack Speed"
          icon="../assets/icons/attackspeed.png"
          value={stats?.attackSpeed}
          size={{ width: "1rem", height: "1rem" }}
        />
        <StatRow
          label="Crit Chance"
          icon="../assets/icons/criticalstrikechance.png"
          value={`${stats?.attackCritChance}%`}
          size={{ width: "1.125rem", height: "1.125rem" }}
        />
        <StatRow
          label="Crit Damage"
          icon="../assets/icons/criticaldamage.svg"
          value={`${stats?.attackCritDamage}%`}
          size={{ width: "1.125rem", height: "1.125rem" }}
        />
        <StatRow
          label="Range"
          icon="../assets/icons/range.png"
          value={stats?.range}
          size={{ width: "0.875rem", height: "0.875rem" }}
        />
      </div>
    </div>
  );
};
