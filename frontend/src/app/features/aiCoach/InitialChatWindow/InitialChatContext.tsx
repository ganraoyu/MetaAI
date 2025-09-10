import { useState, createContext, ReactNode, useContext } from "react";

interface InitialChatContextType {
  displayText: string;
  setDisplayText: React.Dispatch<React.SetStateAction<string>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  showButtons: boolean;
  setShowButtons: React.Dispatch<React.SetStateAction<boolean>>;
}

const InitialChatContext = createContext<InitialChatContextType | null>(null);

interface InitialChatProviderProps {
  children: ReactNode;
};

export const IntialChatProvider = ({ children }: InitialChatProviderProps) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [start, setStart] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  
  return (
    <InitialChatContext.Provider value={{ 
      index, 
      setIndex,
      displayText, 
      setDisplayText, 
      start, 
      setStart, 
      showInput, 
      setShowInput, 
      showButtons, 
      setShowButtons 
      }}
    >
      {children}
    </InitialChatContext.Provider>
  );
};

export const useInitialChatContext = () => {
  const context = useContext(InitialChatContext);
  if (!context) throw new Error("useInitialChatContext must be used inside IntialChatProvider");
  return context;
};
  