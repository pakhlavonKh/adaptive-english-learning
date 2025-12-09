import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  theta: { type: Number, default: 0 },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
}, { timestamps: true });

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
export default UserModel;
