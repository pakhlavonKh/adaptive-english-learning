import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ModuleModel from '../src/models/module.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/english-learning';

async function checkModules() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to database\n');

    const modules = await ModuleModel.find().lean();
    console.log(`Total modules: ${modules.length}\n`);

    for (const m of modules.slice(0, 5)) {
      console.log(`Module: ${m.title}`);
      console.log(`  Skill: ${m.skill}`);
      console.log(`  Level: ${m.level}`);
      console.log(`  Items: ${m.items?.length || 0}`);
      console.log(`  Exercises: ${m.exercises?.length || 0}`);
      
      if (m.items && m.items.length > 0) {
        console.log(`  First item has questionId: ${!!m.items[0].questionId}`);
        if (m.items[0].questionId) {
          console.log(`  Question ID: ${m.items[0].questionId}`);
        }
      }
      console.log('');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkModules();
