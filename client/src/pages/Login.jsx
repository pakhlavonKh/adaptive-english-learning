import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { Mail, Lock, ArrowRight, ChevronLeft } from 'lucide-react';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(username, password);
      onLogin(res.token, res.user);
      navigate('/dashboard');
    } catch(e) {
      setErr(e.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-background">
        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" alt="background" />
      </div>
      <form onSubmit={submit} className="auth-card">
        <button type="button" className="back-button" onClick={() => navigate('/')}>
          <ChevronLeft size={20} />
          Back
        </button>
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your learning journey</p>
        </div>
        
        {err && <div className="error-alert">{err}</div>}
        
        <div className="form-group">
          <label>Email or Username</label>
          <div className="input-wrapper">
            <Mail size={20} className="input-icon" />
            <input 
              type="text"
              placeholder="Enter your username" 
              value={username} 
              onChange={e=>setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-wrapper">
            <Lock size={20} className="input-icon" />
            <input 
              type="password"
              placeholder="Enter your password" 
              value={password} 
              onChange={e=>setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
          {!loading && <ArrowRight size={20} />}
        </button>

        <div className="auth-divider">
          <span>New to Adaptive English?</span>
        </div>

        <p className="auth-switch">
          <button 
            type="button" 
            className="link-button-auth" 
            onClick={() => navigate('/register')}
          >
            Create an account
          </button>
        </p>
      </form>
    </div>
  );
}

