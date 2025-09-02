import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import Main from './pages/Main';
import Combination from './pages/Combination';
import Business from './pages/Business';
import News from './pages/News';
import Participate from './pages/Participate';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header variant="dark" />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/combination" element={<Combination />} />
            <Route path="/business" element={<Business />} />
            <Route path="/news" element={<News />} />
            <Route path="/participate" element={<Participate />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
