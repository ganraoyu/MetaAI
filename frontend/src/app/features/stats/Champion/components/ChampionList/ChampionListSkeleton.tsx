import { ChampionCard } from "./ChampionCard";

export const ChampionListSkeleton = () => {
  return (
	<div>
	  {Array.from({ length: 65 }, (_, index) => (
		<ChampionCard
		  key={`skeleton-${index}`}
		  champion={`champion-${index}`}
		  winRate={0}
		  index={index}
		  cost={1}
		  tier="D"
		  averagePlacement={4.5}
		  totalGames={0}
		  frequency={0}
		  popularItems={[]}
		/>
	  ))}
	</div>
  );
};