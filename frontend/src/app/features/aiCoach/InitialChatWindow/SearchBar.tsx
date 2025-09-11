import { faCaretDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInitialChatContext } from "./InitialChatContext";
import "./InitialChatWindow.css";

export const SearchBar = () => {
  const { showInput } = useInitialChatContext();

  return (
    <div className="flex flex-row items-center justify-center">
      {showInput && (
        <div className="flex items-center animate-fade-slide-up">
          <div className="text-[0.75rem] bg-[#1c1c1c] p-2 flex items-center w-[22rem] rounded-md border border-[#3a3a3a] shadow-glow">
            <button className="flex items-center justify-between p-2 h-8 w-12 transition-colors hover:bg-gray-800 rounded">
              <p className="font-bold text-white">NA</p>
              <FontAwesomeIcon icon={faCaretDown} className="text-gray-400 text-xs ml-1" />
            </button>

            <input
              placeholder="Search player (player#TAG)"
              className="pl-2 mr-2 h-8 flex-1 bg-[#1c1c1c] text-white outline-none placeholder-gray-400 rounded"
            />

            <button className="flex items-center justify-center h-8 w-10 transition-colors hover:bg-gray-800 rounded">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm text-white" />
            </button>
          </div>

          {/* Riot Sign-In Button */}
          <button className="flex items-center justify-center h-12 px-3 ml-2 bg-red-700 border border-[#cb3131] text-white rounded-md hover:bg-red-600 transition-colors">
            <img src="./assets/RIOTGAMES.svg" alt="Riot Logo" className="h-4 w-4 mr-2" />
            Sign into Riot
          </button>
        </div>
      )}
    </div>
  );
};
