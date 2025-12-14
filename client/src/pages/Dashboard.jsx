import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNextQuestion, submit, seed, checkNeedsGeneration } from '../api';
import { LogOut, BookOpen, Zap, BarChart3, ChevronRight, User, Users, Shield } from 'lucide-react';
import LearningPath from './LearningPath';
import InitialPathGenerator from '../components/InitialPathGenerator';

export default function Dashboard({ token, user, onLogout }){
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(null);
  const [showPath, setShowPath] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [needsPathGeneration, setNeedsPathGeneration] = useState(false);
  const [generatedPath, setGeneratedPath] = useState(null);
  const [checkingPath, setCheckingPath] = useState(true);

  const checkInitialPath = async () => {
    try {
      setCheckingPath(true);
      const result = await checkNeedsGeneration(token);
      setNeedsPathGeneration(result.needsGeneration);
      
      // If user doesn't need path generation, load questions normally
      if (!result.needsGeneration) {
        await load();
      }
    } catch (e) {
      console.error('Failed to check path generation:', e);
      setNeedsPathGeneration(false);
      await load();
    } finally {
      setCheckingPath(false);
    }
  };

  const load = async () => {
    try{
      setIsLoading(true);
      const q = await getNextQuestion(token);
      if(q.message){
        setQuestion(null);
        setStatus(q.message);
      } else {
        setQuestion(q);
        setStatus(null);
      }
    }catch(e){
      setStatus(e.response?.data?.error || 'Failed to load');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{ 
    checkInitialPath(); 
  }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const correct = (answer || '').trim().toLowerCase() === (question.answer || '').toLowerCase();
    try{
      const res = await submit(token, question._id || question.id, correct);
      setStatus(res.correct ? 'Correct! ✓' : 'Incorrect. Try again!');
      setAnswer('');
      setTimeout(() => load(), 1500);
    }catch(e){
      setStatus(e.response?.data?.error || 'Submit failed');
    }
  }

  const handlePathGenerated = (path) => {
    setGeneratedPath(path);
    setNeedsPathGeneration(false);
    setShowPath(true);
    // Load first question after path generation
    load();
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
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1>Welcome back, <span className="gradient-text">{user?.username}</span>!</h1>
            <p className="header-subtitle">Continue your English learning journey</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              className="logout-btn" 
              onClick={() => navigate('/account')}
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <User size={20} />
              Account
            </button>
            {(user?.role === 'teacher' || user?.role === 'admin') && (
              <button 
                className="logout-btn" 
                onClick={() => navigate('/teacher')}
                style={{ background: 'rgba(79, 172, 254, 0.2)' }}
              >
                <Users size={20} />
                Teacher
              </button>
            )}
            {user?.role === 'admin' && (
              <button 
                className="logout-btn" 
                onClick={() => navigate('/admin')}
                style={{ background: 'rgba(240, 147, 251, 0.2)' }}
              >
                <Shield size={20} />
                Admin
              </button>
            )}
            <button className="logout-btn" onClick={onLogout}>
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Question Card */}
        {question ? (
          <div className="question-card-wrapper">
            <div className="question-card">
              <div className="question-header">
                <div className="question-badge">Question</div>
                <span className="difficulty-indicator">{question.difficulty || 'Medium'}</span>
              </div>
              
              <div className="question-content">
                <h2>{question.text}</h2>
              </div>

              <form onSubmit={handleSubmit} className="answer-form">
                <div className="input-group">
                  <input 
                    type="text"
                    value={answer} 
                    onChange={e=>setAnswer(e.target.value)} 
                    placeholder="Type your answer here..."
                    className="answer-input"
                    disabled={isLoading}
                    autoFocus
                  />
                  <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? 'Checking...' : 'Submit Answer'}
                    <ChevronRight size={18} />
                  </button>
                </div>
              </form>

              {status && (
                <div className={`status-message ${status.includes('Correct') ? 'success' : status.includes('Incorrect') ? 'error' : 'info'}`}>
                  {status}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="question-card-wrapper">
            <div className="no-questions-card">
              <div className="empty-state">
                <Zap size={48} color="#667eea" strokeWidth={1.5} />
                <h2>All caught up!</h2>
                <p>{status || 'No questions due right now. Great work!'}</p>
                <button 
                  className="seed-btn" 
                  onClick={async ()=>{ await seed(); await load(); }}
                >
                  Load More Questions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className={`action-btn ${showPath ? 'active' : ''}`}
            onClick={()=>setShowPath(s=>!s)}
          >
            <BarChart3 size={20} />
            {showPath ? 'Hide' : 'View'} Learning Path
          </button>
        </div>

        {/* Learning Path */}
        {showPath && (
          <div className="learning-path-container">
            <div className="learning-path-header">
              <h3>Your Learning Path</h3>
              <BookOpen size={20} color="#667eea" />
            </div>
            <LearningPath token={token} />
          </div>
        )}
      </div>
    </div>
  );
}
