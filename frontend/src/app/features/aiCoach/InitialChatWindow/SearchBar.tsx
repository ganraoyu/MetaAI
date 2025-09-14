import { faCaretDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInitialChatContext } from "./InitialChatContext";
import "./InitialChatWindow.css";
import { useState, useRef, useEffect } from "react";

const regions = ["AMERICAS", "EUROPE", "ASIA"];

export const SearchBar = () => {
  const { userName, setUserName, showInput, fetchUserData, region, setRegion } = useInitialChatContext();
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (openDropDown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left
      });
    }
  }, [openDropDown]);

  const handleFetchUserData = (region: string, userName: string) => {
    const tagLine = userName.split("#")[1]
    userName = userName.split("#")[0]

    console.log(tagLine)
    fetchUserData(region || "AMERICAS", userName, tagLine)
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        {showInput && (
          <div className="flex items-center animate-fade-slide-up">
            <div className="relative text-[0.75rem] bg-[#1c1c1c] p-2 flex items-center w-[25rem] rounded-md border border-[#3a3a3a] shadow-glow">
              
              {/* Dropdown trigger */}
              <button
                ref={buttonRef}
                className="flex items-center justify-between p-3 h-8 w-28 transition-colors rounded text-white font-bold"
                onClick={() => setOpenDropDown(!openDropDown)}
              >
                {region || "Select Region"}
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className={`text-gray-400 text-xs ml-2 transition-transform duration-200 ${
                    openDropDown ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Input */}
              <input
                placeholder="Search player (player#TAG)"
                className="pl-2 ml-2 mr-2 h-8 flex-1 bg-[#1c1c1c] text-white outline-none placeholder-gray-400 rounded"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleFetchUserData(region || "AMERICAS", userName)
                  }
                }}
              />

              {/* Search button */}
              <button
                className="flex items-center justify-center h-8 w-10 transition-colors rounded"
                onClick={() => handleFetchUserData(region || "AMERICAS", userName)}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm text-white" />
              </button>
            </div>

            {/* Riot Sign-In Button */}
            <button className="flex items-center justify-center h-12 px-3 ml-2 bg-red-700 border border-[#cb3131] text-white rounded-md hover:bg-red-600 transition-colors">
              <img
                src="./assets/RIOTGAMES.svg"
                alt="Riot Logo"
                className="h-4 w-4 mr-2"
              />
              Sign into Riot
            </button>
          </div>
        )}
      </div>

      {/* Dropdown menu - OUTSIDE the main container, using fixed positioning */}
      {openDropDown && (
        <div 
          className="fixed w-28 bg-[#1c1c1c] border border-[#3a3a3a] rounded-md animate-fade-slide-down shadow-md z-50"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`
          }}
        >
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => {
                setRegion(r);
                setOpenDropDown(false);
              }}
              className="block w-full text-left px-3 py-2 text-white hover:bg-[#2a2a2a] transition-colors first:rounded-t-md last:rounded-b-md"
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </>
  );
};