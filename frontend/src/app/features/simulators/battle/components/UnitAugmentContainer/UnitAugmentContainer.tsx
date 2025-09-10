import { UnitAugmentProvider } from "./UnitAugmentContext";
import { useTFTSetContext } from "../../../../../utilities/TFTSetContext";
import { FilterContainer } from "./Filters/_FilterContainer";
import { ChampionCardList } from "./ChampionCardList";

export const UnitAugmentContainer = () => {
  return (
    <UnitAugmentProvider>
      <UnitAugmentContainerContent />
    </UnitAugmentProvider>
  );
};

const UnitAugmentContainerContent = () => {
  const { set } = useTFTSetContext();

  return (
    <div>
      <FilterContainer />
      <ChampionCardList set={set} />
    </div>
  );
};
