import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  signupType: { 
    type: String, 
    enum: ['partnership', 'distant-prayer', 'prayer-request'], 
    required: true 
  },
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);