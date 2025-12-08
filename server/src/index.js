import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup path for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables - look in parent directory (server root)
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { connectMongo } from './db/mongo.js';
import ModuleModel from './models/module.js';
import UserModel from './models/user.js';
import QuestionModel from './models/question.js';
import ResponseModel from './models/response.js';
import * as analyticsService from './services/analyticsService.js';
import * as notificationService from './services/notificationService.js';

const app = express();
// const prisma = new PrismaClient();
const MONGODB_URI = process.env.MONGODB_URI || '';

// connect to MongoDB (non-blocking)
connectMongo(MONGODB_URI).then(()=>{
  console.log('Connected to MongoDB');
}).catch(err => {
  console.warn('MongoDB not connected:', err.message);
});
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await UserModel.create({ username, password: hashed });
    res.json({ id: user._id, username: user.username });
  } catch (e) {
    res.status(400).json({ error: 'User exists' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET);
    res.json({ token, user: { id: user._id.toString(), username, theta: user.theta } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get next adaptive question
app.get('/api/next-question', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const { userId } = jwt.verify(token, JWT_SECRET) || {};
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const questions = await QuestionModel.find().lean();
    const responses = await ResponseModel.find({ user: userId }).lean();

    const now = new Date();
    const dueQuestions = questions.filter(q => {
      const resp = responses.find(r => r.question && r.question.toString() === q._id.toString());
      return !resp || new Date(resp.nextReview) <= now;
    });

    if (dueQuestions.length === 0) {
      return res.json({ message: "All caught up! Take a break" });
    }

    // Simple IRT: pick question with difficulty closest to user's theta
    const best = dueQuestions.reduce((best, q) => {
      const diff = Math.abs((q.difficulty || 0) - user.theta);
      const bestDiff = Math.abs((best.difficulty || 0) - user.theta);
      return diff < bestDiff ? q : best;
    });

    res.json(best);
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Submit answer
app.post('/api/submit', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { questionId, correct } = req.body;

  try {
    const { userId } = jwt.verify(token, JWT_SECRET) || {};
    const question = await QuestionModel.findById(questionId);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Spaced repetition interval
    let interval = 1;
    const last = await ResponseModel.findOne({ user: userId, question: questionId }).sort({ timestamp: -1 });
    if (last && last.correct) {
      const daysSince = (Date.now() - new Date(last.timestamp).getTime()) / 86400000;
      interval = Math.max(1, daysSince * 2);
    }

    const nextReview = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);
    await ResponseModel.create({ user: userId, question: questionId, correct, nextReview });

    // Update user ability (simple Elo-like)
    const k = 0.5;
    const expected = 1 / (1 + Math.exp(-((user.theta || 0) - (question.difficulty || 0))));
    const newTheta = (user.theta || 0) + k * ((correct ? 1 : 0) - expected);

    user.theta = newTheta;
    await user.save();

    res.json({ newTheta, correct, nextReview });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Seed questions
app.get('/api/seed', async (req, res) => {
  const questions = [
    { text: "2 + 2 = ?", answer: "4", difficulty: -2 },
    { text: "Capital of Japan?", answer: "Tokyo", difficulty: -1 },
    { text: "What is 12 × 11?", answer: "132", difficulty: 0.5 },
    { text: "Derivative of x²?", answer: "2x", difficulty: 1 },
    { text: "E = mc² author?", answer: "Einstein", difficulty: 1.5 },
  ];

  // insert questions into Mongo
  try{
    const inserted = await QuestionModel.insertMany(questions, { ordered: false });
  }catch(e){ /* ignore duplicates or insertion errors for seed */ }

  // create sample modules in Mongo if not exists
  const existingModules = await ModuleModel.find();
  if (existingModules.length === 0) {
    const allQuestions = await QuestionModel.find();

    await ModuleModel.create({ title: 'Foundations: Numbers & Facts', skill: 'reading', level: 1, description: 'Basic facts and short passages.', items: [
      { title: 'Simple arithmetic', questionId: allQuestions[0]?._id, difficulty: allQuestions[0]?.difficulty || 0 },
      { title: 'World capitals', questionId: allQuestions[1]?._id, difficulty: allQuestions[1]?.difficulty || 0 }
    ]});

    await ModuleModel.create({ title: 'Intermediate: Math & Logic', skill: 'reading', level: 2, description: 'Short problem solving passages.', items: [
      { title: 'Multiplication', questionId: allQuestions[2]?._id, difficulty: allQuestions[2]?.difficulty || 0 },
      { title: 'Calculus basics', questionId: allQuestions[3]?._id, difficulty: allQuestions[3]?.difficulty || 0 },
      { title: 'Famous scientists', questionId: allQuestions[4]?._id, difficulty: allQuestions[4]?.difficulty || 0 }
    ]});
  }

  res.json({ success: true });
});


// Map theta to approximate level
function thetaToLevel(theta) {
  if (theta < -1) return 0;
  if (theta < 0) return 1;
  if (theta < 1) return 2;
  if (theta < 2) return 3;
  return 4;
}

// Return personalized learning path (list of modules prioritized)
app.get('/api/learning-path', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const { userId } = jwt.verify(token, JWT_SECRET) || {};
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // load modules from Mongo
    const modules = await ModuleModel.find().lean();
    const targetLevel = thetaToLevel(user.theta);
    modules.sort((a, b) => Math.abs(a.level - targetLevel) - Math.abs(b.level - targetLevel));
    res.json({ modules, suggestedLevel: targetLevel, theta: user.theta });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Get module details (items with question content)
app.get('/api/module/:id', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    jwt.verify(token, JWT_SECRET);
    const id = req.params.id;
    const module = await ModuleModel.findById(id).lean();
    if (!module) return res.status(404).json({ error: 'Module not found' });

    // populate questions for items using Mongoose
    const items = await Promise.all((module.items || []).map(async it => {
      const q = it.questionId ? await QuestionModel.findById(it.questionId).lean() : null;
      return { ...it, question: q };
    }));

    module.items = items;
    res.json(module);
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
  console.log('Seed questions: GET /api/seed');
});

// ===== ANALYTICS ENDPOINTS =====
app.get('/api/analytics/user/:userId', async (req, res) => {
  try {
    const metrics = await analyticsService.getUserMetrics(req.params.userId);
    res.json(metrics);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/analytics/class/:classId', async (req, res) => {
  try {
    const metrics = await analyticsService.getClassMetrics(req.params.classId);
    res.json(metrics);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/analytics/progress/:userId', async (req, res) => {
  try {
    const report = await analyticsService.getProgressReport(req.params.userId);
    res.json(report);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ===== NOTIFICATION ENDPOINTS =====
app.get('/api/notifications/:userId', (req, res) => {
  try {
    const unread = notificationService.getUnreadNotifications(req.params.userId);
    res.json({ unread });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/notifications/:userId/all', (req, res) => {
  try {
    const all = notificationService.getAllNotifications(req.params.userId);
    res.json({ notifications: all });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/notifications/:userId/mark-read/:notificationId', (req, res) => {
  try {
    const success = notificationService.markAsRead(req.params.userId, parseInt(req.params.notificationId));
    res.json({ success });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Create a new module (admin/content-author)
app.post('/api/module', async (req, res) => {
  try {
    // in a production system we'd check RBAC and roles; for now accept and create
    const data = req.body;
    const created = await ModuleModel.create(data);
    res.json(created);
  } catch (e) {
    res.status(500).json({ error: 'Failed to create module', details: e.message });
  }
});