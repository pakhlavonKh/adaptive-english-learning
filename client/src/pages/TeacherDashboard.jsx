import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, Award, BookOpen, LogOut, User, Shield } from 'lucide-react';

export default function TeacherDashboard({ token, user, onLogout }) {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const res = await fetch('http://localhost:4000/api/teacher/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setStudents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-main">
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading students...</div>
        </div>
      </div>
    );
  }

  const totalStudents = students.length;
  const avgTheta = students.reduce((sum, s) => sum + (s.theta || 0), 0) / totalStudents || 0;
  const totalQuestions = students.reduce((sum, s) => sum + (s.stats?.totalQuestions || 0), 0);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1>Teacher Dashboard</h1>
            <p className="header-subtitle">Monitor student progress and performance</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              className="logout-btn" 
              onClick={() => navigate('/dashboard')}
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <BookOpen size={20} />
              Dashboard
            </button>
            <button 
              className="logout-btn" 
              onClick={() => navigate('/account')}
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <User size={20} />
              Account
            </button>
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

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{
        fontSize: '32px',
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <Users size={36} color="#667eea" />
        Teacher Dashboard
      </h2>
      <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px' }}>
        Monitor student progress and performance
      </p>

      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '24px',
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Users size={24} />
            <span style={{ fontSize: '14px', opacity: 0.9 }}>Total Students</span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: '800' }}>{totalStudents}</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: '24px',
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <TrendingUp size={24} />
            <span style={{ fontSize: '14px', opacity: 0.9 }}>Avg Ability (θ)</span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: '800' }}>{avgTheta.toFixed(2)}</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          padding: '24px',
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 4px 15px rgba(250, 112, 154, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <BookOpen size={24} />
            <span style={{ fontSize: '14px', opacity: 0.9 }}>Total Questions</span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: '800' }}>{totalQuestions}</div>
        </div>
      </div>

      {/* Students Table */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(102, 126, 234, 0.1)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '24px'
        }}>
          Student Performance
        </h3>

        {students.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            No students found
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#667eea', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase' }}>
                    Username
                  </th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#667eea', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase' }}>
                    Name
                  </th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#667eea', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase' }}>
                    Ability (θ)
                  </th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#667eea', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase' }}>
                    Questions
                  </th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#667eea', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase' }}>
                    Accuracy
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student._id} style={{
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '16px', fontWeight: '600', color: '#1a1a1a' }}>
                      {student.username}
                    </td>
                    <td style={{ padding: '16px', color: '#666' }}>
                      {student.firstName && student.lastName 
                        ? `${student.firstName} ${student.lastName}`
                        : '-'}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontSize: '14px'
                      }}>
                        {student.theta?.toFixed(2) || '0.00'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#333' }}>
                      {student.stats?.totalQuestions || 0}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{
                        color: (student.stats?.accuracy || 0) >= 70 ? '#155724' : (student.stats?.accuracy || 0) >= 50 ? '#856404' : '#721c24',
                        fontWeight: '700',
                        fontSize: '16px'
                      }}>
                        {student.stats?.accuracy || 0}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
