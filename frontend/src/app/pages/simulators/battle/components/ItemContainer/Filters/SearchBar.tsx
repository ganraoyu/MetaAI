import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => (
  <div className="flex items-center w-[19.5rem] h-7 bg-darkerHexCellComponents rounded-md outline outline-1 outline-lightGray hover:outline-yellow-300 hover:bg-lightGray">
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="Search for Item"
      className="text-xs appearance-none border-none bg-transparent outline-none w-full text-white p-2"
    />
    <FontAwesomeIcon icon={faMagnifyingGlass} className="pr-2 w-3 h-3 text-lighterGray" />
  </div>
);
