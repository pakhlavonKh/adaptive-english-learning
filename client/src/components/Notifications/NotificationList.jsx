// src/components/Notifications/NotificationList.jsx

import React, { useState, useEffect } from 'react';
import { NotificationService } from '../../services/NotificationService';

/**
 * NotificationList Component
 * Displays a list of system notifications (Reminders, System Alerts) to the user.
 * It uses the NotificationService to fetch data.
 */
const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications when the component mounts (loads)
  useEffect(() => {
    const fetchNotifications = async () => {
      // Calling our Service to get mock data
      const data = await NotificationService.getUnreadNotifications(1); // UserID 1 (Example)
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

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
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px',
      borderRadius: '5px 5px 0 0',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    list: {
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderTop: 'none',
      borderRadius: '0 0 5px 5px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    item: {
      padding: '15px',
      borderBottom: '1px solid #eee',
      cursor: 'pointer'
    },
    title: {
      fontWeight: 'bold',
      marginBottom: '5px',
      display: 'block',
      color: '#2c3e50'
    },
    body: {
      fontSize: '14px',
      color: '#555'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        Notifications ({notifications.length})
      </div>
      <div style={styles.list}>
        {notifications.length === 0 ? (
          <div style={{ padding: '15px', color: '#777' }}>No new notifications.</div>
        ) : (
          notifications.map((note) => (
            <div key={note.id} style={styles.item}>
              <span style={styles.title}>
                {note.type === 'reminder' ? '⏰ ' : '📢 '} 
                {note.title}
              </span>
              <p style={{ margin: 0, ...styles.body }}>{note.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationList;