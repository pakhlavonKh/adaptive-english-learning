import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkNeedsGeneration } from '../api';
import { LogOut, BookOpen, User, Users, Shield } from 'lucide-react';
import LearningPath from './LearningPath';
import InitialPathGenerator from '../components/InitialPathGenerator';

export default function Dashboard({ token, user, onLogout }){
  const navigate = useNavigate();
  const [needsPathGeneration, setNeedsPathGeneration] = useState(false);
  const [generatedPath, setGeneratedPath] = useState(null);
  const [checkingPath, setCheckingPath] = useState(true);

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
        {/* Learning Path */}
        <div className="learning-path-container">
          <div className="learning-path-header">
            <h3>Your Learning Path</h3>
            <BookOpen size={20} color="#667eea" />
          </div>
          <LearningPath token={token} />
        </div>
      </div>
    </div>
  );
}
