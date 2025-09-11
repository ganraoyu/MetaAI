import { useEffect, useMemo } from "react";
import { getRandomWelcomeMessage } from "./welcomeMessages";
import { useInitialChatContext } from "./InitialChatContext";
import "./InitialChatWindow.css";

export const TypeWriterText = () => { 
  const fullText = useMemo(() => getRandomWelcomeMessage(), []);
  
  const { 
    index, 
    setIndex, 
    displayText, 
    setDisplayText, 
    start, 
    setStart, 
    setShowInput, 
    setShowButtons 
  } = useInitialChatContext();

  useEffect(() => {
    const startTimeout = setTimeout(() => setStart(true), 300);
    return () => clearTimeout(startTimeout);
  }, [setStart]);

  // Typewriter effect
  useEffect(() => {
    if (!start) return;

    if (index < fullText.length) {
      const randomSpeed = 10 + Math.random() * 10;
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[index]);
        setIndex(prev => prev + 1); 
      }, randomSpeed);
      return () => clearTimeout(timeout);
    } else {
      const inputTimeout = setTimeout(() => setShowInput(true), 150);
      const buttonsTimeout = setTimeout(() => setShowButtons(true), 300);
      return () => {
        clearTimeout(inputTimeout);
        clearTimeout(buttonsTimeout);
      };
    }
  }, [index, fullText, start, setDisplayText, setIndex, setShowInput, setShowButtons]);

  return (
    <div className="text-[0.85rem] px-4">
      <div className="flex flex-row text-white mt-6">
        <img
          src="./assets/TFT.png"
          alt="AI Avatar"
          className="w-11 h-11 mb-4 mt-3 animate-fade-slide-right"
        />
        <p className="whitespace-pre-line leading-tight text-left ml-6 mt-3 mb-10">
          {displayText}
          {index < fullText.length && <span className="animate-blink">|</span>}
        </p>
      </div>
    </div>
  );
};
