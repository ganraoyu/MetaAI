import { useInitialChatContext } from "./InitialChatContext";
import "./InitialChatWindow.css";

export const ScrollButtons = () => {
  const { showButtons } = useInitialChatContext();

  return (
    <div>
      {showButtons && (
        <div className="relative w-full h-20 mt-6 animate-fade-slide-up">
          <div className="flex animate-slide">
            {["What is TFT?", "How do I get started?", "Tips & Tricks", "Meta Updates"].map(
              (text, i) => (
                <button
                  key={i}
                  className="m-2 px-3 py-2 bg-[#1c1c1c] text-white rounded-md hover:bg-[#2a2a2a] transition-colors"
                >
                  {text}
                </button>
              )
            )}
            {["What is TFT?", "How do I get started?", "Tips & Tricks", "Meta Updates"].map(
              (text, i) => (
                <button
                  key={`dup-${i}`}
                  className="m-2 px-3 py-2 bg-[#1c1c1c] text-white rounded-md hover:bg-[#2a2a2a] transition-colors"
                >
                  {text}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
