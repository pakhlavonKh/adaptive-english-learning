import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from '../src/models/user.js';

dotenv.config();

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected\n');

    const users = await UserModel.find({}, 'username role').lean();
    console.log(`Total users: ${users.length}\n`);
    
    for (const user of users) {
      console.log(`- ${user.username} (${user.role})`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkUsers();
