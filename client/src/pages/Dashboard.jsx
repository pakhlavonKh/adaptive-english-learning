import React, { useState, useEffect } from 'react';
import { getNextQuestion, submit, seed } from '../api';

export default function Dashboard({ token, user, onLogout }){
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(null);

  const checkInitialPath = async () => {
    try {
      setCheckingPath(true);
      const result = await checkNeedsGeneration(token);
      setNeedsPathGeneration(result.needsGeneration);
    } catch (e) {
      console.error('Failed to check path generation:', e);
      setNeedsPathGeneration(false);
    } finally {
      setCheckingPath(false);
    }
  };

  useEffect(()=>{ 
    checkInitialPath(); 
  }, []);

  const handlePathGenerated = (path) => {
    setGeneratedPath(path);
    setNeedsPathGeneration(false);
  };

  // Show loading state while checking
  if (checkingPath) {
    return (
      <div className="dashboard-container">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#666', fontSize: '16px' }}>Setting up your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show path generator for new users
  if (needsPathGeneration) {
    return (
      <div className="dashboard-container">
        <InitialPathGenerator 
          token={token} 
          onComplete={handlePathGenerated}
        />
      </div>
    );
  }

  // FR23: Support sayfası gösteriliyorsa, onu render et
  if (showSupport) {
    return <Support token={token} onBack={() => setShowSupport(false)} />;
  }

  return (
    <div className="container">
      <div className="top">
        <h2>Welcome, {user?.username}</h2>
        <div>
          <button onClick={onLogout}>Logout</button>
          <button onClick={async ()=>{ await seed(); await load(); }}>Seed</button>
        </div>
      </div>
    </div>
  );
}
