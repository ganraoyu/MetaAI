import axios from "axios";
import React, { useState, useContext, createContext, ReactNode } from "react";

type MessageType = {
  role: "user" | "ai";
  content: string;
};

type ChatContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  addMessage: (role: "user" | "ai", content: string) => void;
  sendMessage: (content: string, context: any) => Promise<void>;
};

const ChatContext = createContext<ChatContextType | null>(null);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const addMessage = (role: "user" | "ai", content: string) => {
    setMessages((prev) => [...prev, { role, content }]);
  };

  const sendMessage = async (content: string, extraUserData: any) => {
    addMessage("user", content);

    try {
      setLoading(true);

      const { data } = await axios.post("http://localhost:3000/ai-coach/chat", {
        message: content,
        context: extraUserData,
      });

      addMessage("ai", data.reply);
      console.log(data);
      
    } catch (err) {
      console.error(err);
      addMessage("ai", "Error: Could not get response from backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ loading, setLoading, messages, setMessages, addMessage, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used inside ChatProvider");
  return context;
};
