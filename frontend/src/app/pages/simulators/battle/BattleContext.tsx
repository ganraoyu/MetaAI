import { useContext, useState, createContext, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { BattleContextType, BattleData, BattleEndStats } from './types';

const BattleContext = createContext<BattleContextType>({} as BattleContextType);

export const useBattleContext = () => useContext(BattleContext);

interface BattleProviderProps {
  children: ReactNode;
}

export const BattleProvider = ({ children }: BattleProviderProps) => {
  const [startBattle, setStartBattle] = useState<boolean>(false);
  const [battleHistory, setBattleHistory] = useState<BattleData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [battleEndStats, setBattleEndStats] = useState<BattleEndStats | null>(null);

  const fetchBattleHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3000/battle-simulator/battle-history');
      setBattleHistory(response.data);
    } catch (error: any) {
      setError(
        'Failed to fetch battle history: ' + (error.response?.data?.message || error.message),
      );
      console.error('Error fetching battle history:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBattleStats = useCallback(async () => {
    if (!battleHistory) return; // optional guard
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'http://localhost:3000/battle-simulator/allBattleStatistics',
      );
      setBattleEndStats(response.data);
    } catch (error: any) {
      setError('Failed to fetch battle data: ' + (error.response?.data?.message || error.message));
      console.error('Error fetching battle data:', error);
    } finally {
      setLoading(false);
    }
  }, [battleHistory]);

  const value: BattleContextType = {
    startBattle,
    setStartBattle,
    battleHistory,
    setBattleHistory,
    loading,
    setLoading,
    error,
    fetchBattleHistory,
    battleEndStats,
    setBattleEndStats,
    fetchBattleStats,
  };

  return <BattleContext.Provider value={value}>{children}</BattleContext.Provider>;
};
