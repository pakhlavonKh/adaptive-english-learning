import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for OAuth users
  theta: { type: Number, default: 0 },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  
  // OAuth fields
  googleId: { type: String, unique: true, sparse: true },
  authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
  profilePicture: { type: String },
  
  // Email verification
  emailVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  
  // LMS Integration
  lmsStudentId: { type: String },
  lmsData: {
    courses: [{
      id: String,
      name: String,
      grade: Number,
      progress: Number
    }],
    gpa: Number,
    lastSync: Date
  }
}, { timestamps: true });

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
export default UserModel;
