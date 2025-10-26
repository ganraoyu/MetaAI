import { TraitCard } from "./TraitCard";
import { getTier } from "../../utilities/tierLetter";

interface TraitListProps {
  traitStats: any[];
  totalGames: number;
}

export const TraitList = ({ traitStats, totalGames }: TraitListProps) => { 
  return (
    <div className="w-full">
      {(traitStats ?? []).map((trait, index) => (
        <TraitCard
          key={trait.traitId}
          trait={trait.traitId}
          winRate={trait.winrate}
          index={index}
          tier={getTier(trait.averagePlacement)}
          averagePlacement={trait.averagePlacement}
          totalGames={trait.totalGames}
          level={trait.level}
          frequency={trait.totalGames / totalGames}
        />
      ))}
    </div>
  );
};
