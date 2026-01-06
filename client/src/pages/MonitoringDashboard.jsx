import { useState, useEffect } from 'react';
import '../styles.css';

export default function MonitoringDashboard({ token }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000); // 5 seconds default
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchDashboardData();

    if (autoRefresh) {
      const interval = setInterval(fetchDashboardData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/monitoring/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Failed to fetch monitoring data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading monitoring data...</h2>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Failed to load monitoring data</h2>
      </div>
    );
  }

  const { health, performance, endpoints, system } = dashboardData;

  const getStatusColor = (status) => {
    const colors = {
      healthy: '#27ae60',
      degraded: '#f39c12',
      unhealthy: '#e74c3c',
      warning: '#f39c12',
      error: '#e74c3c'
    };
    return colors[status] || '#95a5a6';
  };

  const getStatusIcon = (status) => {
    const icons = {
      healthy: '✅',
      degraded: '⚠️',
      unhealthy: '❌',
      warning: '⚠️',
      error: '❌'
    };
    return icons[status] || '❓';
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>📊 System Monitoring</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            Auto-refresh
          </label>
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            disabled={!autoRefresh}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value={1000}>1s</option>
            <option value={5000}>5s</option>
            <option value={10000}>10s</option>
            <option value={30000}>30s</option>
          </select>
          <button
            onClick={fetchDashboardData}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Overall Health Status */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: `6px solid ${getStatusColor(health.status)}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '3rem' }}>{getStatusIcon(health.status)}</span>
          <div>
            <h2 style={{ margin: 0 }}>System Status: {health.status.toUpperCase()}</h2>
            <p style={{ margin: '0.5rem 0 0 0', color: '#7f8c8d' }}>
              Last check: {new Date(health.lastCheck).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Health Checks Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          {Object.entries(health.checks).map(([name, check]) => (
            <div
              key={name}
              style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                borderLeft: `4px solid ${getStatusColor(check.status)}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ textTransform: 'capitalize' }}>{name}</strong>
                <span>{getStatusIcon(check.status)}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                {check.heapUsed && <div>Memory: {check.heapUsed} / {check.heapTotal} ({check.usagePercent})</div>}
                {check.formatted && <div>Uptime: {check.formatted}</div>}
                {check.connected !== undefined && <div>Connected: {check.connected ? 'Yes' : 'No'}</div>}
                {check.error && <div style={{ color: '#e74c3c' }}>Error: {check.error}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Requests */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>📈 Requests</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total:</span>
              <strong>{performance.requests.total.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Success:</span>
              <strong style={{ color: '#27ae60' }}>{performance.requests.success.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Errors:</span>
              <strong style={{ color: '#e74c3c' }}>{performance.requests.errors.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Success Rate:</span>
              <strong>{performance.requests.successRate}</strong>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>⚡ Response Time</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Average:</span>
              <strong>{performance.responseTime.average}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Min:</span>
              <strong style={{ color: '#27ae60' }}>{performance.responseTime.min}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Max:</span>
              <strong style={{ color: '#e74c3c' }}>{performance.responseTime.max}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>P95:</span>
              <strong>{performance.responseTime.p95}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>P99:</span>
              <strong>{performance.responseTime.p99}</strong>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>💻 System</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Uptime:</span>
              <strong>{performance.uptime.formatted}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Node Version:</span>
              <strong>{system.nodeVersion}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Platform:</span>
              <strong>{system.platform}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Process ID:</span>
              <strong>{system.pid}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Endpoint Metrics */}
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>🎯 Endpoint Performance</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Endpoint</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Total</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Success</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Errors</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Error Rate</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Avg Response</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.slice(0, 20).map((endpoint, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    {endpoint.endpoint}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    {endpoint.total.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', color: '#27ae60' }}>
                    {endpoint.success.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', color: endpoint.errors > 0 ? '#e74c3c' : '#7f8c8d' }}>
                    {endpoint.errors.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', color: parseFloat(endpoint.errorRate) > 5 ? '#e74c3c' : '#7f8c8d' }}>
                    {endpoint.errorRate}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    {endpoint.avgResponseTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {endpoints.length > 20 && (
          <p style={{ marginTop: '1rem', color: '#7f8c8d', textAlign: 'center', fontSize: '0.9rem' }}>
            Showing top 20 of {endpoints.length} endpoints
          </p>
        )}
      </div>
    </div>
  );
}
