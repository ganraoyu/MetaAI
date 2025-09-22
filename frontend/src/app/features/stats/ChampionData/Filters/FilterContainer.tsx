import { CostFilter } from "./CostFilter";
import { RankToggle } from "./RankToggle";
import { SearchBar } from "./SearchBar";
import { TableChartToggle } from "./TableChartToggle";

export const FilterContainer = () => {
  return (
    <div className="flex flex-row justify-between items-center w-full mb-2">
      <div className="flex flex-row gap-2">
        <SearchBar />
        <RankToggle />
      </div>
      <div>
        <CostFilter />
        <TableChartToggle />
      </div>
    </div>
  );
};
