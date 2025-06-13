import { useEffect, useState } from "react";
import { useUnitAugmentContext } from "../UnitAugmentContext";
import { useTFTSetContext } from "../../../../../../utilities/TFTSetContext";
import { getTraitBySet } from "../../../data/Loaders/traitDataLoader";

import { SearchBar } from "./SearchBar";
import { SortButtons } from "./SortButtons";
import { TraitFilterDropdown } from "./TraitFilterDropdown";
import { ClearFiltersButton } from "./ClearFiltersButton";
import { ToggleUnitsAugmentsSwitch } from "./ToggleUnitsAugmentsSwitch";

export const FilterContainer = () => {
  const { set } = useTFTSetContext();
  const [traits, setTraits] = useState(getTraitBySet(set));

  const {
    searchTerm,
    setSearchTerm,
    sortByCost,
    setSortByCost,
    sortByAlphabet,
    setSortByAlphabet,
    filterByTrait,
    setFilterByTrait,
    handleSortByAlphabet,
    handleSortByCost,
    toggleUnitsOrAugments,
    setToggleUnitsOrAugments,
  } = useUnitAugmentContext();

  useEffect(() => {
    setTraits(getTraitBySet(set));
  }, [set]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSortByCost(true);
    setSortByAlphabet(false);
    setFilterByTrait("");
    setToggleUnitsOrAugments(true);
  };

  return (
    <div>
      <div className="pl-6 pt-5 flex items-center gap-4 h-8 w-[46] bg-hexCellComponents rounded-tl-md rounded-tr-md">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          toggleUnitsOrAugments={toggleUnitsOrAugments}
        />
        <SortButtons
          sortByCost={sortByCost}
          setSortByCost={handleSortByCost}
          sortByAlphabet={sortByAlphabet}
          setSortByAlphabet={handleSortByAlphabet}
        />
        <TraitFilterDropdown
          traits={traits ?? []}
          filterByTrait={filterByTrait}
          setFilterByTrait={setFilterByTrait}
          toggleUnitsOrAugments={toggleUnitsOrAugments}
        />
        <ClearFiltersButton onClear={clearAllFilters} />
        <ToggleUnitsAugmentsSwitch
          toggleUnitsOrAugments={toggleUnitsOrAugments}
          setToggleUnitsOrAugments={setToggleUnitsOrAugments}
        />
      </div>
    </div>
  );
};
