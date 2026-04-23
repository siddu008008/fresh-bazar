import express from 'express';
import Order from '../models/Order.js';
import { protect, adminCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all orders (Admin only)
router.get('/', protect, adminCheck, async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new order
router.post('/', protect, async (req, res) => {
  try {
    const { items, totalAmount, address, phone } = req.body;
    if(items && items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    } else {
      const order = new Order({
        userId: req.user.firebaseUid,
        email: req.user.email,
        items,
        totalAmount,
        address,
        phone,
        paymentMethod: "COD",
        orderStatus: "Pending"
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user orders by userId (specific route requested)
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Legacy/Alternative: Get logged in user's orders
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.firebaseUid }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
