/**
 * Notification Service
 * Handles notifications, reminders, and alerts for users
 */

const notifications = {}; // In-memory store; use MongoDB in production

export const sendReviewReminder = (userId, topicName) => {
  const reminder = {
    id: Date.now(),
    userId,
    type: 'reminder',
    title: 'Review Time!',
    message: `It's time to review "${topicName}". Keep your knowledge fresh!`,
    timestamp: new Date(),
    read: false
  };
  
  if (!notifications[userId]) notifications[userId] = [];
  notifications[userId].push(reminder);
  console.log(`[Notification]: Review reminder sent to user ${userId}`);
  return reminder;
};

export const sendPasswordResetEmail = (email) => {
  console.log(`[Email]: Password reset link sent to ${email}`);
  return { success: true, message: 'Password reset email sent' };
};

export const sendMilestoneAchieved = (userId, milestone) => {
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
  console.log(`[Notification]: Milestone notification sent to user ${userId}`);
  return notification;
};

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

export const getAllNotifications = (userId) => {
  return notifications[userId] || [];
};
