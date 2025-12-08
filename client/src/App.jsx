import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Protected Route Wrapper
function ProtectedRoute({ token, children }) {
  return token ? children : <Navigate to="/login" replace />;
}

// Auth Wrapper Component
function AuthPages() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route 
          path="/login" 
          element={<Login />}
        />
        <Route 
          path="/register" 
          element={<Register />}
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute token={token}>
              <Dashboard 
                token={token} 
                user={user} 
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <div className="app-root">
      <Router>
        <AuthPages />
      </Router>
    </div>
  );
}