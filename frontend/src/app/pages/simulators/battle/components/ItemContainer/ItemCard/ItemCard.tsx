import { useState } from "react";
import { ItemCardHover } from "./ItemCardHover";

type ItemCardProps = {
  itemTypeArray: any[];
};

export const ItemCard = ({ itemTypeArray }: ItemCardProps) => {
  const [hoveredItemName, setHoveredItemName] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2 m-1">
      {itemTypeArray.map((item, index) => (
        <div 
          key={index} 
          className="relative flex flex-col justify-center items-center w-[2rem]"
          onMouseEnter={() => setHoveredItemName(item.name)}
          onMouseLeave={() => setHoveredItemName(null)}
        >
          <img src={item.image} alt={item.name} className="w-[2rem] h-[2rem]" />
          <p className="text-[0.5rem] truncate w-full text-center" title={item.name}>
            {item.name}
          </p>
          {hoveredItemName === item.name && (
            <ItemCardHover itemName={item.name} />
          )}
        </div>
      ))}
    </div>
  );
};
