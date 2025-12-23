import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  answer: { type: String, required: true },
  difficulty: { type: Number, default: 0 },
  discrimination: { type: Number, default: 1 },
  skill: { type: String, enum: ['reading', 'writing', 'listening', 'speaking'], required: true },
  type: { type: String, default: 'objective' },
  choices: [{ type: String }]
}, { timestamps: true });

export const QuestionModel = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
export default QuestionModel;
