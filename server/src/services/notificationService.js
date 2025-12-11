/**
 * Notification Service (Backend)
 * Handles notifications, reminders, and async email sending.
 */

const notifications = {}; // In-memory store; use MongoDB in production

// 1. Send Review Reminder
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

// 2. Send Password Reset (Log only)
export const sendPasswordResetEmail = (email) => {
  console.log(`[Email]: Password reset link sent to ${email}`);
  return { success: true, message: 'Password reset email sent' };
};

// 3. Milestone Notification
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

// 4. Get Unread Notifications
export const getUnreadNotifications = (userId) => {
  return (notifications[userId] || []).filter(n => !n.read);
};

// 5. Mark Notification as Read
export const markAsRead = (userId, notificationId) => {
  if (!notifications[userId]) return false;
  const notification = notifications[userId].find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    return true;
  }
  return false;
};

// 6. Get All Notifications
export const getAllNotifications = (userId) => {
  return notifications[userId] || [];
};

// --- NEW ASYNC EMAIL FEATURE (Serenay's Task) ---

/**
 * Send Verification Email (Async Simulation)
 * This function simulates an email delay of 2 seconds.
 * It runs in the background without blocking the main thread if called without 'await'.
 */
export const sendVerificationEmail = async (email, token) => {
  console.log(`[EmailSystem] ⏳ Email sending initiated: ${email} (Processing in background...)`);

  // Simulated Async Delay (2 seconds)
  // In a real-world scenario, this would connect to an SMTP server (e.g., Nodemailer/SendGrid).
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`\n---------------------------------------------------`);
      console.log(`[EmailSystem] ✅ (Async) Verification Email Sent!`);
      console.log(`[EmailSystem] 📧 To: ${email}`);
      console.log(`[EmailSystem] 🔗 Token: ${token}`);
      console.log(`---------------------------------------------------\n`);
      resolve(true);
    }, 2000);
  });
};