// server/routes/auth.js
import express from 'express';
import { register, login } from '../controllers/UserController.js';

import { protect } from './../middleware/verifyToken.js';
const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route example (get current user)
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;