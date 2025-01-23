import { BrowserRouter } from 'react-router-dom';
import Router from './router.tsx'; 
import Header from './components/Header.tsx'; 
import Footer from './components/Footer.tsx';
import './index.css';

function App() {
  return (
    <BrowserRouter basename='/Stratify/'>        
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;