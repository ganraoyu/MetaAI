import { FilterContainer } from "./Filters/FilterContainer";
import { ItemContainerProvider } from "./ItemContainerContext";

export const ItemContainer = () => {
  return (
    <ItemContainerProvider>
      <div className="h-8 w-[21.4rem] bg-hexCellComponents rounded-md">
        <FilterContainer/>
      </div>
    </ItemContainerProvider>
  );
};
