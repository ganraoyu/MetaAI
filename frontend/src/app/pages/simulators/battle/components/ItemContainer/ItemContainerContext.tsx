import { useState, createContext, useContext, ReactNode} from 'react'      

interface ItemContainerContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  showBasicItems: boolean;
  setShowBasicItems: (show: boolean) => void;
}

const ItemContainerContext = createContext<ItemContainerContextType | undefined>(undefined);

interface ItemContainerProviderProps {
  children: ReactNode;
};  

export const ItemContainerProvider = ({children}: ItemContainerProviderProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showBasicItems, setShowBasicItems] = useState<boolean>(true);
  

  return (
    <ItemContainerContext.Provider value={{
      searchTerm, 
      setSearchTerm,
      showBasicItems, 
      setShowBasicItems
    }}>
      {children}
    </ItemContainerContext.Provider>
  )
};

export const useItemContainerContext = () => {
  const context = useContext(ItemContainerContext);
  if (!context) {
    throw new Error("useItemContainerContext must be used within an ItemContainerProvider");
  }
  return context;
};
