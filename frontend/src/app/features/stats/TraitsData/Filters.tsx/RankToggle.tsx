import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useTraitDataContext } from "../TraitDataContext";
import { Rank, ranks } from "../types";

export const RankToggle = () => {
  const { rank, setRank } = useTraitDataContext();
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const highestSelectedRank = ranks.find((r) => rank.includes(r)) || ranks[0];
  const lowestSelectedRank = ranks.reverse().find((r) => rank.includes(r)) || ranks[-1];

  const renderRankItem = (r: Rank) => {
    const isSelected = rank.includes(r);

    const toggleRank = (e: React.MouseEvent) => {
      e.stopPropagation();

      const filteredRanks = rank.filter((r) => r.toLowerCase() !== "all");

      if (rank.length === 1 && isSelected) {
        return;
      }

      let newRanks;
      if (isSelected) {
        newRanks = filteredRanks.filter((selectedRank) => selectedRank !== r);
      } else {
        newRanks = [...filteredRanks, r];
      }

      setRank(newRanks);
    };

    return (
      <div
        key={r}
        className="flex items-center justify-between p-2 h-[2.5rem] hover:bg-[#2d2d2d] cursor-pointer"
        onClick={toggleRank}
      >
        <div className="flex items-center">
          <img src={`../assets/ranks/${r}.png`} alt={r} className="w-6 h-6" />
          <p className="text-[0.75rem] px-1 whitespace-nowrap">{r}</p>
        </div>
        <div className="w-4 h-4 border border-gray-400 flex items-center justify-center mr-2">
          {isSelected && <span className="text-white text-xs">✓</span>}
        </div>
      </div>
    );
  };
  return (
    <div className="relative hover:cursor-pointer w-fit">
      {/* Toggle Button */}
      <div
        className="flex items-center justify-between outline outline-lightGray outline-1 bg-[#272525] hover:bg-[#3a3838] min-w-[15rem] h-[2rem] rounded-md px-2"
        onClick={() => setOpenDropDown(!openDropDown)}
      >
        <div className="flex items-center justify-center w-full space-x-2">
          <img
            src={`../assets/ranks/${lowestSelectedRank}.png`}
            alt={lowestSelectedRank}
            className="w-6 h-6"
          />
          <p className="text-[0.75rem] whitespace-nowrap">{lowestSelectedRank}</p>
          <span className="mx-2">——</span>
          <img
            src={`../assets/ranks/${highestSelectedRank}.png`}
            alt={highestSelectedRank}
            className="w-6 h-6"
          />
          <p className="text-[0.75rem] whitespace-nowrap">{highestSelectedRank}</p>
        </div>
        <FontAwesomeIcon icon={faAngleDown} className="text-[0.75rem] ml-2" />
      </div>

      {/* Dropdown Menu */}
      {openDropDown && (
        <div className="absolute top-full min-w-[15rem] mt-1 bg-[#272525] rounded-md shadow-lg z-10">
          <div>{ranks.map(renderRankItem)}</div>
          <div className="flex items-center justify-center hover:bg-[#2d2d2d]">
            <button
              className="min-w-[15rem] h-[2.5rem]"
              onClick={() => {
                setRank([
                  "Iron",
                  "Bronze",
                  "Silver",
                  "Gold",
                  "Platinum",
                  "Diamond",
                  "Master",
                  "Grandmaster",
                  "Challenger",
                ]);
                setOpenDropDown(false);
              }}
            >
              <p className="text-[0.7rem]">ALL</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
