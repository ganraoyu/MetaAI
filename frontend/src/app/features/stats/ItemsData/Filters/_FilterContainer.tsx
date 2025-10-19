import { TypeFilter } from "./TypeFilter";
import { RankToggle } from "./RankToggle";
import { RefreshButton } from "./RefreshButton";
import { SearchBar } from "./SearchBar";
import { TableChartToggle } from "./TableChartToggle";

export const FilterContainer = () => {
  return (
    <div className="flex flex-row justify-between items-baseline w-full mb-2">
      <div className="flex flex-row gap-2">
        <SearchBar />
        <RankToggle />
        <RefreshButton />
      </div>
      <div className="flex flex-row gap-2">
        <TypeFilter />
        <TableChartToggle />
      </div>
    </div>
  );
};
