import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';  // Import HomePage component
function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />  {/* Route that renders HomePage on "/" */}
    </Routes>
  );
}

export default Router;