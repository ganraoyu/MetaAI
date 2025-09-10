import { ChampionStatBarsProps } from "./types";

/**
 * ChampionStatBars component displays the champion's current health, shield, and mana as progress bars.
 *
 * @param {number} currentHp - The champion's current health points.
 * @param {number} maxHp - The champion's maximum health points.
 * @param {number} shield - The current shield value of the champion.
 * @param {number} mana - The champion's current mana points.
 * @param {number} maxMana - The champion's maximum mana points.
 *
 * @returns {JSX.Element} The rendered health, shield, and mana bars.
 */

export const ChampionStatBars = ({
  currentHp,
  maxHp,
  shield,
  mana,
  maxMana,
}: ChampionStatBarsProps): JSX.Element => {
  return (
    <div>
      {/* Health Bar */}
      <div className="relative h-3 mt-1 bg-gray-700 rounded">
        <div
          className="absolute top-0 left-0 h-3 bg-green-600 rounded"
          style={{ width: `${(currentHp / maxHp) * 100}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium text-outline">
          {Math.round(currentHp)}/{maxHp}
        </div>
      </div>

      {/* Shield Bar */}
      {shield > 0 && (
        <div className="relative h-3 mt-1 bg-gray-500 rounded">
          <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium text-outline">
            {Math.round(shield)}/{shield}
          </div>
        </div>
      )}

      {/* Mana Bar */}
      <div className="relative h-3 bg-gray-700 mt-1 rounded">
        <div
          className="absolute top-0 left-0 h-3 bg-blue-600 rounded"
          style={{ width: `${(mana / maxMana) * 100}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium text-outline">
          {mana}/{maxMana}
        </div>
      </div>
    </div>
  );
};
