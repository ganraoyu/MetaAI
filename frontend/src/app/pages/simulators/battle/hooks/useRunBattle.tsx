import axios from "axios";

interface BoardArray {
  championName: string;
  cellId: string;
  starLevel?: number;
}

export const useRunBattle = () => {
  const runBattle = async (boardArray: BoardArray[]) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/battle-simulator/sendLineUp",
        { boardArray } // 👈 send the array to backend
      );
      return response.data;
    } catch (error) {
      console.error("Battle failed:", error);
      throw error;
    }
  };

  return { runBattle }; 
};
