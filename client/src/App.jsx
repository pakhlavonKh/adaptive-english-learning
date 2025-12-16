import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
// FR17: Yeni In-App Notification sistemi (Çan ikonu)
import NotificationBell from './components/Notifications/NotificationBell';

export default function App() {
  const [page, setPage] = useState('landing');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      setPage('dashboard');
    }
  }, []);

  // Kullanıcı giriş yaptıysa Dashboard ve NotificationBell göster
  if (token) return (
    <>
      {/* FR17: Çan ikonu - Kullanıcı giriş yaptığında sağ üstte görünür */}
      <NotificationBell token={token} />
      
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

  // Landing page'de bildirim sistemi gösterme
  if (page === 'landing') return <Landing onGetStarted={() => setPage('login')} />;

  // Login/Register sayfalarında da bildirim yok
  return (
    <div className="container">
      <h1>Adaptive English</h1>
      <div className="auth">
        {page === 'login' ? (
          <Login 
            onLogin={(t,u)=>{
              localStorage.setItem('token', t); 
              localStorage.setItem('user', JSON.stringify(u)); 
              setToken(t); 
              setUser(u);
            }}
            onSwitchToRegister={() => setPage('register')}
          />
        ) : (
          <Register 
            onSwitchToLogin={() => setPage('login')}
          />
        )}
      </div>
      <button className="back-button" onClick={() => setPage('landing')}>← Back</button>
    </div>
  );
}