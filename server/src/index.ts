import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const prisma = new PrismaClient();
const JWT_SECRET = 'your-jwt-secret';

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { username, password: hashed }
    });
    res.json({ id: user.id, username: user.username });
  } catch (e) {
    res.status(400).json({ error: 'User exists' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, username, theta: user.theta } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get next adaptive question
app.get('/api/next-question', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const questions = await prisma.question.findMany();
    const responses = await prisma.response.findMany({ where userId });

    const now = new Date();
    const dueQuestions = questions.filter(q => {
      const resp = responses.find(r => r.questionId === q.id);
      return !resp || new Date(resp.nextReview) <= now;
    });

    if (dueQuestions.length === 0) {
      return res.json({ message: "All caught up! Take a break" });
    }

    // Simple IRT: pick question with difficulty closest to user's theta
    const best = dueQuestions.reduce((best, q) => {
      const diff = Math.abs(q.difficulty - user.theta);
      const bestDiff = Math.abs(best.difficulty - user.theta);
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
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };
    const question = await prisma.question.findUnique({ where: { id: questionId } });
    if (!question) return res.status(404).json({ error “Question not found” });

    // Spaced repetition interval
    let interval = 1;
    const last = await prisma.response.findFirst({
      where: { userId, questionId },
      orderBy: { timestamp: 'desc' }
    });
    if (last && last.correct) {
      interval = Math.max(1, (new Date().getTime() - new Date(last.nextReview).getTime()) / 86400000 * 2);
    }

    await prisma.response.create({
      data: {
        userId,
        questionId,
        correct,
        nextReview: new Date(Date.now() + interval * 24 * 60 * 60 * 1000)
      }
    });

    // Update user ability (simple Elo-like)
    const k = 0.5;
    const expected = 1 / (1 + Math.exp(-(user.theta - question.difficulty)));
    const newTheta = user.theta + k * (correct ? 1 : 0 - expected);

    await prisma.user.update({
      where: { id: userId },
      data: { theta: newTheta }
    });

    res.json({ newTheta, correct });
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

  await prisma.question.createMany({ data: questions, skipDuplicates: true });
  res.json({ success: true });
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
  console.log('Seed questions: GET /api/seed');
});