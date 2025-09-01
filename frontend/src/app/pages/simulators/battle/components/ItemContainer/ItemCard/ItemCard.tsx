import { useState } from 'react';
import { ItemCardHover } from './ItemCardHover';
import { useItemContainerContext } from '../ItemContainerContext';

type ItemCardProps = {
  itemTypeArray: any[];
};

export const ItemCard = ({ itemTypeArray }: ItemCardProps) => {
  const { searchTerm } = useItemContainerContext();
  const [hoveredItemName, setHoveredItemName] = useState<string | null>(null);

  const filteredItems = itemTypeArray.filter((item) => item.name.includes(searchTerm));

  const handleDragStart = (e: React.DragEvent, itemName: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ name: itemName, type: 'item' }));
    e.dataTransfer.effectAllowed = 'copy';
    console.log('Dragging:', itemName);
  };

  return (
    <div className="flex flex-wrap gap-2 m-1">
      {filteredItems.map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col justify-center items-center w-[2rem]"
          onMouseEnter={(e) => {
            setHoveredItemName(item.name);
            e.currentTarget.classList.remove('cursor-grabbing');
          }}
          onMouseLeave={() => setHoveredItemName(null)}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, item.name)}
          onDragEnd={(e) => {
            e.currentTarget.classList.remove('cursor-grabbing');
          }}
          onDrag={(e) => {
            e.currentTarget.classList.add('cursor-grabbing');
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-[2rem] h-[2rem] cursor-grab active:cursor-grabbing"
            draggable={true}
          />
          <p className="text-[0.5rem] truncate w-full text-center" title={item.name}>
            {item.name}
          </p>
          {hoveredItemName === item.name && <ItemCardHover itemName={item.name} />}
        </div>
      ))}
    </div>
  );
};
