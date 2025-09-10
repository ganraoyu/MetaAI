import { faCaretDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInitialChatContext } from "./InitialChatContext";
import "./InitialChatWindow.css";

export const SearchBar = () => {
  const { showInput } = useInitialChatContext();

  return (
    <div>
      {showInput && (
        <div className="flex justify-center animate-fade-slide-up">
          <div className="text-[0.75rem] bg-[#1c1c1c] p-2 flex items-center w-[22rem] rounded-md border border-[#3a3a3a] shadow-glow">
            <button className="flex items-center justify-between p-2 h-8 w-12 hover:bg-[#2a2a2a] transition-colors">
              <p className="font-bold">NA</p>
              <FontAwesomeIcon icon={faCaretDown} className="text-gray-500 text-xs ml-1" />
            </button>
            <input
              placeholder="Search player (player#TAG)"
              className="pl-2 mr-2 h-8 flex-1 bg-[#1c1c1c] outline-none placeholder-gray-400"
            />
            <button className="flex items-center justify-center h-8 w-10 hover:bg-[#2a2a2a] transition-colors">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

