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

// --- NOTIFICATIONS API ---
app.get('/api/notifications/:userId', (req, res) => {
  res.json({ unread: notificationService.getUnreadNotifications(req.params.userId) });
});
app.post('/api/notifications/:userId/mark-read/:notificationId', (req, res) => {
  res.json({ success: notificationService.markAsRead(req.params.userId, parseInt(req.params.notificationId)) });
});

app.listen(4000, () => console.log('✅ Server Başlatıldı: http://localhost:4000 (Temiz Mod)'));