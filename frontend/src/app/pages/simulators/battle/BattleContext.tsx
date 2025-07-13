import { useContext, useState, createContext, ReactNode } from "react"
import axios from "axios"

interface BattleLog {
  formattedTime: string
  type: string
  details: any
  isCrit?: boolean
  source: string
}

interface BattleData {
  battleLogs: BattleLog[]
  duration: number
}

interface BattleContextType {
  startBattle: boolean
  setStartBattle: (start: boolean) => void
  battleHistory: BattleData | null
  setBattleHistory: (data: BattleData | null) => void
  loading: boolean
  error: string | null
  fetchBattleHistory: () => Promise<void>
}

const BattleContext = createContext<BattleContextType>({} as BattleContextType)

export const useBattleContext = () => {
  return useContext(BattleContext)
}

interface BattleProviderProps {
  children: ReactNode
}

export const BattleProvider = ({ children }: BattleProviderProps) => {
  const [startBattle, setStartBattle] = useState<boolean>(false)
  const [battleHistory, setBattleHistory] = useState<BattleData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBattleHistory = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(
        "http://localhost:3000/battle-simulator/battle-history"
      )
      console.log("Response data:", response.data)
      setBattleHistory(response.data)
    } catch (err: any) {
      setError(
        "Failed to fetch battle history: " +
          (err.response?.data?.message || err.message)
      )
      console.error("Error fetching battle history:", err)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    startBattle,
    setStartBattle,
    battleHistory,
    setBattleHistory,
    loading,
    error,
    fetchBattleHistory,
  }

  return (
    <BattleContext.Provider value={value}>{children}</BattleContext.Provider>
  )
}
