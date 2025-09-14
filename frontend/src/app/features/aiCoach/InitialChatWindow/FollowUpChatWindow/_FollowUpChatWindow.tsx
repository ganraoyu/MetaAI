import { useEffect, useMemo, useState } from "react"; 
import { getRandomFollowUpMessage } from "./followUpMessages";

export const FollowUpChatWindow = () => {
  const fullText = useMemo(() => getRandomFollowUpMessage(), []);

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [start, setStart] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStart(true), 300);
    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (!start) return;

    if (index < fullText.length) {
      const randomSpeed = 10 + Math.random() * 10;
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, randomSpeed);
      return () => clearTimeout(timeout);
    }   
  }, [index, fullText, start]);

  return (
    <div className="text-[0.85rem] px-4">
      <div className="flex flex-row text-white mt-6">
        <img
          src="./assets/TFT.pn"
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
