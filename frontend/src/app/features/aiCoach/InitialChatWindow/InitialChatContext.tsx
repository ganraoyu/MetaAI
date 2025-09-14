  import axios from "axios";
  import { useState, createContext, ReactNode, useContext } from "react";
  import { InitialChatContextType, UserData } from "./types";

  const InitialChatContext = createContext<InitialChatContextType | null>(null);

  interface InitialChatProviderProps {
    children: ReactNode;
  };

  export const IntialChatProvider = ({ children }: InitialChatProviderProps) => {
    const [index, setIndex] = useState<number>(0);
    const [displayText, setDisplayText] = useState<string>("");
    const [start, setStart] = useState<boolean>(false);
    const [region, setRegion] = useState<string>('AMERICAS');
    const [userName, setUserName] = useState<string>("")
    const [showInput, setShowInput] = useState<boolean>(false);
    const [showButtons, setShowButtons] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    const fetchUserData = async (region: string, gameName: string, tagLine: string) => {
      try {
        const userWinrate = await axios.get(`http://localhost:3000/player/statistics/${region}/${gameName}/${tagLine}/winrate`);
        const traitCount = await axios.get(`http://localhost:3000/player/statistics/${region}/${gameName}/${tagLine}/traits`)

        const data: UserData = {
          winrate: userWinrate.data,
          traitCount: traitCount.data,
        };

        setUserData(data);
        console.log(data);
          
      } catch (error: any) {
      console.error("Error fetching battle history:", error);
      };
    }

    return ( 
      <InitialChatContext.Provider value={{ 
        index, 
        setIndex, 
        displayText, 
        setDisplayText, 
        start, 
        setStart, 
        region,
        setRegion,
        userName,
        setUserName,
        showInput, 
        setShowInput, 
        showButtons, 
        setShowButtons,
        userData,
        setUserData,
        fetchUserData,
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
    