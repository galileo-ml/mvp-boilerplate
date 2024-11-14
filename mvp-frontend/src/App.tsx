import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import Home from '@/pages/home';
import { Login } from '@/pages/login';
import { Signup } from "@/pages/signup";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;