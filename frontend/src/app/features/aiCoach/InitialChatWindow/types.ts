export interface InitialChatContextType {
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;

  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;

  showButtons: boolean;
  setShowButtons: React.Dispatch<React.SetStateAction<boolean>>;

  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;

  fetchUserData: (region: string, gameName: string, tagLine: string) => void;
};

export interface UserWinrate {
  totalGames: number;
  wins: number;
  winRate: number;
  placements: number[];
};

export interface TFTTrait {
  name: string;
  unitCount: number;
  style: number;
  tierCurrent: number;
  tierTotal: number;
};

export interface UserTraitCount {
  sortedTraits: TFTTrait[];
};

export interface UserData {
  winrate: UserWinrate | null;      
  traitCount: UserTraitCount | null;
};
