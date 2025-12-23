import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ModuleModel from '../src/models/module.js';

dotenv.config();

async function findBadModule() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const modules = await ModuleModel.find().lean();
    
    console.log(`Total modules: ${modules.length}\n`);
    
    for (const m of modules) {
      const hasQuestionIds = m.items?.some(item => item.questionId);
      if (!hasQuestionIds && m.items && m.items.length > 0) {
        console.log(`❌ Module without questionIds: ${m.title}`);
        console.log(`   ID: ${m._id}`);
        console.log(`   Items: ${m.items.length}`);
        console.log(`   First item:`, JSON.stringify(m.items[0], null, 2));
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

findBadModule();
