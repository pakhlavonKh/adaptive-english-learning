import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ModuleModel from '../src/models/module.js';
import QuestionModel from '../src/models/question.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/english-learning';

async function testModuleLoad() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to database\n');

    // Get first module
    const module = await ModuleModel.findOne().lean();
    console.log(`Testing module: ${module.title}`);
    console.log(`Items: ${module.items?.length || 0}\n`);

    if (module.items && module.items.length > 0) {
      console.log('Loading questions for items...\n');
      
      for (let i = 0; i < Math.min(3, module.items.length); i++) {
        const item = module.items[i];
        console.log(`Item ${i + 1}:`);
        console.log(`  Title: ${item.title}`);
        console.log(`  Question ID: ${item.questionId}`);
        
        if (item.questionId) {
          const question = await QuestionModel.findById(item.questionId).lean();
          if (question) {
            console.log(`  ✅ Question found: ${question.text.substring(0, 50)}...`);
            console.log(`  Skill: ${question.skill}, Difficulty: ${question.difficulty}`);
          } else {
            console.log(`  ❌ Question NOT found in database`);
          }
        } else {
          console.log(`  ⚠️  No questionId`);
        }
        console.log('');
      }
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testModuleLoad();
