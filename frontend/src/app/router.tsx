import { Routes, Route } from "react-router-dom";
import HomePage from "./features/HomePage.tsx";
import GuidePage from "./features/GuidePage.tsx";
import InfoPage from "./features/InfoPage.tsx";
import AboutPage from "./features/AboutPage.tsx";

import ChampionsTierlist from "./features/tierLists/ChampionsTierlist.tsx";
import ItemsTierlist from "./features/tierLists/ItemsTierlist.tsx";
import AugmentsTierlist from "./features/tierLists/AugmentsTierlist.tsx";

import { ChampionsData } from "./features/stats/ChampionData/ChampionData.tsx";
import AugmentsData from "./features/stats/AugmentsData/AugmentsData.tsx";

import ChampionsStatistics from "./features/statistics/ChampionsStatistics.tsx";
import ItemsStatistics from "./features/statistics/ItemsStatistics.tsx";

import RollingOdds from "./features/simulators/RollingOdds.tsx";
import Battle from "./features/simulators/battle/Battle.tsx";
import { ChatPage } from "./features/aiCoach/ChatPage.tsx";
import { ItemData } from "./features/stats/ItemsData/ItemData.tsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/coach" element={<ChatPage />} />
      <Route path="/guide" element={<GuidePage />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/tierlist">
        <Route path="champions" element={<ChampionsTierlist />} />
        <Route path="items" element={<ItemsTierlist />} />
        <Route path="augments" element={<AugmentsTierlist />} />
      </Route>
      <Route path="/data">
        <Route path="champions" element={<ChampionsData />} />
        <Route path="items" element={<ItemData />} />
        <Route path="augments" element={<AugmentsData />} />
      </Route>
      <Route path="/statistics">
        <Route path="champions" element={<ChampionsStatistics />} />
        <Route path="items" element={<ItemsStatistics />} />
      </Route>
      <Route path="/simulator">
        <Route path="rolling-odds" element={<RollingOdds />} />
        <Route path="battle" element={<Battle />} />
      </Route>
    </Routes>
  );
}

export default Router;
