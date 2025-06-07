import { useContext, useState, createContext, ReactNode } from "react"

interface UnitAugmentContextType {
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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByCost, setSortByCost] = useState(true);
  const [sortByAlphabet, setSortByAlphabet] = useState(false);
  const [filterByTrait, setFilterByTrait] = useState("");
  const [toggleUnitsOrAugments, setToggleUnitsOrAugments] = useState(true);
  const [open, setOpen] = useState(false);
  const [clickedTraitDropDown, setClickedTraitDropDown] = useState("");

  const handleSortByCost = () => {
    setSortByCost(prev => !prev);
    setSortByAlphabet(false);
  }

  const handleSortByAlphabet = () => {
    setSortByAlphabet(prev => !prev);
    setSortByCost(false);
  }

  return (
    <UnitAugmentContext.Provider
      value={{
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
        handleSortByAlphabet
      }}
    >
      {children}
    </UnitAugmentContext.Provider>
  )
}

export const useUnitAugmentContext = () => {
  const context = useContext(UnitAugmentContext);
  if (context === undefined) {
    throw new Error('useUnitAugmentContext must be used within a UnitAugmentProvider');
  }
  return context;
};