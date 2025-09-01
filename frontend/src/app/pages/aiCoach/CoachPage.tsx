import { ChatProvider } from './ChatContext';
import { ChatInput } from './ChatInput';
import { ChatWindow } from './ChatWindow';

export const CoachPage = () => {
  return (
    <ChatProvider>
      <div className="pt-20 bg-mainBackground h-[69rem] w-full flex justify-center">
        <div className="flex flex-col h-full max-h-[69rem]">
          {/* Chat messages area */}
          <div className=" w-[50rem] flex-1 overflow-y-auto scrollbar-hide p-4">
            <ChatWindow />
          </div>

          {/* Chat input at the bottom */}
          <div className="p-4">
            <ChatInput />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};
