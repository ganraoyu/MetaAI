import { useState } from "react";
import { ChampionBarHover } from "./ChampionBarHover";
import { ChampionDamageBar } from "./ChampionDamagebar";
import { ChampionHealShieldBar } from "./ChampionHealShieldBar";
import { ChampionImage } from "./ChampionImage";
import { ChampionStatsNumbers } from "./ChampionStatsNumbers";
import { ChampionProps } from "./types";

/**
 * ChampionStatsCard
 *
 * Displays a single champion’s information, including:
 * - Champion image
 * - Stats numbers
 * - Damage bar
 * - Heal and shield bar
 * - Hover card showing detailed breakdown of damage, healing, and shielding
 *
 * @param {ChampionProps} champion - Data object representing a single champion
 * @returns {JSX.Element} The rendered champion stats card
 */

export const ChampionStatsCard = ({ champion }: ChampionProps): JSX.Element => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div className="mb-2 flex flex-row justify-center items-center select-none">
      {/* Champion image */}
      <div>
        <ChampionImage champion={champion} />
      </div>

      {/* Stats and bars container: shows stats numbers, damage, heal/shield bars, and triggers hover card */}
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <ChampionStatsNumbers champion={champion} />
        <ChampionDamageBar champion={champion} />
        <ChampionHealShieldBar champion={champion} />

        {/* Hover card showing detailed breakdown of damage, healing, and shielding */}
        {hover && <ChampionBarHover champion={champion} />}
      </div>
    </div>
  );
};
