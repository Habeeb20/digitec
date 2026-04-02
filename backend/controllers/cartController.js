import Cart from '../models/cart.js';
import Product from '../models/product.js';


// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id; // From your protect/auth middleware

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: []
      });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Product added to cart successfully',
      cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to add to cart',
      error: error.message
    });
  }
};

// Get User's Cart (with populated product details + seller)
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: 'items.product',
        populate: {
          path: 'seller',
          select: 'name email'
        }
      });

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();

    res.json({ success: true, message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item' });
  }
};

// Clear entire cart (useful after successful payment)
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.findOneAndUpdate(
      { user: userId },
      { items: [] }
    );
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};