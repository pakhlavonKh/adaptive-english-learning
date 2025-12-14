import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, Award, BookOpen, LogOut, User, Shield } from 'lucide-react';

export default function TeacherDashboard({ token, user, onLogout }) {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [stats, setStats] = useState(null);
  const [analyticsError, setAnalyticsError] = useState(null);

  useEffect(() => {
    loadStudents();
    loadAnalytics();
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

  async function loadAnalytics() {
    try {
      // Fetch analytics data from port 8000
      const reportRes = await fetch('http://localhost:8000/api/reports/class/101');
      const reportData = await reportRes.json();
      setReport(reportData);

      const statsRes = await fetch('http://localhost:8000/api/reports/class/101/average');
      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (err) {
      console.error("Analytics fetch error:", err);
      setAnalyticsError("Analytics service not available");
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

      {/* Analytics Service Section (if available) */}
      {stats && report && (
        <div style={{ marginTop: '40px' }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '24px'
          }}>
            📊 Advanced Analytics
          </h3>

          {/* Analytics Cards */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px', backgroundColor: '#e3f2fd', border: '1px solid #bbdefb', borderRadius: '10px', padding: '20px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#1565c0' }}>Class Average Retention</h4>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0d47a1' }}>
                {stats.average_retention}%
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '250px', backgroundColor: '#f3e5f5', border: '1px solid #e1bee7', borderRadius: '10px', padding: '20px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#6a1b9a' }}>Analytics Student Count</h4>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4a148c' }}>
                {stats.student_count}
              </div>
            </div>
          </div>

          {/* Analytics Student Details */}
          {report.data && report.data.length > 0 && (
            <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '10px', padding: '20px' }}>
              <h4 style={{ marginTop: 0, color: '#333', marginBottom: '16px' }}>Detailed Performance Metrics</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5', textAlign: 'left' }}>
                    <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Name</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Level</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Retention Score</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Risk Status</th>
                  </tr>
                </thead>
                <tbody>
                  {report.data.map((student) => (
                    <tr key={student.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px' }}><strong>{student.name}</strong></td>
                      <td style={{ padding: '12px' }}>{student.level}</td>
                      <td style={{ padding: '12px' }}>{student.retention}%</td>
                      <td style={{ padding: '12px' }}>
                        {student.risk ? (
                          <span style={{ color: 'red', fontWeight: 'bold', padding: '4px 8px', background: '#fee', borderRadius: '4px' }}>
                            ⚠️ AT RISK
                          </span>
                        ) : (
                          <span style={{ color: 'green', fontWeight: 'bold', padding: '4px 8px', background: '#efe', borderRadius: '4px' }}>
                            ✓ ON TRACK
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {analyticsError && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          color: '#856404'
        }}>
          ℹ️ {analyticsError} (Analytics service on port 8000 is optional)
        </div>
      )}
      </div>
    </div>
  );
}
