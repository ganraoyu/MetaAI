import { ChampionDamageBar } from "./ChampionDamagebar";
import { ChampionHealShieldBar } from "./ChampionHealShieldBar";
import { ChampionImage } from "./ChampionImage";
import { ChampionStatsNumbers } from "./ChampionStatsNumbers";
import { ChampionProps } from "./types";

/**
 * ChampionStatsCard
 *
 * Displays one champion’s image, numbers, damage bar, and heal/shield bar.
 *
 * @param {ChampionProps} champion - Champion data object.
 * @returns {JSX.Element}
 */

export const ChampionStatsCard = ({ champion }: ChampionProps): JSX.Element => {
  return (
    <div className="mb-2 flex flex-row justify-center items-center">
      <ChampionImage champion={champion} />
      <div>
        <ChampionStatsNumbers champion={champion} />
        <ChampionDamageBar champion={champion} />
        <ChampionHealShieldBar champion={champion} />
      </div>

    </div>
  );
};
