import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChampionContext } from "../../../contexts/ChampionContext";

export const SearchBar = () => {
  const { searchValue, setSearchValue } = useChampionContext();

  return (
    <div className="flex flex-row justify-center">
      <div className="relative flex items-center cursor-text">
        <input 
          className="outline outline-lightGray outline-1 bg-[#1c1a1a] hover:bg-[#3a3838] rounded-md px-3 py-1 pr-8 text-[0.75rem] w-[15rem] h-[2rem]"
          placeholder="Search Items"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-3 w-3 h-3 text-lighterGray" />
      </div>
    </div>
  )
};