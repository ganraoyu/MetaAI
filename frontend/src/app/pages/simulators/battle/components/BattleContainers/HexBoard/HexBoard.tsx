
import { useHexBoardContext } from './HexBoardContext';
import { HexCell } from './HexCell';
import { useBattleContext } from '../../../BattleContext';
import { useBattleStatsContext } from '../BattleStatsContainer/BattleStatsContext';

/**
 * HexBoard
 *
 * Renders a hexagonal board layout for a battle simulation.
 * The board consists of two halves:
 *  - Opponent board (top 4 rows)
 *  - Player board (bottom 4 rows)
 *
 * Each row alternates horizontal offset to create a hexagonal staggered layout.
 * Each cell is represented by a `HexCell` component with a unique `cellId` and a `team` prop.
 *
 * Board stats display the number of champions on each team and the total cost of champions for each side
 *
 * @component
 * @returns {JSX.Element} A React component displaying the hexagonal grid for both players.
 */

const getWinRate = (rate?: string) => parseInt(rate ?? '0') * 100;

const getTextColor = (rate?: string) =>
  rate ? (parseInt(rate) * 100 > 50 ? 'text-green-600' : 'text-red-600') : 'text-[#4A4040]';

export const HexBoard = (): JSX.Element => {
  const {
    playerSunder,
    playerShred,
    opponentSunder,
    opponentShred,
    playerChampionArray,
    opponentChampionArray,
    playerChampionCostCount,
    opponentChampionCostCount,
  } = useHexBoardContext();

  const {
    toggleBattleEndStats
  } = useBattleStatsContext()

  const { battleEndStats } = useBattleContext()
  
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Opponent Board */}
      <div className="flex flex-col items-center">
        {[...Array(4)].map((_, row) => {
          const isEvenRow = row % 2 === 0;
          const team = 'opponent';

          return (
            <div
              key={row}
              className={`flex justify-center items-center gap-0 mb-[-1.1rem] ${
                isEvenRow ? 'mr-8' : 'ml-10'
              }`}
            >
              {[...Array(7)].map((_, col) => {
                const cellId = `r${row}c${col}`;
                return <HexCell key={cellId} cellId={cellId} team={team} />;
              })}
            </div>
          );
        })}
      </div>

      {/* Board Stats */}
      <div className="flex justify-between w-full pointer-events-none select-none">
        {/* Left side */}
        <div className="flex flex-col">
          {/* Top row: abilities */}
          <div className="flex flex-col gap-1">
            <div
              className={`flex items-center gap-1 mb-[-0.4rem] ${playerSunder ? '' : 'opacity-30'}`}
            >
              <img src="../assets/icons/sunder.png" className="w-4 h-4" />
              <p className="text-[0.8rem]">Sunder</p>
            </div>
            <div className={`flex items-center gap-1 ${playerShred ? '' : 'opacity-30'}`}>
              <img src="../assets/icons/shred.png" className="w-4 h-4" />
              <p className="text-[0.8rem]">Shred</p>
            </div>
          </div>

          {/* Bottom row: champions and coin */}
          <div className="flex items-center gap-1">
            <img src="../assets/icons/champion.png" className="w-4 h-4" />
            <p className="text-[0.8rem]">{playerChampionArray.length}</p>
            <img src="../assets/icons/coin.png" className="w-4 h-4" />
            <p className="text-[0.8rem]">{playerChampionCostCount}</p>
          </div>
        </div>

        {/* Win rates */}
        <div>
          {toggleBattleEndStats ? (
            <div className="flex flex-col justify-center items-center">
              <p className={getTextColor(battleEndStats?.opponentChampionStatistics?.[0]?.opponentWinRate)}>
                {getWinRate(battleEndStats?.opponentChampionStatistics?.[0]?.opponentWinRate)}%
              </p>
              <p className={getTextColor(battleEndStats?.playerChampionStatistics?.[0]?.playerWinRate)}>
                {getWinRate(battleEndStats?.playerChampionStatistics?.[0]?.playerWinRate)}%
              </p>
            </div>
          ) : <div></div>}
        </div>

        {/* Right side (example, mirror left side) */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <img src="../assets/icons/champion.png" className="w-4 h-4" />
            <p className="text-[0.8rem]">{opponentChampionArray.length}</p>
            <img src="../assets/icons/coin.png" className="w-4 h-4" />
            <p className="text-[0.8rem]">{opponentChampionCostCount}</p>
          </div>

          <div className="flex flex-col gap-1">
            <div className={`flex items-center gap-1 ${opponentSunder ? '' : 'opacity-30'}`}>
              <img src="../assets/icons/shred.png" className="w-4 h-4" />
              <p className="text-[0.8rem]">Shred</p>
            </div>
            <div
              className={`flex items-center gap-1 mt-[-0.4rem] ${opponentShred ? '' : 'opacity-30'}`}
            >
              <img src="../assets/icons/sunder.png" className="w-4 h-4" />
              <p className="text-[0.8rem]">Sunder</p>
            </div>
          </div>
        </div>
      </div>

      {/* Player Board */}
      <div className="flex flex-col items-center">
        {[...Array(4)].map((_, i) => {
          const row = i + 4;
          const isEvenRow = row % 2 === 0;
          const team = 'player';

          return (
            <div
              key={row}
              className={`flex justify-center items-center gap-0 mb-[-1.1rem] ${
                isEvenRow ? 'mr-8' : 'ml-10'
              } ${row === 4 ? 'mt-[-1.1rem]' : ''}`}
            >
              {[...Array(7)].map((_, col) => {
                const cellId = `r${row}c${col}`;
                return <HexCell key={cellId} cellId={cellId} team={team} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
