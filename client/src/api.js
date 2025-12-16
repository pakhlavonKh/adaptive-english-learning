import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:4000/api' });

// Auth API
export const register = (username, password) => API.post('/register', { username, password }).then(r => r.data);
export const login = (username, password) => API.post('/login', { username, password }).then(r => r.data);

// Question API
export const getNextQuestion = (token) => API.get('/next-question', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
export const submit = (token, questionId, correct) => API.post('/submit', { questionId, correct }, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
export const seed = () => API.get('/seed').then(r => r.data);

// Notification API (FR17 & UC16)
// Okunmamış bildirimleri getir
export const getUnreadNotifications = (token) => 
  API.get('/notifications/unread', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

// Tüm bildirimleri getir
export const getAllNotifications = (token) => 
  API.get('/notifications/all', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

// Tek bir bildirimi okundu işaretle
export const markNotificationAsRead = (token, notificationId) => 
  API.post(`/notifications/${notificationId}/read`, {}, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

// Tüm bildirimleri okundu işaretle
export const markAllNotificationsAsRead = (token) => 
  API.post('/notifications/mark-all-read', {}, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

// Bildirim tercihlerini getir
export const getNotificationPreferences = (token) => 
  API.get('/notifications/preferences', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

// Bildirim tercihlerini güncelle
export const updateNotificationPreferences = (token, preferences) => 
  API.post('/notifications/preferences', preferences, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

// Support API (FR23)
// Destek talebi oluştur
export const createSupportTicket = (token, subject, message, priority = 'normal') => 
  API.post('/support/tickets', { subject, message, priority }, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

// Kullanıcının destek taleplerini listele
export const getSupportTickets = (token) => 
  API.get('/support/tickets', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
