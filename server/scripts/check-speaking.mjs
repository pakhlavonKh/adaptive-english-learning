import mongoose from 'mongoose';
import QuestionModel from '../src/models/question.js';

mongoose.connect('mongodb://localhost:27017/english-learning-db');

setTimeout(async () => {
  try {
    const speakingQuestions = await QuestionModel.find({ skill: 'speaking' });
    console.log(`\n📊 Speaking Questions: ${speakingQuestions.length} found\n`);
    
    if (speakingQuestions.length > 0) {
      console.log('Sample speaking questions:');
      speakingQuestions.slice(0, 3).forEach((q, i) => {
        console.log(`  ${i + 1}. ${q.text}`);
      });
    } else {
      console.log('⚠️  No speaking questions found. Creating sample...\n');
      
      const sampleSpeaking = await QuestionModel.create({
        text: "Describe your daily morning routine in detail.",
        type: "speaking",
        skill: "speaking",
        difficulty: 0.5,
        answer: "Expected: A clear, fluent description with proper vocabulary and coherent structure",
        options: []
      });
      
      console.log('✅ Created sample speaking question:', sampleSpeaking.text);
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}, 1000);
