export interface InitialChatContextType {
  displayText: string;
  setDisplayText: React.Dispatch<React.SetStateAction<string>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  showButtons: boolean;
  setShowButtons: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserWinrate {
  totalGames: number;
  wins: number;
  winRate: number;
  placements: number[];
}

export interface TFTTrait {
  name: string;
  unitCount: number;
  style: number;
  tierCurrent: number;
  tierTotal: number;
}

export interface UserTraitCount {
  sortedTraits: TFTTrait[];
}

export interface UserData {
  winrate: UserWinrate;      
  traitCount: UserTraitCount;
}
