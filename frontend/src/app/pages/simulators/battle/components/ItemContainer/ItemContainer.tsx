import { FilterContainer } from "./Filters/FilterContainer";
import { ItemContainerProvider } from "./ItemContainerContext";

export const ItemContainer = () => {
  return (
    <ItemContainerProvider>
      <div className="h-[30rem] w-[21.4rem] bg-hexCellComponents rounded-md flex justify-center p-2">
        <FilterContainer/>
      </div>
    </ItemContainerProvider>
  );
};
