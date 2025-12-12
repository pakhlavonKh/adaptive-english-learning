/**
 * Notification Service
 * Handles notifications, reminders, and alerts for users
 */

const notifications = {}; 

// FR17: Performance Alert Implementation (Serenay Task)
export const sendPerformanceAlert = async (userId, currentScore) => {
  const alert = {
    id: Date.now(),
    userId,
    type: 'alert',
    title: 'Performance Alert ⚠️',
    message: `Warning: Your proficiency score has dropped to ${currentScore}. We recommend reviewing previous modules.`,
    timestamp: new Date(),
    read: false
  };
  
  if (!notifications[userId]) notifications[userId] = [];
  notifications[userId].push(alert);
  
  // Infrastructure Layer Reference: Simulating EmailSystem
  console.log(`\n[EmailSystem] ⚠️ ALERT EMAIL SENT TO USER ${userId}`);
  console.log(`[EmailSystem] Content: "Score dropped to ${currentScore}. Please review material."\n`);
  
  return alert;
};

// FR19: Milestone Notification
export const sendMilestoneAchieved = async (userId, milestone) => {
  const notification = {
    id: Date.now(),
    userId,
    type: 'milestone',
    title: 'Milestone Achieved! 🎉',
    message: `Great job! You've achieved: ${milestone}`,
    timestamp: new Date(),
    read: false
  };
  
  if (!notifications[userId]) notifications[userId] = [];
  notifications[userId].push(notification);
  console.log(`\n[Notification] 🏆 MILESTONE: User ${userId} -> ${milestone}\n`);
  return notification;
};

// Kayıt Doğrulama (Mevcut)
export const sendVerificationEmail = async (email, token) => {
    console.log(`[EmailSystem] 📨 Verification email sent to: ${email} | Token: ${token}`);
    return true;
};

// Helper Functions
export const getUnreadNotifications = (userId) => {
  return (notifications[userId] || []).filter(n => !n.read);
};

export const markAsRead = (userId, notificationId) => {
  if (!notifications[userId]) return false;
  const notification = notifications[userId].find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    return true;
  }
  return false;
};