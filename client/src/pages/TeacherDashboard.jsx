import React, { useState, useEffect } from 'react';

export default function TeacherDashboard() {
  // States to hold data
  const [report, setReport] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // 1. Fetch Class Report
        const reportRes = await fetch('http://localhost:8000/api/reports/class/101');
        const reportData = await reportRes.json();
        setReport(reportData);

        // 2. Fetch Class Average
        const statsRes = await fetch('http://localhost:8000/api/reports/class/101/average');
        const statsData = await statsRes.json();
        setStats(statsData);
        
        setLoading(false);
      } catch (err) {
        console.error("Data fetch error:", err);
        setError("Could not connect to Analytics Service. Is the Backend (Port 8000) running?");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading analytics data...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}> {error}</div>;

  return (
    <div className="teacher-dashboard" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      <h2 style={{ color: '#2196F3', borderBottom: '2px solid #2196F3', paddingBottom: '10px' }}>
        📊 Teacher Analytics Panel
      </h2>

      {/* --- CARD 1: CLASS SUMMARY --- */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', backgroundColor: '#e3f2fd', border: '1px solid #bbdefb', borderRadius: '10px', padding: '20px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#1565c0' }}>Class Average Retention</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0d47a1' }}>
            %{stats ? stats.average_retention : '-'}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '250px', backgroundColor: '#f3e5f5', border: '1px solid #e1bee7', borderRadius: '10px', padding: '20px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#6a1b9a' }}>Total Students</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4a148c' }}>
            {stats ? stats.student_count : '-'}
          </div>
        </div>
      </div>

      {/* --- CARD 2: STUDENT LIST --- */}
      <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '10px', padding: '20px' }}>
        <h3 style={{ marginTop: 0, color: '#333' }}>Student Performance Details</h3>
        {report && report.data.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5', textAlign: 'left' }}>
                <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Name</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Level</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Score</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {report.data.map((student) => (
                <tr key={student.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}><strong>{student.name}</strong></td>
                  <td style={{ padding: '12px' }}>{student.level}</td>
                  <td style={{ padding: '12px' }}>%{student.retention}</td>
                  <td style={{ padding: '12px' }}>
                    {student.risk ? <span style={{ color: 'red', fontWeight: 'bold' }}> RISKY</span> : <span style={{ color: 'green', fontWeight: 'bold' }}> OK</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No student data found.</p>
        )}
      </div>
    </div>
  );
}