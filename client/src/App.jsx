<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
// 1. ADIM: Bileşeni buraya import ediyoruz
import NotificationList from './components/Notifications/NotificationList';
import Account from './pages/Account';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
=======
import React, { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { initBackgroundSync } from "./utils/backgroundSync";
>>>>>>> origin/zerda

export default function App() {
  const [page, setPage] = useState("landing");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  // On first load: if token exists, go to dashboard
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      setPage("dashboard");
    }
  }, []);

<<<<<<< HEAD
  // 2. ADIM: Giriş yapılmışsa (Token varsa) hem Bildirimleri hem Dashboard'u göster
  // React'te birden fazla bileşeni aynı anda döndürmek için <> ... </> (Fragment) içine almamız gerekir.
  if (token) return (
    <>
      <NotificationList />
      <Dashboard 
        token={token} 
        user={user} 
        onLogout={() => { 
          localStorage.removeItem('token'); 
          localStorage.removeItem('user'); 
          setToken(null); 
          setUser(null); 
          setPage('landing'); 
        }} 
      />
    </>
  );
}
=======
  // ✅ Background sync: when token exists, start listening to "online" event
  useEffect(() => {
    if (!token) return;
>>>>>>> origin/zerda

    // initBackgroundSync should return a cleanup function (recommended)
    // If your initBackgroundSync doesn't return anything, this still works.
    const cleanup = initBackgroundSync(token);

    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setPage("landing");
  };

  if (token)
    return <Dashboard token={token} user={user} onLogout={handleLogout} />;

  if (page === "landing")
    return <Landing onGetStarted={() => setPage("login")} />;

  return (
    <div className="container">
      {/* 3. ADIM: Login/Register ekranlarında da görünmesi için buraya ekliyoruz */}
      <NotificationList />
      
      <h1>Adaptive English</h1>

      <div className="auth">
<<<<<<< HEAD
        {page === 'login' ? (
          <Login 
            onLogin={(t,u)=>{
              localStorage.setItem('token', t); 
              localStorage.setItem('user', JSON.stringify(u)); 
              setToken(t); 
              setUser(u);
            }}
            onSwitchToRegister={() => setPage('register')}
=======
        {page === "login" ? (
          <Login
            onLogin={(t, u) => {
              localStorage.setItem("token", t);
              localStorage.setItem("user", JSON.stringify(u));
              setToken(t);
              setUser(u);
              setPage("dashboard");
            }}
            onSwitchToRegister={() => setPage("register")}
>>>>>>> origin/zerda
          />
        ) : (
          <Register onSwitchToLogin={() => setPage("login")} />
        )}
      </div>

      <button className="back-button" onClick={() => setPage("landing")}>
        ← Back
      </button>
    </div>
  );
