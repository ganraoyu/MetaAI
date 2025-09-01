import axios from 'axios';
import { useBattleContext } from '../BattleContext';
import { useHexBoardContext } from '../components/BattleContainers/HexBoard/HexBoardContext';

export const useRunBattle = () => {
  const { setBattleHistory, setLoading } = useBattleContext();
  const { boardState } = useHexBoardContext();

  const runBattle = async () => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:3000/battle-simulator/start-battle', {
        boardState,
      });

      // Set battle history in context
      if (response.data.battleHistory) {
        setBattleHistory(response.data.battleHistory);
      }

      return response.data;
    } catch (error) {
      console.error('Battle failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { runBattle };
};
