import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import QuestionModel from '../src/models/question.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function checkQuestions() {
  try {
    console.log('Connecting to:', MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const questions = await QuestionModel.find({}).limit(20);
    
    console.log(`📊 Total questions: ${await QuestionModel.countDocuments()}\n`);
    console.log('First 20 questions:');
    console.log('─'.repeat(80));
    
    questions.forEach((q, i) => {
      console.log(`${i+1}. [${q.skill || 'no-skill'}] ${q.text}`);
      console.log(`   Answer: ${q.answer}`);
      console.log(`   Difficulty: ${q.difficulty}, ID: ${q._id}`);
      console.log('');
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkQuestions();
