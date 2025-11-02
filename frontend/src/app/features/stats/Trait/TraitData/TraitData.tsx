
import { TraitProvder, useTraitContext } from "../../contexts/TraitContext";
import { FilterContainer } from "./Filters.tsx/_FilterContainer";
import { TraitDataOverView } from "./TraitDataOverView";
import { TraitListContainer } from "./TraitList/TraitListContainer";

const TraitDataContent = () => {
  const { table, chart } = useTraitContext();

  return (
    <>
      <TraitDataOverView />
      <FilterContainer /> 
      {table && <TraitListContainer />}
      {chart && <div className="text-white">Chart View Coming Soon!</div>}
    </>
  );  
};

export const TraitData = () => {
  return (
    <div className="flex flex-row justify-center items-center bg-mainBackground min-h-screen pt-[4.5rem] w-full">
      <div className="">
        <TraitProvder>
          <TraitDataContent />
        </TraitProvder>
      </div>
    </div>
  );
};
