import { useChatContext } from "../ChatContext";
import { AIMessage } from "./AIMessage";
import { UserMessage } from "./UserMessage";
import "../Chat.css";

export const ChatMessages = () => {
  const { loading, messages } = useChatContext();

  return (
    <div className="ml-[1.9rem]"> 
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        const isAI = message.role === "ai";
        return (
          <div key={index} className="flex mt-3 w-[70em]">
            {isUser && (
              <UserMessage content={message.content} />
            )} 
            {isAI&& (
              <AIMessage content={message.content} loading={loading} />
            )}
          </div>
        );
      })}
    </div>
  );
};
