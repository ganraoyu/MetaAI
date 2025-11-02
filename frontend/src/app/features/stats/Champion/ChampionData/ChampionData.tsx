import { ChampionProvider, useChampionContext } from "../../contexts/ChampionContext";
import { ChampionDataOverview } from "./ChampionDataOverview";
import { ChampionListContainer } from "../components/ChampionList/ChampionListContainer";
import { FilterContainer } from "../components/Filters/_FilterContainer";

const ChampionDataContent = () => {
  const { table, chart } = useChampionContext();

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
        <ChampionProvider>
          <ChampionDataContent />
        </ChampionProvider>
      </div>
    </div>
  );
};
