import { useEffect, useState } from "react";
import './InitialChatWindow.css';  
import { faCaretDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const InitialChatWindow = () => {
  const fullText = `Hello! I'm MetaAI, your personal AI assistant for everything Teamfight Tactics.

Enter your Summoner Name and Tagline below to get started!`;

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 15);

      return () => clearTimeout(timeout);
    } else {
      const inputTimeout = setTimeout(() => setShowInput(true), 200);
      const buttonsTimeout = setTimeout(() => setShowButtons(true), 700);

      return () => {
        clearTimeout(inputTimeout);
        clearTimeout(buttonsTimeout);
      };
    }
  }, [index, fullText]);

  return (
    <div className="text-[0.85rem] px-4">
      {/* Typewriter text */}
      <p className="whitespace-pre-line text-left mb-6">{displayText}</p>

      {/* Centered input bar */}
      {showInput && (
        <div className="flex justify-center animate-fade-slide-up">
          <div className="text-[0.75rem] bg-[#1c1c1c] p-2 flex items-center w-[22rem] rounded-md">
            <button className="flex items-center justify-between p-2 h-8 w-12">
              <p className="font-bold">NA</p>
              <FontAwesomeIcon icon={faCaretDown} className="text-gray-500 text-xs ml-1" />
            </button>
            <input
              placeholder="Search player (player#TAG)"
              className="pl-2 mr-2 h-8 flex-1 bg-transparent outline-none"
            />
            <button className="flex items-center justify-center h-8 w-10">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
            </button>
          </div>
        </div>
      )}

      {/* Continuous scrolling buttons */}
      {showButtons && (
        <div className="relative w-full h-20 overflow-hidden mt-6 animate-fade-slide-up">
          <div className="flex animate-slide">
            {['What is TFT?', 'How do I get started?', 'Tips & Tricks', 'Meta Updates'].map((text, i) => (
              <button
                key={i}
                className={`m-2 px-3 py-1 bg-[#1e1e1e] text-white rounded-md animate-fade-slide-up`}
              >
                {text}
              </button>
            ))}

            {/* A second to have it continue scrolling */}
            {['What is TFT?', 'How do I get started?', 'Tips & Tricks', 'Meta Updates'].map((text, i) => (
              <button
                key={`dup-${i}`}
                className={`m-2 px-3 py-1 bg-[#1e1e1e] text-white rounded-md animate-fade-slide-up`}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
