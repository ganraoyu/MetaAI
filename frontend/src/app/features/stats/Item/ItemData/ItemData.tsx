
import { FilterContainer } from "../components/Filters/_FilterContainer";
import { ItemProvider, useItemContext } from "../../contexts/ItemContext";
import { ItemDataOverview } from "./ItemDataOverView";
import { ItemListContainer } from "../components/ItemList/ItemListContainer";

const ItemDataContent = () => {
  const { table, chart } = useItemContext();

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
      <div>
        <ItemProvider>
          <ItemDataContent />
        </ItemProvider>
      </div>
    </div>
  );
};
