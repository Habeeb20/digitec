// server/models/Partnership.js
import mongoose from 'mongoose';
const partnershipSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  frequency: { type: String, enum: ['monthly', 'one-time'] },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Partnership', partnershipSchema);