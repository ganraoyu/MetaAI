import { TypeFilter } from "./TypeFilter";
import { RankToggle } from "./RankToggle";
import { RefreshButton } from "./RefreshButton";
import { SearchBar } from "./SearchBar";
import { TableChartToggle } from "./TableChartToggle";
import { FilterBarWrapper } from "../../../utilities/FilterBarWrapper";

export const FilterContainer = () => {
  return (
    <div className="flex flex-row justify-between items-center w-full mb-2">
      <div className="flex flex-row gap-2">
        <FilterBarWrapper>
          <SearchBar />
          <RankToggle />
          <RefreshButton />
        </FilterBarWrapper>
      </div>
      <div className="flex flex-row gap-2">
        <TypeFilter />
        <TableChartToggle />
      </div>
    </div>
  );
};
