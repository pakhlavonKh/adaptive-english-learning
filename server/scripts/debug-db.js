/**
 * Debug Script - Check Database Contents
 */

import mongoose from 'mongoose';
import QuestionModel from '../src/models/question.js';
import UserModel from '../src/models/user.js';
import ResponseModel from '../src/models/response.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adaptive-learning';

async function debug() {
  try {
    console.log('🔍 Checking database contents...\n');

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check questions
    console.log('📝 QUESTIONS:');
    const questions = await QuestionModel.find({}).lean();
    console.log(`Total: ${questions.length}\n`);
    
    // Show first 5 questions
    questions.slice(0, 5).forEach((q, i) => {
      console.log(`${i + 1}. "${q.text.substring(0, 60)}${q.text.length > 60 ? '...' : ''}"`);
      console.log(`   Skill: ${q.skill || 'NONE'}, Difficulty: ${q.difficulty}`);
      console.log(`   ID: ${q._id}\n`);
    });

    // Check for math question specifically
    const mathQuestion = await QuestionModel.findOne({ text: /12.*11/ });
    if (mathQuestion) {
      console.log('⚠️  FOUND MATH QUESTION:');
      console.log(JSON.stringify(mathQuestion, null, 2));
      console.log();
    } else {
      console.log('✅ No math question found\n');
    }

    // Check users
    console.log('👥 USERS:');
    const users = await UserModel.find({}).lean();
    console.log(`Total: ${users.length}\n`);
    users.forEach(u => {
      console.log(`  Username: ${u.username}`);
      console.log(`  Email: ${u.email}`);
      console.log(`  Role: ${u.role}`);
      console.log(`  Theta: ${u.theta}`);
      console.log(`  Has Password: ${u.password ? 'YES' : 'NO'}`);
      console.log(`  Password Hash: ${u.password ? u.password.substring(0, 20) + '...' : 'NONE'}`);
      console.log();
    });

    // Check responses
    console.log('📊 RESPONSES:');
    const responses = await ResponseModel.find({}).lean();
    console.log(`Total: ${responses.length}\n`);
    
    if (responses.length > 0) {
      console.log('Recent responses:');
      const recent = responses.slice(-5);
      for (const r of recent) {
        const q = await QuestionModel.findById(r.question);
        const u = await UserModel.findById(r.user);
        console.log(`  • ${u?.username || 'Unknown'}: "${q?.text?.substring(0, 40) || 'Deleted question'}..." - ${r.correct ? '✓' : '✗'}`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Done');
  }
}

debug();
