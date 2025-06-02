import { useContext, useState, createContext } from "react"

const UnitAugmentContext = createContext();

export const UnitAugmentProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByCost, setSortByCost] = useState(true);
    const [sortByAlphabet, setSortByAlphabet] = useState(false);
    const [filterByTrait, setFilterByTrait] = useState("");

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
            handleSortByCost,
            handleSortByAlphabet
        }}
    >
        {children}
    </UnitAugmentContext.Provider>
  )
}

export const useUnitAugmentContext = () => useContext(UnitAugmentContext);
