import { useEffect, useState } from "react"; 
import { getRandomFollowUpMessage } from "./followUpMessages";
import { useInitialChatContext } from "../InitialChatContext";
import "./FollowUpChatWindow.css"

export const FollowUpChatWindow = () => {
  const { error, loading, userData } = useInitialChatContext();

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [fullText, setFullText] = useState("");

  // when userData becomes available, reset typing
  useEffect(() => {
    if (userData && !loading) {
      const newText = getRandomFollowUpMessage();
      setFullText(newText);
      setIndex(0);
      setDisplayText("");
    }
  }, [userData, loading]);

  // typewriter effect
  useEffect(() => {
    if (!fullText || index >= fullText.length || loading) return;

    const randomSpeed = 10 + Math.random() * 10;
    const timeout = setTimeout(() => {
      setDisplayText((prev) => prev + fullText[index]);
      setIndex((prev) => prev + 1);
    }, randomSpeed);

    return () => clearTimeout(timeout);
  }, [index, fullText, loading]);

  return (
    <div className="flex flex-row text-[0.85rem] px-3 mt-6">
      {(loading || userData || error) && (
        <img
          src="./assets/TFT.png"
          alt="AI Avatar"
          className="w-11 h-11 mb-4 mt-3 animate-fade-slide-right"
        />
      )}

      {/* Show spinner when loading */}
      {loading && (
        <div className="flex flex-row items-center text-white">
   
          <div className="ml-6 flex items-center justify-center">
            <div className="pulse-dot"></div>
          </div>
        </div>
      )}

      {/* Show typewriter text only if userData exists */}
      {userData && !loading && (
        <div className="flex flex-row text-white">
  
          <p className="whitespace-pre-line leading-tight text-left ml-6 mt-3 mb-10">
            {displayText}
            {index < fullText.length && <span className="animate-blink">|</span>}
          </p>
        </div>
      )}
      {/* Show Error message if no user is found or rate limit exceeded */}
      {error && (
        <div className="flex flex-row items-center text-white">
          <div className="ml-6 flex items-center justify-center">
            <div className="pulse-dot"></div>
          </div>
        </div>
      )}
    </div>
  );
};

