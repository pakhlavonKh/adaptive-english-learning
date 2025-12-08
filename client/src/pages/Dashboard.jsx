import React, { useState, useEffect } from 'react';
import { getNextQuestion, submit, seed } from '../api';
import { LogOut, BookOpen, Zap, BarChart3, ChevronRight } from 'lucide-react';
import LearningPath from './LearningPath';

export default function Dashboard({ token, user, onLogout }){
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(null);
  const [showPath, setShowPath] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  }

  useEffect(()=>{ load(); }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const correct = (answer || '').trim().toLowerCase() === (question.answer || '').toLowerCase();
    try{
      const res = await submit(token, question.id, correct);
      setStatus(res.correct ? 'Correct! ✓' : 'Incorrect. Try again!');
      setAnswer('');
      setTimeout(() => load(), 1500);
    }catch(e){
      setStatus(e.response?.data?.error || 'Submit failed');
    }
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
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={20} />
            Logout
          </button>
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
