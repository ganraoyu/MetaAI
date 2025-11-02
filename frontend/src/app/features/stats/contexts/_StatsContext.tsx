import { ReactNode } from "react";
import { ChampionProvider } from "./ChampionContext";
import { ItemProvider } from "./ItemContext";
import { TraitProvder } from "./TraitContext";

interface StatsProviderProps {
  children: ReactNode;
}

export const StatsProvider = ({ children }: StatsProviderProps) => {
  return (
    <ChampionProvider>
      <ItemProvider>
        <TraitProvder>
          {children}
        </TraitProvder>
      </ItemProvider>
    </ChampionProvider>
  );
};
