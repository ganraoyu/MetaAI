import { getAveragePlaceColors } from "../../../utilities/averagePlaceColors";
import { getTierBackgroundColors } from "../../../utilities/tierColors";
import { TraitCardProps, TraitCellProps } from "../../types";
import { getRankColor } from "../../../utilities/rankFontColors";
import { traitMap } from "../../../../../data/SET15/traitMapping";
import { useTraitContext } from "../../../contexts/TraitContext";
import { LoadingBar } from "./LoadingBar";
import "./_TraitList.css";

const TraitCell = ({ children, width, index }: TraitCellProps) => (
  <div
    className={`h-[2.4rem] flex items-center ${width} ${
      index % 2 === 1 ? "bg-[#141212]" : "bg-[#1e1d1d]"
    }`}
  >
    {children}
  </div>
);

export const TraitCard = ({
  trait,
  tier,
  averagePlacement,
  winRate,
  totalGames,
  levels,
  frequency,
  index,
}: TraitCardProps): JSX.Element => {
  const { traitLoading, traitStats } = useTraitContext();
  const hasData =
    !!trait && (totalGames > 0 || (Array.isArray(traitStats) && traitStats.length > 0));
  const isLoading = !!traitLoading && !hasData;

  const traitKey = String(trait ?? "").toUpperCase();
  const traitImage = traitMap[traitKey]?.image || "../assets/traits/default.png";
  const traitName = traitMap[traitKey]?.name || traitKey;

  return (
    <div className="flex flex-row items-center justify-center hover:bg-[#0a0a0a] hover:cursor-pointer group">
      {/* Rank */}
      <TraitCell
        width="w-[5rem] justify-center border-l border-r border-[#363636] text-[0.9rem] text-[#bcbcbc] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        <p className={`font-medium ${getRankColor(index)}`}>{index + 1}</p>
      </TraitCell>

      {/* Trait Icon & Name */}
      <TraitCell width="w-[20rem] border-r border-[#363636] group-hover:bg-[#2a2a2a]" index={index}>
        {isLoading ? (
          <div className="flex gap-2 items-center m-1">
            <LoadingBar width="w-32" height="h-[1.5rem]" className="rounded" />
          </div>
        ) : (
          <>
            {traitImage && <img src={traitImage} alt={traitKey} className="w-8 h-8 m-1" />}
            <p className="text-[#bcbcbc] text-[0.9rem]">{traitName}</p>
          </>
        )}
      </TraitCell>

      {/* Tier */}
      <TraitCell
        width="w-[5rem] justify-center border-r border-[#363636] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        {isLoading ? (
          <div className="p-1">
            <LoadingBar width="w-[1.7rem]" height="h-[1.5rem]" className="rounded-sm" />
          </div>
        ) : (
          <div
            className={`w-[1.7rem] h-[1.7rem] text-black flex items-center justify-center text-[0.9rem] font-bold rounded-sm ${getTierBackgroundColors(
              tier
            )}`}
          >
            {tier}
          </div>
        )}
      </TraitCell>

      {/* Average Placement */}
      <TraitCell
        width={`w-[8rem] justify-center border-r border-[#363636] text-[0.9rem] ${getAveragePlaceColors(
          averagePlacement
        )} group-hover:bg-[#2a2a2a]`}
        index={index}
      >
        {isLoading ? (
          <div className="p-1">
            <LoadingBar width="w-16" height="h-[1.5rem]" className="rounded" />
          </div>
        ) : (
          averagePlacement
        )}
      </TraitCell>

      {/* Win Rate */}
      <TraitCell
        width="w-[10rem] justify-center border-r border-[#363636] text-[0.9rem] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        {isLoading ? (
          <div className="p-1">
            <LoadingBar width="w-[6rem]" height="h-[1.7rem]" className="rounded" />
          </div>
        ) : (
          `${winRate}%`
        )}
      </TraitCell>

      {/* Levels */}
      <TraitCell
        width="w-[17rem] justify-center border-r border-[#363636] text-[0.9rem] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        {isLoading ? (
          <div className="p-1">
            <LoadingBar width="w-[10rem]" height="h-[1.7rem]" />
          </div>
        ) : (
          <div></div>
        )}
      </TraitCell>

      {/* Frequency */}
      <TraitCell
        width="w-[10rem] justify-end border-r border-[#363636] text-[0.9rem] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        {isLoading ? (
          <div className="p-1 ml-auto">
            <LoadingBar width="w-[6rem]" height="h-[1.7rem]" className="rounded" />
          </div>
        ) : (
          <div className="flex items-baseline gap-1 mr-2">
            <p>{totalGames}</p>
            <p className="text-[0.6rem] text-[#bcbcbc]">{frequency?.toFixed(2)}%</p>
          </div>
        )}
      </TraitCell>
    </div>
  );
};
