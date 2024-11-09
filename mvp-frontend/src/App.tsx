import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;