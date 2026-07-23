import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/common/NavigationBar';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Management from './pages/Management';
import CSR from './pages/CSR';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <ScrollToTop/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path ="/management" element={<Management/>} />
        <Route path="/csr" element={<CSR />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;