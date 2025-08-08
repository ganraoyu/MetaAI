export const ItemTypeToggle = () => {
  const baseButtonClass = "bg-darkerHexCellComponents outline outline-lightGray outline-1 px-1 py-1 text-[0.54rem] rounded-[0.2rem]";
  
  return (
    <div className="flex gap-2 mt-3 justify-center">
      <button className={baseButtonClass}>Basic</button>
      <button className={baseButtonClass}>Combined</button>
      <button className={baseButtonClass}>Radiant</button>
      <button className={baseButtonClass}>Artifact</button>
      <button className={baseButtonClass}>Support</button>
      <button className={baseButtonClass}>Emblems</button>
    </div>
  );
};
