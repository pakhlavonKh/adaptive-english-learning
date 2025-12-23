import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNextQuestion, submit, seed, checkNeedsGeneration } from '../api';
import LearningPath from './LearningPath';
import InitialPathGenerator from '../components/InitialPathGenerator';
import AIAssistant from '../components/AIAssistant';

function getLanguageCode() {
  return localStorage.getItem("languageCode") || "en";
}

function appendOfflineProgress(entry) {
  const key = "offlineProgress";
  const existingRaw = localStorage.getItem(key);
  const existing = existingRaw ? JSON.parse(existingRaw) : [];
  const list = Array.isArray(existing) ? existing : [existing];
  list.push(entry);
  localStorage.setItem(key, JSON.stringify(list));
}

export default function Dashboard({ token, user, onLogout }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [needsPathGeneration, setNeedsPathGeneration] = useState(false);
  const [checkingPath, setCheckingPath] = useState(true);
  const [generatedPath, setGeneratedPath] = useState(null);
  const [showPath, setShowPath] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const load = async () => {
    try {
      const lang = getLanguageCode();
      const q = await getNextQuestion(token, lang);

      if (q.message) {
        setQuestion(null);
        setStatus(q.message);
      } else {
        setQuestion(q);
        setStatus(null);
      }
    } catch (e) {
      setStatus(e.response?.data?.error || 'Failed to load');
    }
  };

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

  useEffect(() => {
    checkInitialPath();
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePathGenerated = (path) => {
    setGeneratedPath(path);
    setNeedsPathGeneration(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) return;

    const userAnswer = (answer || '').trim();
    const correct =
      userAnswer.toLowerCase() === (question.answer || '').toLowerCase();

    const payload = {
      questionId: question.id,
      correct,
      // helpful metadata for sync/debugging
      languageCode: getLanguageCode(),
      answeredAt: new Date().toISOString()
    };

    try {
      const res = await submit(token, question.id, correct);
      setStatus(res.correct ? 'Correct' : 'Incorrect');
      setAnswer('');
      await load();
    } catch (e) {
      // If offline / network error, save progress locally for background sync
      const isNetworkError = !e.response; // axios: no response usually means network/offline
      if (isNetworkError) {
        appendOfflineProgress(payload);
        setStatus('Offline: progress saved and will sync when internet returns ✅');
        setAnswer('');
        await load();
        return;
      }

      setStatus(e.response?.data?.error || 'Submit failed');
    }
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

  return (
    <div className="dashboard-full">
      <nav className="dashboard-nav">
        <div className="dashboard-nav-container">
          <h1 className="dashboard-title">📖 Adaptive English</h1>
          <div className="dashboard-nav-links">
            <button className="nav-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="nav-link" onClick={() => setShowPath((s) => !s)}>Learning Path</button>
            <button className="nav-link" onClick={() => setShowAI((s) => !s)}>AI Assistant</button>
            <button className="nav-link" onClick={() => navigate('/support')}>Support</button>
            <button className="nav-link" onClick={() => navigate('/account')}>Account</button>
            <button className="btn-logout" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2 className="welcome-text">Welcome back, {user?.username}! 👋</h2>
          <p className="welcome-subtitle">Ready to continue your English learning journey?</p>
        </div>

        {/* {status && <div className="status-message">{status}</div>} */}

        

        {showPath && (
          <div className="content-panel">
            <LearningPath token={token} />
          </div>
        )}

        {showAI && (
          <div className="content-panel">
            <AIAssistant token={token} />
          </div>
        )}
      </div>
    </div>
  );
}
