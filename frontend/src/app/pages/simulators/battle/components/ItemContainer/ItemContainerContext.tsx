import { useState, createContext, useContext, ReactNode } from 'react';

interface ItemContainerContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  showBasicItems: boolean;
  setShowBasicItems: (show: boolean) => void;

  showCombinedItems: boolean;
  setShowCombinedItems: (show: boolean) => void;

  showRadiantItems: boolean;
  setShowRadiantItems: (show: boolean) => void;

  showArtifactItems: boolean;
  setShowArtifactItems: (show: boolean) => void;

  showSupportItems: boolean;
  setShowSupportItems: (show: boolean) => void;

  showEmblemItems: boolean;
  setShowEmblemItems: (show: boolean) => void;
}

const ItemContainerContext = createContext<ItemContainerContextType | undefined>(undefined);

interface ItemContainerProviderProps {
  children: ReactNode;
}

export const ItemContainerProvider = ({ children }: ItemContainerProviderProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [showBasicItems, setShowBasicItems] = useState<boolean>(true);
  const [showCombinedItems, setShowCombinedItems] = useState<boolean>(true);
  const [showRadiantItems, setShowRadiantItems] = useState<boolean>(true);
  const [showArtifactItems, setShowArtifactItems] = useState<boolean>(true);
  const [showSupportItems, setShowSupportItems] = useState<boolean>(true);
  const [showEmblemItems, setShowEmblemItems] = useState<boolean>(true);

  return (
    <ItemContainerContext.Provider
      value={{
        searchTerm,
        setSearchTerm,

        showBasicItems,
        setShowBasicItems,

        showCombinedItems,
        setShowCombinedItems,

        showRadiantItems,
        setShowRadiantItems,

        showArtifactItems,
        setShowArtifactItems,

        showSupportItems,
        setShowSupportItems,

        showEmblemItems,
        setShowEmblemItems,
      }}
    >
      {children}
    </ItemContainerContext.Provider>
  );
};

export const useItemContainerContext = () => {
  const context = useContext(ItemContainerContext);
  if (!context) {
    throw new Error("useItemContainerContext must be used within an ItemContainerProvider");
  }
  return context;
};
