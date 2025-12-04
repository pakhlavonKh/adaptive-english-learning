import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);
  }, []);

  if (!token) return (
    <div className="container">
      <h1>Adaptive English</h1>
      <div className="auth">
        <Login onLogin={(t,u)=>{localStorage.setItem('token', t); localStorage.setItem('user', JSON.stringify(u)); setToken(t); setUser(u);}} />
        <Register />
      </div>
    </div>
  );

  return <Dashboard token={token} user={user} onLogout={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); setToken(null); setUser(null); }} />;
}
