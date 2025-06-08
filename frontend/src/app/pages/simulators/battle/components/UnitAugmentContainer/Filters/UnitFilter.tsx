import { useEffect, useState } from "react";
import { useUnitAugmentContext } from "../UnitAugmentContext"; 
import { useTFTSetContext } from "../../../../../../utilities/TFTSetContext";
import { getTraitBySet } from "../../../data/Loaders/traitDataLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FaChevronDown } from "react-icons/fa";

export const UnitFilter = () => {
  const { set } = useTFTSetContext();
  const [traits, setTraits] = useState(getTraitBySet(set));  

  const {
    searchTerm, setSearchTerm, 
    sortByCost, setSortByCost, 
    sortByAlphabet, setSortByAlphabet, 
    filterByTrait, setFilterByTrait, 
    handleSortByAlphabet, handleSortByCost,
    toggleUnitsOrAugments, setToggleUnitsOrAugments,
  }= useUnitAugmentContext();

  const [open, setOpen ] = useState(false);
  const [clickedTraitDropDown, setClickedTraitDropDown] = useState("");


  useEffect(() => {
    setTraits(getTraitBySet(set));
  }, [set]);  

  return (
    <div>
      <div className="pl-6 pt-5 flex items-center gap-4 h-8 w-[46] bg-hexCellComponents rounded-tl-md rounded-tr-md">
        
        {/* Search Bar */}
        <div className="flex items-center w-[12rem] h-7 bg-darkerHexCellComponents rounded-md outline outline-1 outline-lightGray hover:outline-yellow-300 hover:bg-lightGray">
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
            className={`h-7 w-8 bg-lightGray flex items-center justify-center rounded-l-md outline outline-1 ${
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
            className={`ml-[0.1rem] h-7 w-8 bg-lightGray flex items-center justify-center rounded-r-md outline outline-1 outline-lightGray hover:outline-yellow-300 ${
              sortByAlphabet ? "outline-yellow-300" : "outline-purple-600"
            }`}
          >
            <FontAwesomeIcon icon={faSortAlphaDown} className="text-white w-4 h-4" />
          </button>
        </div>

        {/* Filter By Trait Dropdown */}
        <div className='relative w-32'>
          <div
            className={`flex items-center justify-center bg-darkerHexCellComponents h-7 ${open ? 'rounded-t-md' : 'rounded-md' } \ hover:bg-lightGray cursor-pointer`}
            onClick={() => setOpen(!open)}
          >
            <div className="flex items-center justify-center gap-1">
              <img
                className="h-3 w-3 filter invert brightness-0"
                src="../assets/icons/synergies.svg"
                alt="Default"
              />
              <p className="text-[0.8rem]">All Synergies</p>
              <FaChevronDown
                className={`h-2.5 w-2.5 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
              />
            </div>
          </div>

          {open && (
            <div className="absolute top-full overflow-auto h-48 bg-darkerHexCellComponents w-full rounded-b-md shadow-md z-10">
              {(traits || []).map(trait => (
                <div
                  key={trait.name}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-lightGray cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <img src={trait.image} className="h-3 w-3" alt={trait.name} />
                  <p className="text-[0.8rem]">{trait.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Toggle Units or Augments */}
        <div className="flex items-center  ml-40 gap-2 ">
          <p className="text-xs">Units</p>
          <div
            onClick={() => setToggleUnitsOrAugments(!toggleUnitsOrAugments)}
            className={`w-9 h-3 flex items-center rounded-full outline outline-2 outline-lightGray cursor-pointer transition-colors duration-300 bg-darkerHexCellComponents`}
          >
            <div
              className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${
                toggleUnitsOrAugments ? "translate-x-0" : "translate-x-6"
              }`}
            ></div>
          </div>
          <p className="text-xs">Augments</p>
        </div>
      </div>
    </div>
  );
};
