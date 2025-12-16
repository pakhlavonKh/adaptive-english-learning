/**
 * Clear Old Non-English Questions
 * Removes any questions not related to English learning
 */

import mongoose from 'mongoose';
import QuestionModel from '../src/models/question.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adaptive-learning';

async function clearOldQuestions() {
  try {
    console.log('🧹 Clearing old non-English questions...\n');

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find and delete math/trivia questions
    const oldQuestions = [
      "2 + 2 = ?",
      "Capital of Japan?",
      "What is 12 × 11?",
      "Derivative of x²?",
      "E = mc² author?"
    ];

    for (const questionText of oldQuestions) {
      const result = await QuestionModel.deleteMany({ text: questionText });
      if (result.deletedCount > 0) {
        console.log(`✅ Deleted: "${questionText}"`);
      }
    }

    // Also delete any questions with 'skill' field missing or not in English learning domains
    const invalidSkills = await QuestionModel.deleteMany({ 
      skill: { $nin: ['reading', 'writing', 'listening', 'speaking'] } 
    });
    
    if (invalidSkills.deletedCount > 0) {
      console.log(`✅ Deleted ${invalidSkills.deletedCount} questions with invalid skills`);
    }

    console.log('\n✨ Cleanup complete!');

    // Show remaining questions count
    const remaining = await QuestionModel.countDocuments();
    console.log(`📊 Total questions remaining: ${remaining}\n`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

clearOldQuestions();
