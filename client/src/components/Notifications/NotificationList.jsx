// src/components/Notifications/NotificationList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * NotificationList Component
 * Displays a list of system notifications from the API server
 * Uses the centralized notification service endpoints
 */
const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const response = await axios.get(`/api/notifications/${userId}`);
        setNotifications(response.data.unread || []);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  const markAsRead = async (notificationId) => {
    try {
      await axios.post(`/api/notifications/${userId}/mark-read/${notificationId}`);
      setNotifications(notifications.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  // Simple CSS styles for the notification box
  const styles = {
    container: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '300px',
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      backgroundColor: '#667eea',
      color: '#fff',
      padding: '10px 15px',
      borderRadius: '5px 5px 0 0',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    list: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderTop: 'none',
      borderRadius: '0 0 5px 5px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      maxHeight: '400px',
      overflowY: 'auto'
    },
    item: {
      padding: '15px',
      borderBottom: '1px solid #eee',
      cursor: 'pointer',
      transition: 'background 0.2s',
      '&:hover': { backgroundColor: '#f5f5f5' }
    },
    title: {
      fontWeight: 'bold',
      marginBottom: '5px',
      display: 'block',
      color: '#1a1a1a'
    },
    body: {
      fontSize: '14px',
      color: '#555',
      margin: 0,
      marginBottom: '8px'
    },
    timestamp: {
      fontSize: '12px',
      color: '#999'
    },
    emptyState: {
      padding: '20px',
      textAlign: 'center',
      color: '#999'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>Notifications</div>
        <div style={styles.emptyState}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        🔔 Notifications ({notifications.length})
      </div>
      <div style={styles.list}>
        {notifications.length === 0 ? (
          <div style={styles.emptyState}>No new notifications</div>
        ) : (
          notifications.map((note) => (
            <div 
              key={note.id} 
              style={styles.item}
              onClick={() => markAsRead(note.id)}
            >
              <span style={styles.title}>
                {note.type === 'reminder' && '⏰ '}
                {note.type === 'milestone' && '🎉 '}
                {note.type === 'alert' && '⚠️ '}
                {note.title}
              </span>
              <p style={styles.body}>{note.message}</p>
              <span style={styles.timestamp}>
                {new Date(note.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationList;