import express from 'express';
import { protect } from '../middleware/verifyToken.js';
import { addToCart, clearCart, getCart, removeFromCart } from '../controllers/cartController.js';


const router = express.Router();

router.post('/add', protect, addToCart);
router.get('/', protect, getCart);
router.delete('/remove/:productId', protect, removeFromCart);
router.delete('/clear', protect, clearCart);

export default router;