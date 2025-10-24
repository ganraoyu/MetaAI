
import { FilterContainer } from "./Filters.tsx/_FilterContainer";
import { ItemDataProvider, useItemDataContext } from "./ItemDataContext";
import { TraitDataOverView } from "./TraitDataOverView";
import { TraitList

const TraitDataContent = () => {
  const { table, chart } = useItemDataContext();

  return (
    <>
      <TraitDataOverView />
      <FilterContainer /> 
      {table && <ItemListContainer />}
      {chart && <div className="text-white">Chart View Coming Soon!</div>}
    </>
  );  
};

export const TraitData = () => {
  return (
    <div className="flex flex-row justify-center items-center bg-mainBackground min-h-screen pt-[4.5rem] w-full">
      <div className="">
        <ItemDataProvider>
          <TraitDataContent />
        </ItemDataProvider>
      </div>
    </div>
  );
};
