import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ModuleModel from '../src/models/module.js';
import QuestionModel from '../src/models/question.js';

dotenv.config();

async function testFullFlow() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database\n');

    // Get a module
    const module = await ModuleModel.findOne().lean();
    console.log(`Module: ${module.title}`);
    console.log(`Module _id: ${module._id}`);
    console.log(`Module has items: ${!!module.items}`);
    console.log(`Items count: ${module.items?.length || 0}\n`);

    // Simulate what the API does
    if (module.items && module.items.length > 0) {
      console.log('Simulating API processing...\n');
      
      const items = await Promise.all(module.items.map(async (it, index) => {
        console.log(`Item ${index + 1}:`);
        console.log(`  - Original item:`, JSON.stringify(it, null, 2));
        console.log(`  - questionId:`, it.questionId);
        
        const q = it.questionId ? await QuestionModel.findById(it.questionId).lean() : null;
        
        const result = { 
          ...it, 
          id: it._id || it.questionId || `item-${index}`,
          question: q 
        };
        
        console.log(`  - Has question: ${!!q}`);
        if (q) {
          console.log(`  - Question text: ${q.text.substring(0, 50)}...`);
        }
        console.log('');
        
        return result;
      }));

      console.log(`\n✅ Processed ${items.length} items`);
      console.log(`Items with questions: ${items.filter(i => i.question).length}`);
      console.log(`Items without questions: ${items.filter(i => !i.question).length}`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testFullFlow();
