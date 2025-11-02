import { useTraitContext } from "../../../contexts/TraitContext";
import { HeaderCellProps } from "../../types";
import { TraitListSkeleton } from "./TraitSkeleton";
import { TraitList } from "./TraitList";

const HeaderCell = ({ children, width, isFirst = false }: HeaderCellProps) => (
  <div
    className={`h-[2rem] ${width} border-t border-b border-r border-[#363636] font-medium ${
      isFirst ? "border-l pl-1 justify-start" : ""
    }`}
  >
    {children}
  </div>
);

export const TraitListContainer = () => {
  const { totalGames, traitStats, searchValue } = useTraitContext();

  const normalizedTraits = (traitStats || []).map((trait: any) => trait.traitStats ?? trait);

  const searchFilteredTraits = normalizedTraits.filter((trait: any) =>
    String(trait?.traitId ?? "")
      .toLowerCase()
      .includes((searchValue || "").toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center w-full mt-[-0.4rem]">
      {/* Header */}
      <div className="flex flex-row items-center justify-center text-[0.9rem]">
        <HeaderCell width="flex items-center justify-center w-[5rem]" isFirst>
          Rank
        </HeaderCell>
        <HeaderCell width="flex items-center justify-start w-[20rem] pl-2">Trait</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[5rem]">Tier</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[8rem]">Avg. Place</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[10rem]">Win Rate</HeaderCell>
        <HeaderCell width="flex items-center justify-start w-[17rem] pl-2">Level</HeaderCell>
        <HeaderCell width="flex items-center justify-end w-[10rem] pr-2">Frequency</HeaderCell>
      </div>

      {/* Trait Rows */}
      <div className="w-full">
        {searchFilteredTraits.length > 0 ? (
          <TraitList traitStats={searchFilteredTraits} totalGames={totalGames} />
        ) : (
          <TraitListSkeleton />
        )}
      </div>
    </div>
  );
};
