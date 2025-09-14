import { useChatContext } from "../ChatContext";
import "../Chat.css";
import { AIMessage } from "./AIMessage";
import { UserMessage } from "./UserMessage";

export const ChatMessages = () => {
  const { loading, messages } = useChatContext();

  return (
    <div className="ml-[1.9rem]"> 
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        return (
          <div key={index} className="flex mt-3 w-[70em]">
            {isUser ? (
              <UserMessage content={message.content} />
            ) : (
              <AIMessage content={message.content} loading={loading} />
            )}
          </div>
        );
      })}
    </div>
  );
};
