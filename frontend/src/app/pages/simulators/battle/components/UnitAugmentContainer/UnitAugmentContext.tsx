import { useContext, useState, createContext, ReactNode } from "react";

interface UnitAugmentContextType {
  showBelow: boolean;
  setShowBelow: (show: boolean) => void;

  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortByCost: boolean;
  setSortByCost: (sort: boolean) => void;
  sortByAlphabet: boolean;
  setSortByAlphabet: (sort: boolean) => void;
  filterByTrait: string;
  setFilterByTrait: (trait: string) => void;
  toggleUnitsOrAugments: boolean;
  setToggleUnitsOrAugments: (toggle: boolean) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  clickedTraitDropDown: string;
  setClickedTraitDropDown: (trait: string) => void;
  handleSortByCost: () => void;
  handleSortByAlphabet: () => void;
}

const UnitAugmentContext = createContext<UnitAugmentContextType | undefined>(undefined);

interface UnitAugmentProviderProps {
  children: ReactNode;
}

export const UnitAugmentProvider = ({ children }: UnitAugmentProviderProps) => {
  const [showBelow, setShowBelow] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortByCost, setSortByCost] = useState<boolean>(true);
  const [sortByAlphabet, setSortByAlphabet] = useState<boolean>(false);
  const [filterByTrait, setFilterByTrait] = useState<string>("");
  const [toggleUnitsOrAugments, setToggleUnitsOrAugments] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [clickedTraitDropDown, setClickedTraitDropDown] = useState<string>("");

  const handleSortByCost = () => {
    if (sortByCost) {
      return;
    } else {
      setSortByCost((prev) => !prev);
      setSortByAlphabet(false);
    }
  };

  const handleSortByAlphabet = () => {
    if (sortByAlphabet) {
      return;
    } else {
      setSortByAlphabet((prev) => !prev);
      setSortByCost(false);
    }
  };

  return (
    <UnitAugmentContext.Provider
      value={{
        showBelow,
        setShowBelow,
        searchTerm,
        setSearchTerm,
        sortByCost,
        setSortByCost,
        sortByAlphabet,
        setSortByAlphabet,
        filterByTrait,
        setFilterByTrait,
        toggleUnitsOrAugments,
        setToggleUnitsOrAugments,
        open,
        setOpen,
        clickedTraitDropDown,
        setClickedTraitDropDown,
        handleSortByCost,
        handleSortByAlphabet,
      }}
    >
      {children}
    </UnitAugmentContext.Provider>
  );
};

export const useUnitAugmentContext = () => {
  const context = useContext(UnitAugmentContext);
  if (context === undefined) {
    throw new Error("useUnitAugmentContext must be used within a UnitAugmentProvider");
  }
  return context;
};
