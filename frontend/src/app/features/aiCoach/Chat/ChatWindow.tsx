import { InitialChatWindow } from "../InitialChatWindow/_InitialChatWindow";
import "./Chat.css";
import { ChatMessages } from "./ChatMessages/ChatMessages";

export const ChatWindow = () => {
  return (
    <div
      className="overflow-y-auto p-4 screenbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <InitialChatWindow />
      <ChatMessages />
    </div>
  );
};
