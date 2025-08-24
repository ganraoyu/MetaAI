import { useState, useContext, createContext, ReactNode } from "react";

interface ChampionCardHoverContextType {
  abilityHover: boolean;
  setAbilityHover: (hover: boolean) => void;

  item1Hover: boolean;
  setItem1Hover: (hover: boolean) => void;

  item2Hover: boolean;
  setItem2Hover: (hover: boolean) => void;

  item3Hover: boolean;
  setItem3Hover: (hover: boolean) => void;

}

const ChampionCardHoverContext = createContext<ChampionCardHoverContextType | null>(null);

interface ChampionCardHoverProviderProps {
  children: ReactNode;
}

const ChampionCardHoverProvider = ({ children }: ChampionCardHoverProviderProps) => {
  const [abilityHover, setAbilityHover] = useState(false);
  const [item1Hover, setItem1Hover] = useState(false);
  const [item2Hover, setItem2Hover] = useState(false);
  const [item3Hover, setItem3Hover] = useState(false);

  return (
    <ChampionCardHoverContext.Provider value={{ 
      abilityHover, 
      setAbilityHover,
      item1Hover,
      setItem1Hover,
      item2Hover,
      setItem2Hover,
      item3Hover,
      setItem3Hover
    }}>
      {children}
    </ChampionCardHoverContext.Provider>
  );
};

const useChampionCardHoverContext = () => {
  const context = useContext(ChampionCardHoverContext);
  if (!context) {
    throw new Error("useChampionCardHoverContext must be used inside ChampionCardHoverProvider");
  }
  return context;
};

export { ChampionCardHoverProvider, useChampionCardHoverContext };