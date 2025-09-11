  import axios from "axios";
  import { useState, createContext, ReactNode, useContext } from "react";
  import { UserData } from "./types";

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
    const [userData, setUserData] = useState<UserData>()

    
    const getFetchUserData = async (region: string, gameName: string, tagLine: string) => {
      try {
        const userWinrate = await axios.get(`http://localhost:3000/player/${region}/${gameName}/${tagLine}`);
        const userTraitCount = await axios.get(`http://localhost:3000/player/statistics/${region}/${gameName}/${tagLine}/traits`)

        const data: UserData = {
          winrate: userWinrate.data,
          traitCount: userTraitCount.data
        }
        
        setUserData(data)

      } catch (error: any) {

      }
    }

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
    