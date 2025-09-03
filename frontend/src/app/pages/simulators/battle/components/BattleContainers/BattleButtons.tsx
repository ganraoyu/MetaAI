import { useEffect, useState } from "react";
import {
  MdClose,
  MdPlayArrow,
  MdAnalytics,
  MdSave,
  MdFolderOpen,
  MdSettings,
} from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useBattleContext } from "../../BattleContext.tsx";
import { useHexBoardContext } from "./HexBoard/HexBoardContext.tsx";
import { useBattleStatsContext } from "./BattleStatsContainer/BattleStatsContext.tsx";
import { useRunBattle } from "../../hooks/useRunBattle.ts";

export const BattleButtons = () => {
  const { setStartBattle, setBattleHistory, battleHistory, loading } = useBattleContext();

  const { boardState, setBoardState, boardArray, setBoardArray } = useHexBoardContext();

  const { toggleTraits, setToggleTraits, toggleBattleEndStats, setToggleBattleEndStats } =
    useBattleStatsContext();

  const [error, setError] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
  const [currentBattleIndex, setCurrentBattleIndex] = useState<number>(0);

  const { runBattle } = useRunBattle();

  useEffect(() => {}, [toggleTraits]);
  const handleStartBattle = async () => {
    setError(null);

    try {
      const championsOnBoard = Object.values(boardState).filter(
        (cell) => cell && cell.champion,
      ).length;

      if (championsOnBoard === 0) {
        setError(
          "No champions on board! Please place at least one champion before starting a battle.",
        );
        return;
      }

      console.log("Starting battle with board state:", boardState);
      const battleResult = await runBattle();
      console.log("Battle result received:", battleResult);

      if (battleResult && battleResult.success) {
        setStartBattle(true);
        setError(null);
      }
    } catch (err) {
      setError("Battle simulation failed. Please try again.");
      console.error("Battle error:", err);
    }
  };

  const handleClearBoard = () => {
    setBattleHistory(null);
    setStartBattle(false);
    setBoardState({});
    setBoardArray([]);
    setError(null);
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (currentBattleIndex > 0) {
      setCurrentBattleIndex(currentBattleIndex - 1);
    }
  };

  const handleNext = () => {
    if (
      battleHistory &&
      battleHistory.battleLogs &&
      currentBattleIndex < battleHistory.battleLogs.length - 1
    ) {
      setCurrentBattleIndex(currentBattleIndex + 1);
    }
  };

  const toggleAnalytics = () => {
    setShowAnalytics(!showAnalytics);
  };

  const handleSave = () => {
    console.log("Saving battle configuration...");
  };

  const handleLoad = () => {
    console.log("Loading battle configuration...");
  };

  const handleSettings = () => {
    console.log("Opening settings...");
  };

  const baseButtonClass =
    "h-8 px-3 rounded-md bg-hexCellComponents text-xs font-medium flex items-center gap-1 hover:bg-hexCellComponents/90 transition-all";
  const iconButtonClass =
    "h-8 w-8 rounded-md bg-hexCellComponents text-gray-300 border border-gray-600/60 text-xs font-medium flex items-center justify-center hover:bg-hexCellComponents/90 transition-all";
  const championsOnBoard = Object.values(boardState).filter((cell) => cell && cell.champion).length;

  return (
    <div>
      <div className="flex items-center gap-1 mb-[0.5rem]">
        {/* Main battle control buttons */}
        <button
          className={`${baseButtonClass} text-green-400 border border-green-600/60 ${
            loading || championsOnBoard === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            handleStartBattle();
            setToggleTraits(false);
            setToggleBattleEndStats(true);
          }}
          disabled={loading || championsOnBoard === 0}
        >
          <MdPlayArrow className="h-4 w-4" />
          {loading ? "Simulating..." : "Start Battle"}
        </button>

        <button
          className={`
            ${baseButtonClass} text-red-400 border border-red-600/60
            ${boardArray.length === 0 ? "opacity-50 cursor-not-allowed" : ""}
            `}
          onClick={() => {
            handleClearBoard();
            setToggleBattleEndStats(false);
            setToggleTraits(true);
          }}
        >
          <MdClose className="h-4 w-4" /> Clear Board
        </button>

        {/* Navigation buttons - only show when battle history exists */}
        {battleHistory && battleHistory.battleLogs && battleHistory.battleLogs.length > 0 && (
          <>
            <button
              className={`${iconButtonClass} ${
                currentBattleIndex <= 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrevious}
              disabled={currentBattleIndex <= 0}
            >
              <FaArrowLeft className="h-3 w-3" />
            </button>
            <span className="text-xs text-gray-400 px-1">
              {currentBattleIndex + 1} / {battleHistory.battleLogs.length}
            </span>
            <button
              className={`${iconButtonClass} ${
                currentBattleIndex >= battleHistory.battleLogs.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNext}
              disabled={currentBattleIndex >= battleHistory.battleLogs.length - 1}
            >
              <FaArrowRight className="h-3 w-3" />
            </button>
          </>
        )}

        {/* Analytics button */}
        <button
          className={`${iconButtonClass} ${
            showAnalytics ? "border-blue-500/60 text-blue-400" : ""
          }`}
          onClick={toggleAnalytics}
        >
          <MdAnalytics className="h-4 w-4" />
        </button>

        {/* Save/Load/Settings buttons - aligned to the right */}
        <div className="ml-auto flex gap-1">
          <button className={iconButtonClass} onClick={handleSave} title="Save Configuration">
            <MdSave className="h-4 w-4" />
          </button>

          <button className={iconButtonClass} onClick={handleLoad} title="Load Configuration">
            <MdFolderOpen className="h-4 w-4" />
          </button>

          <button className={iconButtonClass} onClick={handleSettings} title="Settings">
            <MdSettings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
    </div>
  );
};
