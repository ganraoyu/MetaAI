import { useState, useContext, createContext, ReactNode } from "react";

const ChampionCardHoverContext = createContext<{
  abilityHover: boolean;
  setAbilityHover: (hover: boolean) => void;
}>({
  abilityHover: false,
  setAbilityHover: () => {},
});

const ChampionCardHoverProvider = ({ children }: { children: ReactNode }) => {
  const [abilityHover, setAbilityHover] = useState(false);

  return (
    <ChampionCardHoverContext.Provider value={{ abilityHover, setAbilityHover }}>
      {children}
    </ChampionCardHoverContext.Provider>
  );
};

const useChampionCardHoverContext = () => useContext(ChampionCardHoverContext);

export { ChampionCardHoverProvider, useChampionCardHoverContext };