import { ChampionStatBarsProps } from "./types"

export const ChampionStatBars = ({
  currentHp,
  maxHp,
  shield,
  mana,
  maxMana
}: ChampionStatBarsProps) => {
  return (
    <div>
      <div className="relative h-3 mt-1 bg-gray-700 rounded">
        <div
          className="absolute top-0 left-0 h-3 bg-green-600 rounded"
          style={{ width: `${(currentHp / maxHp) * 100}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium text-outline">
          {Math.round(currentHp)}/{maxHp}
        </div>
      </div>
      {shield > 0 && (
        <div className="relative h-3 mt-1 bg-gray-500 rounded">
          <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium text-outline">
            {Math.round(shield)}/{shield}
          </div>
        </div>
      )}
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
  )
}
