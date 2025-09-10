import { ChatProvider } from "./Chat/ChatContext";
import { ChatInput } from "./Chat/ChatInput";
import { ChatWindow } from "./Chat/ChatWindow";
import { IntialChatProvider } from "./InitialChatWindow/InitialChatContext";

export const ChatPage = () => {
  return (
    <ChatProvider>
      <div className="pt-20 bg-mainBackground h-[69rem] w-full flex justify-center">
        <div className="flex flex-col h-full max-h-[69rem]">

          {/* Chat messages area */}
          <IntialChatProvider>
            <div className=" w-[50rem] flex-1 overflow-y-auto scrollbar-hide p-4">
              <ChatWindow />
            </div>
          </IntialChatProvider>
        
          {/* Chat input at the bottom */}
          <div className="p-4">
            <ChatInput />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};
