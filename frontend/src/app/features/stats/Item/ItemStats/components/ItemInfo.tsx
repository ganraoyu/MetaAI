import { itemMap } from "../../../../../data/SET15/itemData/_ItemMapping";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { Stat } from "./types";
import { useItemContext } from "../../../contexts/ItemContext";
import { useParams } from "react-router-dom";

const StatCard = ({ label, value, change }: Stat) => {
  const isPositive = parseFloat(change) > 0;
  const ArrowIcon = isPositive ? FaCaretUp : FaCaretDown;
  const arrowColor = isPositive ? "text-[#58d76b]" : "text-[#f94e4e]";

  return (
    <div className="flex items-center justify-between rounded-md">
      {/* Stat label + value */}
      <div>
        <p className={`font-semibold text-[1rem] text-[#e6e6e6]`}>{value}</p>
        <p className="text-[#b8b8b8] text-[0.7rem]">{label}</p>
      </div>

      {/* Stat change + version baseline */}
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-1">
          <ArrowIcon className={arrowColor} />
          <p className={`${arrowColor} text-[0.7rem]`}>{change}</p>
        </div>
        <p className="text-[#b8b8b8] text-[0.6rem]">vs 15.7</p>
      </div>
    </div>
  );
};

export const ItemInfo = () => {
  const { itemName } = useParams();
  const { itemStats } = useItemContext();
  const recipeAvailable = false;

  const targetItem = itemStats?.find((item) => item?.itemId === itemName);   
  const description = "Shrinks the holder, granting them increased movement speed and immunity to Chill.";

  const stats: Stat[] = [
    { label: "Avg Place", value: targetItem?.averagePlacement, change: "-0.81" },
    { label: "Win Rate", value: targetItem?.wins, change: "+6.4%" },
    { label: "Pick Rate", value: targetItem?.wins, change: "-1.8%" },
    { label: "Top 4 Rate", value: targetItem?.wins, change: "+5.4%" },
  ];

  return (
    <div className="col-span-1 rounded-md text-[#cfcfcf]">
      {/* Item image + recipe */}
      <div className="flex items-start gap-4">
        <img
          className="h-20 w-20 rounded-md object-cover"
          src={`${itemMap[targetItem?.itemId || "Manazane"].image}`}
          alt={targetItem?.itemId || "Manazane"}
        />

        <div>
          <p className="text-[0.8rem] font-semibold mb-1">Recipe</p>
          {recipeAvailable ? (
            <div className="flex items-center gap-2">
              <img className="h-12 w-12 rounded-md" src="" alt="Component 1" />
              <p className="font-semibold text-[#e6e6e6]">+</p>
              <img className="h-12 w-12 rounded-md" src="" alt="Component 2" />
            </div>
          ) : (
            <p className="text-[0.8rem] text-[#f94e4e] italic">Cannot be Crafted</p>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 leading-snug text-[0.75rem] italic">{description}</p>

      {/* Stats grid */}
      <div className="mt-4 grid grid-cols-2 gap-5 p-2 text-[0.75rem]">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
};
