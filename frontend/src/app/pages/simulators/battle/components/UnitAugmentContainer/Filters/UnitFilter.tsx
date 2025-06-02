import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const UnitFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByCost, setSortByCost] = useState(true);
  const [sortByAlphabet, setSortByAlphabet] = useState(false);
  const [filterByTrait, setFilterByTrait] = useState("");

  const handleSortByCost = () => {
    setSortByCost(prev => !prev);
    setSortByAlphabet(false);
  }
  
  const handleSortByAlphabet = () => {
    setSortByAlphabet(prev => !prev);
    setSortByCost(false);
  }

  return (
    <div>
      <div className="pl-6 pt-5 flex items-center gap-4 h-8 w-[27rem] bg-hexCellComponents rounded-tl-lg rounded-tr-lg">
        
        {/* Search Bar */}
        <div className="flex items-center w-[12rem] h-7 bg-lightGray rounded-lg">
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search for Unit/Trait"
            className="text-xs appearance-none border-none bg-transparent outline-none w-full text-white p-2"
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="pr-2 w-3 h-3 text-lighterGray" />
        </div>

        {/* Sort Buttons */}
        <div className="flex items-center">
          <button
            onClick={handleSortByCost}
            className={`h-7 w-8 bg-lightGray flex items-center justify-center rounded-l-lg outline outline-1 ${
              sortByCost ? "outline-yellow-300" : "outline-purple-600"
            }`}
          >
            <img
              src="../assets/icons/coin.png"
              alt="Coin"
              className="filter invert brightness-0 h-4 w-4"
            />
          </button>

          <button
            onClick={handleSortByAlphabet}
            className={`ml-[0.1rem] h-7 w-8 bg-lightGray flex items-center justify-center rounded-r-lg outline outline-1 hover:outline-yellow-300 ${
              sortByAlphabet ? "outline-yellow-300" : "outline-purple-600"
            }`}
          >
            <FontAwesomeIcon icon={faSortAlphaDown} className="text-white w-4 h-4" />
          </button>
        </div>

        {/* Filter Button Placeholder (You can add it here later) */}

      </div>
    </div>
  );
};
