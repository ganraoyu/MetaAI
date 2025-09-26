import { getCostBorderColors } from "../../utilities/costBorderColors";
import { useChampionDataContext } from "../ChampionDataContext";

export const CostFilter = () => {
  const { cost, setCost } = useChampionDataContext();

  const toggleCost = (c: number) => {
    const newCosts = cost.includes(c as any)
      ? cost.filter((selectedCost) => selectedCost !== (c as any))
      : [...cost, c as any]; 
    console.log(newCosts);
    setCost(newCosts);
  };

  const setOpacity = (c: number) => {
    if (cost.length === 6) {setCost([]);} // all selected → reset
    if (cost.length === 0) return "opacity-100"; // default → all full
    return cost.includes(c as any) ? "opacity-100" : "opacity-40"; // multi-select
  };

  return (
    <div className="flex flex-row gap-2 mt-3">
      {[1, 2, 3, 4, 5, 6].map((costValue) => (
        <div
          key={costValue}
          className={`flex flex-row items-center justify-center cursor-pointer rounded-xl w-12 h-6 bg-[#1e1d1d] hover:bg-[#3a3838] gap-1 border border-${getCostBorderColors(costValue)} ${setOpacity(costValue)}`}
          onClick={() => toggleCost(costValue)}
        >
          <p className="text-sm font-medium">{costValue}</p>
          <img src="../assets/icons/coin.png" alt="cost" className="w-3 h-3" />
        </div>
      ))}
    </div>
  );
};
