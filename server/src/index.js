import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as notificationService from './services/notificationService.js';


const app = express();
const JWT_SECRET = 'your-jwt-secret';

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// --- BELLEK (Veritabanı Yok, Sorun Yok) ---
let users = [];
let questions = [];
let responses = [];

// Yardımcılar
const findUserByUsername = (username) => users.find(u => u.username === username);
const findUserById = (id) => users.find(u => u.id === id);
const findQuestionById = (id) => questions.find(q => q.id === id);

// --- AUTH ---
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (findUserByUsername(username)) return res.status(400).json({ error: 'User exists' });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    username,
    password: hashed,
    theta: 0.0, 
    email: req.body.email || `${username}@example.com`
  };
  users.push(newUser);
  notificationService.sendVerificationEmail(newUser.email, "TOKEN-123").catch(console.error);
  res.json({ id: newUser.id, username: newUser.username });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username, theta: user.theta } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// --- İNGİLİZCE SORULARI ---
app.get('/api/seed', async (req, res) => {
  questions = [
    { id: "q1", text: "I _____ a student.", answer: "am", difficulty: -2.0 },
    { id: "q2", text: "She _____ to the gym every day.", answer: "goes", difficulty: -1.0 },
    { id: "q3", text: "They _____ football right now.", answer: "are playing", difficulty: 0.0 },
    { id: "q4", text: "We _____ that movie yesterday.", answer: "saw", difficulty: 1.0 },
    { id: "q5", text: "If I _____ you, I would study more.", answer: "were", difficulty: 2.0 },
  ];
  res.json({ success: true, count: questions.length });
});

// --- SORU GETİRME (Sonsuz Döngü Korumalı) ---
app.get('/api/next-question', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const user = findUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Soru havuzu boşsa yükle
    if (questions.length === 0) await fetch('http://localhost:4000/api/seed');

    // Sadece ÇÖZÜLMEMİŞ soruları getir
    const activeQuestions = questions.filter(q => {
        const isAnswered = responses.some(r => r.userId === userId && r.questionId === q.id);
        return !isAnswered; 
    });

    if (activeQuestions.length === 0) {
        return res.json({ message: "All caught up!" });
    }

    // IRT: En uygun soruyu seç
    const best = activeQuestions.reduce((prev, curr) => {
      return (Math.abs(curr.difficulty - user.theta) < Math.abs(prev.difficulty - user.theta) ? curr : prev);
    });

    res.json(best);
  } catch (e) { res.status(401).json({ error: 'Unauthorized' }); }
});

// --- CEVAP VE BİLDİRİM (SENİN GÖREVİN) ---
app.post('/api/submit', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { questionId, correct } = req.body;
  
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const user = findUserById(userId);
    const question = findQuestionById(questionId);

    // Cevabı kaydet
    responses.push({ id: Date.now().toString(), userId, questionId, correct, timestamp: new Date() });

    // Puanlama (Hızlı değişim için katsayıyı artırdık)
    const k = 0.8; 
    const expected = 1 / (1 + Math.exp(-(user.theta - question.difficulty)));
    const oldTheta = user.theta;
    const newTheta = user.theta + k * ((correct ? 1 : 0) - expected);
    user.theta = newTheta;

    console.log(`[Analiz] ${user.username} | Puan: ${newTheta.toFixed(2)} | Cevap: ${correct ? 'DOĞRU' : 'YANLIŞ'}`);

    // --- FR17: Performance Alert ---
    if (!correct && newTheta < -1.0) {
        notificationService.sendPerformanceAlert(userId, newTheta.toFixed(2)).catch(console.error);
    }

    // --- FR19: Milestone Notification ---
    if (correct && newTheta >= 1.5 && oldTheta < 1.5) {
        notificationService.sendMilestoneAchieved(userId, "B1 Level Reached! 🏆").catch(console.error);
    }

    res.json({ newTheta, correct, nextReview: new Date() });
  } catch (e) { res.status(401).json({ error: 'Error' }); }
});

// --- NOTIFICATIONS API (FR17 & UC16) ---

// Okunmamış bildirimleri getir (Çan ikonu için)
app.get('/api/notifications/unread', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const unread = notificationService.getUnreadNotifications(userId);
    res.json({ count: unread.length, notifications: unread });
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Tüm bildirimleri getir
app.get('/api/notifications/all', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const all = notificationService.getAllNotifications(userId);
    res.json({ notifications: all });
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Tek bir bildirimi okundu olarak işaretle
app.post('/api/notifications/:notificationId/read', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { notificationId } = req.params;
  
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const success = notificationService.markAsRead(userId, parseInt(notificationId));
    res.json({ success });
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Tüm bildirimleri okundu olarak işaretle
app.post('/api/notifications/mark-all-read', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const count = notificationService.markAllAsRead(userId);
    res.json({ success: true, markedCount: count });
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// UC16: Kullanıcı bildirim tercihlerini getir
app.get('/api/notifications/preferences', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const prefs = notificationService.getUserPreferences(userId);
    res.json(prefs);
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// UC16: Kullanıcı bildirim tercihlerini güncelle
app.post('/api/notifications/preferences', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { emailEnabled, pushEnabled, inAppEnabled } = req.body;
  
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const updated = notificationService.updateUserPreferences(userId, {
      emailEnabled,
      pushEnabled,
      inAppEnabled
    });
    res.json({ success: true, preferences: updated });
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// --- SUPPORT SYSTEM API (FR23) ---

// Global değişken: Destek taleplerini saklamak için
if (!global.supportTickets) global.supportTickets = [];

// Destek talebi oluştur
// UC18 & FR23: Support Ticket Endpoint Güncellemesi
app.post('/api/support/tickets', async (req, res) => { // async eklemeyi unutma
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    const { subject, message, priority } = req.body;

    const ticket = {
      id: "TICK-" + Date.now(),
      userId,
      subject,
      message,
      status: 'open',
      priority: priority || 'normal', // Varsayılan değer eklendi
      createdAt: new Date()
    };

    global.supportTickets.push(ticket);

    // SERENAY'IN GÖREVİ: Kullanıcıya anında In-App onay bildirimi gönder (FR23)
    // notificationService.js içinde 'sendSupportConfirmation' fonksiyonunun tanımlı olduğundan emin ol
    notificationService.sendSupportConfirmation(userId, ticket.id);

    res.json({ success: true, message: 'Ticket created and notification sent!' });
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Kullanıcının destek taleplerini listele
app.get('/api/support/tickets', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    
    // Kullanıcının taleplerini filtrele
    const userTickets = global.supportTickets
      .filter(t => t.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({ tickets: userTickets });
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(4000, () => console.log('✅ Server Başlatıldı: http://localhost:4000 (Temiz Mod)'));