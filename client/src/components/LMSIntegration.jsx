import React, { useState, useEffect } from 'react';
import { getLMSData, syncWithLMS, importLMSAssignments } from '../api';

export default function LMSIntegration({ token }) {
  const [lmsData, setLmsData] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadLMSData();
  }, []);

  async function loadLMSData() {
    try {
      const data = await getLMSData(token);
      setLmsData(data.lmsData);
      setStudentId(data.lmsStudentId || '');
    } catch (e) {
      console.error('Failed to load LMS data:', e);
    }
  }

  async function handleSync() {
    if (!studentId) {
      setMessage({ type: 'error', text: 'Please enter your LMS Student ID' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await syncWithLMS(token, studentId);
      if (result.success) {
        setMessage({ type: 'success', text: 'LMS data synced successfully!' });
        await loadLMSData();
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'Sync failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  async function handleImport() {
    setLoading(true);
    try {
      const result = await importLMSAssignments(token);
      setMessage({ 
        type: 'success', 
        text: `Imported ${result.imported} assignments as practice modules!` 
      });
    } catch (e) {
      setMessage({ type: 'error', text: 'Import failed.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lms-integration-section">
      <h3>🎓 LMS Integration (Canvas)</h3>
      <p className="section-description">
        Connect your Canvas LMS account to sync grades and import assignments
      </p>

      {message && (
        <div className={`alert ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="lms-form">
        <div className="form-group">
          <label>Canvas Student ID</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter your Canvas student ID"
            className="lms-input"
          />
        </div>

        <div className="lms-actions">
          <button 
            onClick={handleSync} 
            className="btn-lms-sync"
            disabled={loading}
          >
            {loading ? '⏳ Syncing...' : '🔄 Sync LMS Data'}
          </button>

          {lmsData && (
            <button 
              onClick={handleImport} 
              className="btn-lms-import"
              disabled={loading}
            >
              📥 Import Assignments
            </button>
          )}
        </div>
      </div>

      {lmsData && (
        <div className="lms-data-display">
          <h4>📊 Your LMS Data</h4>
          <div className="lms-stats">
            <div className="lms-stat">
              <span className="stat-label">GPA</span>
              <span className="stat-value">{lmsData.gpa?.toFixed(2) || 'N/A'}</span>
            </div>
            <div className="lms-stat">
              <span className="stat-label">Courses</span>
              <span className="stat-value">{lmsData.courses?.length || 0}</span>
            </div>
            <div className="lms-stat">
              <span className="stat-label">Last Sync</span>
              <span className="stat-value">
                {lmsData.lastSync ? new Date(lmsData.lastSync).toLocaleDateString() : 'Never'}
              </span>
            </div>
          </div>

          {lmsData.courses && lmsData.courses.length > 0 && (
            <div className="lms-courses">
              <h5>Your Courses</h5>
              {lmsData.courses.map((course, idx) => (
                <div key={idx} className="course-card">
                  <div className="course-header">
                    <strong>{course.name}</strong>
                    <span className="course-grade">Grade: {course.grade}%</span>
                  </div>
                  <div className="course-progress">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${course.progress}%` }}
                    />
                    <span className="progress-text">{course.progress}% Complete</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
