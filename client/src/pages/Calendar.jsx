import { useState, useEffect } from 'react';
import '../styles.css';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('month'); // month or list
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [students, setStudents] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    module: '',
    students: [],
    dueDate: '',
    startDate: new Date().toISOString().slice(0, 16),
    points: 100
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUserRole();
    fetchCalendarEvents();
  }, [currentDate]);

  const fetchUserRole = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setUserRole(data.role);
      
      if (['teacher', 'admin'].includes(data.role)) {
        fetchStudents();
        fetchModules();
      }
    } catch (error) {
      console.error('Failed to fetch user role:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setStudents(data.filter(u => u.role === 'student'));
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const fetchModules = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/modules', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setModules(data);
    } catch (error) {
      console.error('Failed to fetch modules:', error);
    }
  };

  const fetchCalendarEvents = async () => {
    setLoading(true);
    try {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      const res = await fetch(
        `http://localhost:3000/api/calendar?startDate=${startOfMonth.toISOString()}&endDate=${endOfMonth.toISOString()}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch calendar events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:3000/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          students: formData.students.map(s => s.value || s)
        })
      });

      if (res.ok) {
        const assignment = await res.json();
        
        // Publish immediately
        await fetch(`http://localhost:3000/api/assignments/${assignment._id}/publish`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        setShowCreateModal(false);
        setFormData({
          title: '',
          description: '',
          module: '',
          students: [],
          dueDate: '',
          startDate: new Date().toISOString().slice(0, 16),
          points: 100
        });
        fetchCalendarEvents();
      }
    } catch (error) {
      console.error('Failed to create assignment:', error);
    }
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startPadding = firstDay.getDay();
    
    // Previous month padding
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: '#27ae60',
      published: '#3498db',
      draft: '#95a5a6',
      archived: '#7f8c8d',
      overdue: '#e74c3c'
    };
    return colors[status] || '#3498db';
  };

  const isOverdue = (dueDate, status) => {
    if (status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  const days = getDaysInMonth();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>📅 Calendar</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setView('month')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: view === 'month' ? '#3498db' : '#ecf0f1',
                color: view === 'month' ? 'white' : '#2c3e50',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Month View
            </button>
            <button
              onClick={() => setView('list')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: view === 'list' ? '#3498db' : '#ecf0f1',
                color: view === 'list' ? 'white' : '#2c3e50',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              List View
            </button>
          </div>
          
          {['teacher', 'admin'].includes(userRole) && (
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              + Create Assignment
            </button>
          )}
        </div>
      </div>

      {view === 'month' ? (
        <>
          {/* Month Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              ← Previous
            </button>
            <h2>{monthName}</h2>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Next →
            </button>
          </div>

          {/* Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', backgroundColor: '#ddd', border: '1px solid #ddd' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} style={{ backgroundColor: '#34495e', color: 'white', padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                {day}
              </div>
            ))}
            
            {days.map((date, idx) => {
              const dayEvents = date ? getEventsForDate(date) : [];
              const isToday = date && date.toDateString() === new Date().toDateString();
              
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: date ? (isToday ? '#e8f4f8' : 'white') : '#f8f9fa',
                    minHeight: '120px',
                    padding: '0.5rem',
                    cursor: date ? 'pointer' : 'default',
                    border: isToday ? '2px solid #3498db' : 'none',
                    position: 'relative'
                  }}
                  onClick={() => date && setSelectedDate(date)}
                >
                  {date && (
                    <>
                      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: isToday ? '#3498db' : '#2c3e50' }}>
                        {date.getDate()}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {dayEvents.slice(0, 3).map((event, i) => {
                          const status = isOverdue(event.date, event.status) ? 'overdue' : event.status;
                          return (
                            <div
                              key={i}
                              style={{
                                backgroundColor: getStatusColor(status),
                                color: 'white',
                                padding: '2px 6px',
                                borderRadius: '3px',
                                fontSize: '0.75rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {event.title}
                            </div>
                          );
                        })}
                        {dayEvents.length > 3 && (
                          <div style={{ fontSize: '0.7rem', color: '#7f8c8d', textAlign: 'center' }}>
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* List View */
        <div>
          <h2>Upcoming Assignments</h2>
          {loading ? (
            <p>Loading...</p>
          ) : upcomingEvents.length === 0 ? (
            <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>No upcoming assignments</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingEvents.map(event => {
                const status = isOverdue(event.date, event.status) ? 'overdue' : event.status;
                return (
                  <div
                    key={event.id}
                    style={{
                      backgroundColor: 'white',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      borderLeft: `4px solid ${getStatusColor(status)}`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ margin: '0 0 0.5rem 0' }}>{event.title}</h3>
                        <p style={{ margin: '0 0 0.5rem 0', color: '#7f8c8d' }}>{event.description}</p>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
                          <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                          <span>⏰ {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span>🎯 {event.points} points</span>
                        </div>
                      </div>
                      <div
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: getStatusColor(status),
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Selected Date Modal */}
      {selectedDate && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setSelectedDate(null)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              maxWidth: '500px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
            
            {getEventsForDate(selectedDate).length === 0 ? (
              <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>No assignments for this day</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {getEventsForDate(selectedDate).map((event, i) => {
                  const status = isOverdue(event.date, event.status) ? 'overdue' : event.status;
                  return (
                    <div
                      key={i}
                      style={{
                        padding: '1rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '6px',
                        borderLeft: `4px solid ${getStatusColor(status)}`
                      }}
                    >
                      <h4 style={{ margin: '0 0 0.5rem 0' }}>{event.title}</h4>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#7f8c8d' }}>{event.description}</p>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                        <span>🎯 {event.points} points</span>
                        <span style={{ color: getStatusColor(status), fontWeight: 'bold' }}>
                          {status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            <button
              onClick={() => setSelectedDate(null)}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowCreateModal(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Create Assignment</h2>
            <form onSubmit={handleCreateAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Module *</label>
                <select
                  value={formData.module}
                  onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                  <option value="">Select a module</option>
                  {modules.map(m => (
                    <option key={m._id} value={m._id}>{m.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Students *</label>
                <select
                  multiple
                  value={formData.students}
                  onChange={(e) => setFormData({ ...formData, students: Array.from(e.target.selectedOptions, opt => opt.value) })}
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
                >
                  {students.map(s => (
                    <option key={s._id} value={s._id}>{s.username} ({s.email})</option>
                  ))}
                </select>
                <small style={{ color: '#7f8c8d' }}>Hold Ctrl/Cmd to select multiple students</small>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Start Date</label>
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Due Date *</label>
                  <input
                    type="datetime-local"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Points</label>
                <input
                  type="number"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                  min={0}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Create & Publish
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#95a5a6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
