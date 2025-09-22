import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useChampionDataContext } from "../ChampionDataContext";
import { Rank, ranks } from "../types";

export const RankToggle = () => {
  const { rank, setRank } = useChampionDataContext();
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const lowestSelectedRank = ranks.find((r) => rank.includes(r)) || ranks[0];

  const renderRankItem = (r: Rank) => {
    const isSelected = rank.includes(r);

    const toggleRank = (e: React.MouseEvent) => {
      e.stopPropagation();

      let newRanks;
      if (isSelected) {
        newRanks = rank.filter((selectedRank) => selectedRank !== r);
      } else {
        newRanks = [...rank, r];
      }

      setRank(newRanks);
    };

    return (
      <div
        key={r}
        className="flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer"
        onClick={toggleRank}
      >
        <div className="flex items-center">
          <img
            src={`../assets/ranks/${r}.png`}
            alt={r}
            className="w-6 h-6"
          />
          <p className="text-[0.8rem] px-1 whitespace-nowrap">{r}</p>
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
        className="flex items-center justify-between bg-[#1e1d1d] min-w-[9rem] h-[2rem] rounded-md px-2"
        onClick={() => setOpenDropDown(!openDropDown)}
      >
        <div className="flex items-center overflow-hidden">
          <img
            src={`../assets/ranks/${lowestSelectedRank}.png`}
            alt={lowestSelectedRank}
            className="w-6 h-6"
          />
            <p className="text-[0.8rem] px-2 whitespace-nowrap overflow-hidden text-ellipsis flex-1 text-center">
            {lowestSelectedRank}
          </p>
        </div>
        <FontAwesomeIcon icon={faAngleDown} className="text-[0.8rem] ml-2" />
      </div>

      {/* Dropdown Menu */}
      {openDropDown && (
        <div className="absolute top-full min-w-[12rem] mt-1 bg-[#1e1d1d] rounded-md shadow-lg z-10">
          {ranks.map(renderRankItem)}
        </div>
      )}
    </div>
  );
};
