import { itemMap } from "../../../../../data/SET15/itemData/_ItemMapping";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";

export const ItemInfo = () => {
  const item = itemMap["Mittens"];

  const recipeAvailable = false;
  const description = "Shrinks the holder, granting them increased movement speed and immunity to Chill.";

  const stats = [
    { label: "Avg Place", value: "3.17", change: "-0.81" },
    { label: "Win Rate", value: "52%", change: "+6.4%" },
    { label: "Pick Rate", value: "18%", change: "-1.8%" },
    { label: "Top 4 Rate", value: "64%", change: "+5.4%" },
  ];

  return (
    <div className="col-span-1 rounded-md text-[#cfcfcf]">
      {/* Item image + recipe */}
      <div className="flex items-start gap-4">
        <img className="h-20 w-20 rounded-md" src={`../${item.image}`} alt={item.name ?? "Item"} />
        <div>
          <p className="text-[0.8rem] font-semibold mb-1">Recipe</p>
          {recipeAvailable ? (
            <div className="flex items-center gap-2">
              <img className="h-12 w-12 rounded-md" src="" alt="" />
              <p>+</p>
              <img className="h-12 w-12 rounded-md" src="" alt="" />
            </div>
          ) : (
            <p className="text-[0.8rem] text-[#f94e4e] italic">Cannot be Crafted</p>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 leading-snug text-[0.7rem]">{description}</p>

      {/* Stats grid */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[0.75rem]">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-row rounded-md p-2">
            <div>
              <p className="font-semibold text-[0.85rem] text-[#e6e6e6]">{s.value}</p>
              <p className="text-[#b8b8b8]">{s.label}</p>
            </div>
            <div>
              {parseFloat(s.change) > 0 ? (
                <div>
                  <FaCaretUp className={`text-[#761111]`} />
                </div>
              ) : (
                <div>
                  <FaCaretDown className={`text-[#9eb430]`} />
                </div>
              )}
              <p></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
