import mongoose from 'mongoose';

export async function connectMongo(uri){
  if (!uri) throw new Error('MONGODB_URI not provided');
  await mongoose.connect(uri, { dbName: 'adaptive_ai_learn' });
  return mongoose;
}
