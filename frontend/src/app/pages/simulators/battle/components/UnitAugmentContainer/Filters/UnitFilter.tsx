import { useEffect, useState } from "react";
import { useTFTSetContext } from "../../../../../../utilities/TFTSetContext";
import { getTraitBySet } from "../../../data/Loaders/traitDataLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FaChevronDown } from "react-icons/fa";

export const UnitFilter = () => {
  const { set } = useTFTSetContext();
  const [traits, setTraits] = useState(getTraitBySet(set));  

  const [searchTerm, setSearchTerm] = useState("");
  const [sortByCost, setSortByCost] = useState(true);
  const [sortByAlphabet, setSortByAlphabet] = useState(false);
  const [filterByTrait, setFilterByTrait] = useState("");
  const [toggleUnits, setToggleUnits] = useState(true);
  const [toggleAugments, setToggleAugments] = useState(false);

  const [open, setOpen ] = useState(false);
  const [clickedTraitDropDown, setClickedTraitDropDown] = useState("");

  useEffect(() => {
    setTraits(getTraitBySet(set));
  }, [set]);

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
        <div onClick={() => setOpen(!open)}>
            <div className="flex items-center justify-center bg-darkerHexCellComponents w-32 h-7 rounded-md hover:outline hover:outline-1 hover:outline-yellow-300 hover:bg-lightGray">
              <div>
                <img className="h-3 w-3"alt="Default"/>
                <p className="text-[0.8rem]">All Senergies</p>
                <FaChevronDown
                className={`h-2.5 w-2.5 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              {open &&  (
                <div>
                  {(traits || []).map(trait => (
                    <div className="flex items-center justify-center gap-2 " onClick={() => setOpen(!open)}>
                      <img src={trait.image} className="h-3 w-3"/>
                      <p className="text-[0.8rem]">{trait.name}</p>
                      <FaChevronDown
                      className={`h-2.5 w-2.5 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
        </div>
        
        {/* Toggle Units or Augments */}
        <div>

        </div>
        
      </div>
    </div>
  );
};
