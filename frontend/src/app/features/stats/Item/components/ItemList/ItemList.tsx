import { ItemCard } from "./ItemCard";
import { getTier } from "../../../utilities/tierLetter";

interface ItemListProps {
  itemsStats: any[];
  totalGames: number;
  normalizedRankBIS: any;
}

export const ItemList = ({ itemsStats, totalGames, normalizedRankBIS }: ItemListProps) => { 
  console.log(normalizedRankBIS)
  return (
    <div className="w-full">
      {(itemsStats ?? []).map((item, index) => (
        <ItemCard
          key={item.itemId}
          item={item.itemId}
          winRate={item.winrate}
          index={index}
          tier={getTier(item.averagePlacement)}
          averagePlacement={item.averagePlacement}
          totalGames={item.totalGames}
          frequency={item.totalGames / totalGames}
          popularChampions={item?.[normalizedRankBIS]?.slice(0,6)}
        />
      ))}
    </div>
  );
};
