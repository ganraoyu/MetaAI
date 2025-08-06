import { useState } from "react";
import { useTitle } from "../../../utilities/useTitle";
import { UnitAugmentContainer } from "./components/UnitAugmentContainer/UnitAugmentContainer";
import { BattleButtons } from "./components/BattleContainers/BattleButtons";
import { BattleProvider } from "./BattleContext";
import { TraitsContainer } from "./components/BattleContainers/TraitsContainer/TraitsContainer";
import { HexBoard } from "./components/BattleContainers/HexBoard/HexBoard";
import { LogsDisplay } from "./components/BattleContainers/LogDisplay";
import { Filter } from "./components/BattleLogCards/_Filter";
import { HexBoardProvider } from "./components/BattleContainers/HexBoard/HexBoardContext";
import { ItemContainer } from "./components/ItemContainer/ItemContainer";

const BattleContent = () => {
  useTitle("TFT Battle Simulator - Builder");

  const [toggleMovement, setToggleMovement] = useState(true);
  const [toggleAttack, setToggleAttack] = useState(true);
  const [toggleAbility, setToggleAbility] = useState(true);
  const [toggleHeal, setToggleHeal] = useState(true);
  const [toggleItem, setToggleItem] = useState(true);

  return (
    <div className="bg-mainBackground min-h-screen pt-[4.5rem] font-mono">
      <div className="flex-col items-center w-[70rem] mx-auto">
        <div className="flex-col items-center justify-center mr-[2rem] ">
          <h1 className="text-[1.2rem] w-full text-white font-semibold">
            TFT Battle Simulator
          </h1>
          <p className="text-white text-[0.8rem]">
            Get real-time replays of battles with our TFT Battle Simulator
          </p>
        </div>
        {/* Top - Battle Control Buttons */}
        <BattleButtons />

        {/* Main content section */}
        <div className="flex flex-row items-start justify-between h-[35rem] w-[70rem] mx-auto p-4 bg-hexCellBackground rounded-t-2xl">
          {/* Left side - Traits */}
          <TraitsContainer />

          {/* Center - Hex Board */}
          <HexBoard />

          {/* Right side - Battle Logs */}
          <div className="w-[18rem]">
            <Filter
              toggleMovement={toggleMovement}
              toggleAttack={toggleAttack}
              toggleAbility={toggleAbility}
              toggleHeal={toggleHeal}
              toggleItem={toggleItem}
              setToggleMovement={setToggleMovement}
              setToggleAttack={setToggleAttack}
              setToggleAbility={setToggleAbility}
              setToggleHeal={setToggleHeal}
              setToggleItem={setToggleItem}
            />
            <LogsDisplay
              toggleMovement={toggleMovement}
              toggleAttack={toggleAttack}
              toggleAbility={toggleAbility}
              toggleHeal={toggleHeal}
              toggleItem={toggleItem}
              setToggleMovement={setToggleMovement}
              setToggleAttack={setToggleAttack}
              setToggleAbility={setToggleAbility}
              setToggleHeal={setToggleHeal}
              setToggleitem={setToggleItem}
            />
          </div>
        </div>

        {/* Bottom section - Units and Augments */}
        <div className="h-[40rem] w-[70rem] bg-hexCellBackground rounded-b-2xl pl-[1rem] pt-[1.5rem]">
          <div className="flex gap-4 select-none">
            <UnitAugmentContainer />
            <ItemContainer />
          </div>
        </div>
    
      </div>
    </div>
  );
};

const Battle = () => {
  return (
    <BattleProvider>
      <HexBoardProvider>
        <BattleContent />
      </HexBoardProvider>
    </BattleProvider>
  );
};

export default Battle;
