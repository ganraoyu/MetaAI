import { TraitCard } from "./TraitCard";

export const TraitListSkeleton = () => {
  return (
  <div>
    {Array.from({ length: 150}, (_, index) => (
    <TraitCard
      key={`skeleton-${index}`}
      trait={`trait-${index}`}
      winRate={0}
      index={index}
      tier="D"
      averagePlacement={4.5}
      totalGames={0}
      level={[]}
      frequency={0}
    />
    ))}
  </div>
  );
};