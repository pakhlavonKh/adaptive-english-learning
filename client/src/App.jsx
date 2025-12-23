import React, { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotificationList from "./components/Notifications/NotificationList";
import { initBackgroundSync } from "./utils/backgroundSync";

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

  // ✅ Background sync: when token exists, start listening to "online" event
  useEffect(() => {
    if (!token) return;

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
}
