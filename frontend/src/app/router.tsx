import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';  
import GuidePage from './pages/GuidePage.tsx'; 
import InfoPage from './pages/InfoPage.tsx'; 
import AboutPage from './pages/AboutPage.tsx';

import ChampionsTierlist from './pages/tierlists/ChampionsTierlist.tsx'; 
import ItemsTierlist from './pages/tierlists/ItemsTierlist.tsx';
import AugmentsTierlist from './pages/tierlists/AugmentsTierlist.tsx';

import ChampionsData from './pages/data/ChampionsData.tsx'; 
import ItemsData from './pages/data/ItemsData.tsx';
import AugmentsData from './pages/data/AugmentsData.tsx';

import ChampionsStatistics from './pages/statistics/ChampionsStatistics.tsx';
import ItemsStatistics from './pages/statistics/ItemsStatistics.tsx';

import RollingOdds from './pages/simulators/RollingOdds.tsx';
import Battle from './pages/simulators/battle/Battle.tsx';
import { CoachPage } from './pages/aiCoach/CoachPage.tsx';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/coach" element={<CoachPage />} />
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
        <Route path="items" element={<ItemsData />} />
        <Route path="augments" element={<AugmentsData />} />
      </Route>
      <Route path="/statistics">
        <Route path = "champions" element={<ChampionsStatistics />} />
        <Route path = "items" element={<ItemsStatistics />} />
      </Route>
      <Route path="/simulator"> 
        <Route path="rolling-odds" element={<RollingOdds />} />
        <Route path="battle" element={<Battle />} />
      </Route>
    </Routes>
  );
}

export default Router;