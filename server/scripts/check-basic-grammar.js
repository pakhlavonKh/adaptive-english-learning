import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ModuleModel from '../src/models/module.js';

dotenv.config();

async function checkBasicGrammar() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const module = await ModuleModel.findOne({ title: 'Basic Grammar' }).lean();
    
    console.log('Basic Grammar module:');
    console.log(JSON.stringify(module, null, 2));

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkBasicGrammar();
