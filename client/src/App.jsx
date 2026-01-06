import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Badges from "./pages/Badges";
import Calendar from "./pages/Calendar";
import MonitoringDashboard from "./pages/MonitoringDashboard";
import Account from "./pages/Account";
import NotificationList from "./components/Notifications/NotificationList";
import { initBackgroundSync } from "./utils/backgroundSync";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  // ✅ Background sync: when token exists, start listening to "online" event
  useEffect(() => {
    if (!token) return;

    const cleanup = initBackgroundSync(token);

    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [token]);

  const handleLogin = (t, u) => {
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <BrowserRouter>
      <NotificationList />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route 
          path="/login" 
          element={
            token ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/register" 
          element={
            token ? <Navigate to="/dashboard" replace /> : <Register onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            token ? (
              <Dashboard token={token} user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/support" 
          element={
            token ? (
              <Support token={token} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/account" 
          element={
            token ? (
              <Account token={token} user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/privacy" 
          element={
            token ? (
              <Privacy token={token} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/badges" 
          element={
            token ? (
              <Badges token={token} user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/calendar" 
          element={
            token ? (
              <Calendar token={token} user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/monitoring" 
          element={
            token && user?.role === 'admin' ? (
              <MonitoringDashboard token={token} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
