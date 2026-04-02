import express from 'express';
import Product from '../models/product.js';
import { protect } from '../middleware/verifyToken.js';


const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, seller: req.user.id });
    res.status(201).json(product);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/', async (req, res) => {
  const products = await Product.find().populate('seller', 'name email');
  res.json(products);
});

router.get('/my-products', protect, async (req, res) => {
  const products = await Product.find({ seller: req.user.id });
  res.json(products);
});

router.put('/:id', protect, async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, seller: req.user.id },
    req.body,
    { new: true }
  );
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

router.delete('/:id', protect, async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id, seller: req.user.id });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
});

export default router;