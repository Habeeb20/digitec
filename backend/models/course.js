// server/models/Course.js (for school)
import mongoose from 'mongoose';
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Course', courseSchema);