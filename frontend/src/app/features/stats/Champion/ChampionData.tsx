import { ChampionDataProvider, useChampionDataContext } from "./ChampionDataContext";
import { ChampionDataOverview } from "./ChampionDataOverview";
import { ChampionListContainer } from "./ChampionList/ChampionListContainer";
import { FilterContainer } from "./Filters/_FilterContainer";

const ChampionDataContent = () => {
  const { table, chart } = useChampionDataContext();

  return (
    <>
      <ChampionDataOverview />
      <FilterContainer /> 
      {table && <ChampionListContainer />}
      {chart && <div className="text-white">Chart View Coming Soon!</div>}
    </>
  );  
};

export const ChampionsData = () => {
  return (
    <div className="flex flex-row justify-center items-center bg-mainBackground min-h-screen pt-[4.5rem] w-full">
      <div className="">
        <ChampionDataProvider>
          <ChampionDataContent />
        </ChampionDataProvider>
      </div>
    </div>
  );
};
