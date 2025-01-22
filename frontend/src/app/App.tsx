import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Router from './router.tsx'; 
import Header from './components/Header.tsx'; 
import Footer from './components/Footer.tsx';
import './index.css';

function App() {
  return (
    <BrowserRouter>        
      <Header />
      <Routes>
        <Route path="/Stratify" element={<Router />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;