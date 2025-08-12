import { BattleEndStats } from "./BattleEndStats";
import { useBattleStatsContext, BattleStatsProvider } from "./BattleStatsContext";
import { BattleTraits } from "./BattleTraits";

export const BattleStatsContainer = () => {
  const { toggleTraits, toggleBattleEndStats } = useBattleStatsContext();

  return (
    <>
      {toggleTraits ? <BattleTraits />: <BattleEndStats/>}
    </>
  );
};

