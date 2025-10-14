import { ItemCard } from "./ItemCard";

export const ItemListSkeleton = () => {
  return (
  <div>
    {Array.from({ length: 150}, (_, index) => (
    <ItemCard
      key={`skeleton-${index}`}
      item={`item-${index}`}
      winRate={0}
      index={index}
      tier="D"
      averagePlacement={4.5}
      totalGames={0}
      frequency={0}
      popularChampions={[]}
    />
    ))}
  </div>
  );
};