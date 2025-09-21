import { ChampionDataOverview } from "./ChampionDataOverview";
import { ChampionList } from "./ChampionList";
import { FilterContainer } from "./Filters/FilterContainer";

export const ChampionsData = () => {
  return (
    <div className="flex justify-center items-center bg-mainBackground min-h-screen pt-[4.5rem] w-full">
      <div className="">
      <ChampionDataOverview />
      <FilterContainer />
      <ChampionList />
      </div>

    </div>
  );
};

