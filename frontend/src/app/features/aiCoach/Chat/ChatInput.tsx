import { GoArrowUp } from "react-icons/go";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { useState } from "react";
import { useChatContext } from "./ChatContext";

export const ChatInput = () => {
  const [inputValue, setInputvalue] = useState<string | null>(null);
  const { sendMessage } = useChatContext();

  const handleSend = () => {
    if (!inputValue?.trim()) return;

    sendMessage(inputValue);
    setInputvalue("");
  };
  return (
    <div>
      {/* Input */}
      <div className="flex flex-row m-2">
        <input
          type="text"
          placeholder="Ask anything TFT related!"
          value={inputValue || ""}
          className="bg-[#1e1e1e] outline-none w-[45rem] h-[3rem] rounded-l-2xl text-[0.8rem] p-5"
          onChange={(event) => setInputvalue(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && handleSend()}
        />
        <button
          type="submit"
          onClick={handleSend}
          className="bg-[#1e1e1e] rounded-r-2xl h-[3  rem] w-[4.5rem] flex items-center justify-center overflow-hidden gap-2"
        >
          <MdOutlineKeyboardVoice className="w-4 h-4" />
          <div className="flex w-6 h-6 bg-white items-center justify-center rounded-full ">
            <GoArrowUp className="w-4 h-4 text-black font-bold" />
          </div>
        </button>
      </div>
    </div>
  );
};
