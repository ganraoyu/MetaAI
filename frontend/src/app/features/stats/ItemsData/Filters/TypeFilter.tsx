import { useItemDataContext } from "../ItemDataContext";

export const TypeFilter = () => {
  const { itemType, setItemType } = useItemDataContext();

  const toggleItemType = (itemValue: string) => {
    const newItemTypes = itemType.includes(itemValue)
      ? itemType.filter((selectedType) => selectedType !== itemValue)
      : [...itemType, itemValue]; 
    console.log(newItemTypes);
    setItemType(newItemTypes);
  };

  const setOpacity = (itemValue: string) => {
    if (itemType.length === 6) {setItemType([]);} // all selected → reset
    if (itemType.length === 0) return "opacity-100"; // default → all full
    return itemType.includes(itemValue as any) ? "opacity-100" : "opacity-40"; // multi-select
  };

  return (
    <div className="flex flex-row gap-2 mt-3">
      {["Basic", "Combined", "Radiant", "Artifact", "Emblem"].map((itemValue) => (
        <div
          key={itemValue}
          className={`text-[0.6rem] flex flex-row items-center justify-center cursor-pointer rounded-xl w-[7rem] h-6 bg-[#1e1d1d] hover:bg-[#3a3838] gap-1 ${setOpacity(itemValue)}`}
          onClick={() => toggleItemType(itemValue)}
        >
          <p className="text-sm font-medium">{itemValue}</p>
          <img src={`../assets/icons/${itemValue}Anvil.png`} alt="cost" className="w-5 h-5" />
        </div>
      ))}
    </div>
  );
};
