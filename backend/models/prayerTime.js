// server/models/Prayer.js
import mongoose from 'mongoose';
const prayerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  type: { type: String, enum: ['distant-prayer', 'prayer-request'] },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Prayer', prayerSchema);