import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Combination from './pages/Combination';
import Business from './pages/Business';
import News from './pages/News';
import Participate from './pages/Participate';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/combination" element={<Combination />} />
            <Route path="/business" element={<Business />} />
            <Route path="/news" element={<News />} />
            <Route path="/participate" element={<Participate />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
