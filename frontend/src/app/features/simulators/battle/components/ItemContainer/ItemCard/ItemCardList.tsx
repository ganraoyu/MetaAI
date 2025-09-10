import { useItemContainerContext } from "../ItemContainerContext";
import { basicItems, combinedItems } from "../../../data/items/item-data";
import { ItemCard } from "./ItemCard";

export const ItemCardList = () => {
  const {
    showBasicItems,
    showCombinedItems,
    showArtifactItems,
    showRadiantItems,
    showSupportItems,
    showEmblemItems,
  } = useItemContainerContext();

  const handleItemType = () => {
    if (showBasicItems) return basicItems;
    if (showCombinedItems) return combinedItems;
    // if (showArtifactItems) return artifactItems;
    // if (showRadiantItems) return radiantItems;
    // if (showSupportItems) return supportItems;
    // if (showEmblemItems) return emblemItems;

    return [];
  };
  return (
    <div>
      {(showBasicItems ||
        showCombinedItems ||
        showArtifactItems ||
        showRadiantItems ||
        showSupportItems ||
        showEmblemItems) && <ItemCard itemTypeArray={handleItemType()} />}
    </div>
  );
};
