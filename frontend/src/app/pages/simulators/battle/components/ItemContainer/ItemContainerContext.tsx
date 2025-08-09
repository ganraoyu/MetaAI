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
  const [showCombinedItems, setShowCombinedItems] = useState<boolean>(false);
  const [showRadiantItems, setShowRadiantItems] = useState<boolean>(false);
  const [showArtifactItems, setShowArtifactItems] = useState<boolean>(false);
  const [showSupportItems, setShowSupportItems] = useState<boolean>(false);
  const [showEmblemItems, setShowEmblemItems] = useState<boolean>(false);

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
