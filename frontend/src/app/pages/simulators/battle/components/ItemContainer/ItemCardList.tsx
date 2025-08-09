import { useItemContainerContext } from "./ItemContainerContext";
import { combinedItems } from "../../data/items/item-data";

const ItemCard = () => {
  return (
    <div className="flex flex-wrap gap-2 m-1">
      {combinedItems.map((item, index) => (
        <div
          key={index}
          className="justify-center items-center w-[2rem]"
        >
          <img src={item.image} alt={item.name} className="w-[2rem] h-[2rem]" />
          <p
            className="text-[0.5rem] truncate text-center"
            title={item.name} 
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export const ItemCardList = () => {
  const { showCombinedItems } = useItemContainerContext();

  return (
      <div>
        {showCombinedItems && 
          <ItemCard />
        }
      </div>
    )
};
