import { FilterContainer } from "./Filters/FilterContainer";
import { ItemCardList } from "./ItemCardList";
import { ItemContainerProvider } from "./ItemContainerContext";

export const ItemContainer = () => {
  return (
    <ItemContainerProvider>
      <div className="w-[21.4rem] bg-hexCellComponents rounded-md flex flex-col p-2">
        <FilterContainer />
        <ItemCardList />
      </div>
    </ItemContainerProvider>
  );
};
