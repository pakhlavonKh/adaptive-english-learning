// src/services/NotificationService.js

/**
 * NotificationService
 * * This service is responsible for managing email notifications, alerts, 
 * and reminders for users in the system.
 * * Related Requirements:
 * - FR17/UC17: Receive Review Reminders
 * - FR11/UC12: Reset Password (via Email)
 * - UC20: Support Request Acknowledgment
 */

export const NotificationService = {
  
    // 1. Send Review Reminder
    // Triggered when a user is at risk of forgetting a topic (Spaced Repetition).
    sendReviewReminder: (userId, topicName) => {
      // Simulating backend interaction by logging to console.
      const message = `Reminder: It is time for user ${userId} to review the topic '${topicName}'.`;
      console.log(`[Notification System]: ${message}`);
      
      // In a real scenario, this would be an API call:
      // return axios.post('/api/notifications/remind', { userId, topicName });
      
      return { success: true, message: message };
    },
  
    // 2. Send Password Reset Email
    // Sends a reset link when a user forgets their password.
    sendPasswordResetEmail: (email) => {
      console.log(`[Email System]: Password reset link sent to ${email}.`);
      return { success: true, message: 'A password reset link has been sent to your email.' };
    },
  
    // 3. Support Request Acknowledgment
    // Notifies the user that their support ticket has been received.
    sendSupportConfirmation: (userId, ticketId) => {
      console.log(`[Support System]: Support request ${ticketId} received for user ${userId}.`);
      return { success: true, message: 'Your request has been received. We will get back to you shortly.' };
    },
  
    // 4. Get Unread Notifications (for Dashboard)
    // Fetches the list of notifications to display on the user interface.
    getUnreadNotifications: async (userId) => {
      // Mock Data Simulation
      return [
        { 
          id: 1, 
          type: 'reminder', 
          title: 'Review Time!', 
          body: 'You should review the "Simple Past Tense" topic.',
          date: '2025-12-07'
        },
        { 
          id: 2, 
          type: 'system', 
          title: 'Welcome', 
          body: 'Welcome to the Adaptive English platform!',
          date: '2025-12-06'
        }
      ];
    }
  };