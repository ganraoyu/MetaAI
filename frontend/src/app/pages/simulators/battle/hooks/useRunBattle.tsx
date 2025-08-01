import axios from "axios";
import { useBattleContext } from "../BattleContext";
import { useHexBoardContext } from "../components/BattleContainers/HexBoard/HexBoardContext";

export const useRunBattle = () => {
  const { setBattleHistory} = useBattleContext();
  const { boardState } = useHexBoardContext();

  const runBattle = async () => {
    try {
      
      console.log("Sending board state:", boardState);
      
      const response = await axios.post(
        "http://localhost:3000/battle-simulator/start-battle",
        { boardState }
      );
      
      console.log("Battle response:", response.data);
      
      // Set battle history in context
      if (response.data.battleHistory) {
        setBattleHistory(response.data.battleHistory);
      }
      
      return response.data;
    } catch (error: unknown) {
      console.error("Battle failed:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
      }
      throw error;
    }
  };

  return { runBattle }; 
};