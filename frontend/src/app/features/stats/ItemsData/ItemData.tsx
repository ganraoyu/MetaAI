
import { FilterContainer } from "./Filters/FilterContainer";
import { ItemDataProvider, useItemDataContext } from "./ItemDataContext";
import { ItemDataOverview } from "./ItemDataOverView";
import { ItemListContainer } from "./ItemList/ItemListContainer";

const ItemDataContent = () => {
  const { table, chart } = useItemDataContext();

  return (
    <>
      <ItemDataOverview />
      <FilterContainer /> 
      {table && <ItemListContainer />}
      {chart && <div className="text-white">Chart View Coming Soon!</div>}
    </>
  );  
};

export const ItemData = () => {
  return (
    <div className="flex flex-row justify-center items-center bg-mainBackground min-h-screen pt-[4.5rem] w-full">
      <div className="">
        <ItemDataProvider>
          <ItemDataContent />
        </ItemDataProvider>
      </div>
    </div>
  );
};
