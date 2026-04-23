import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @desc    Sync Firebase user with MongoDB
 * @route   POST /api/auth/sync
 * @access  Private (Firebase token required)
 */
router.post('/sync', protect, async (req, res) => {
  try {
    // req.user is already populated and synced by the protect middleware
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

import { adminCheck } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';

/**
 * @desc    Get all users
 * @route   GET /api/auth/users
 * @access  Private/Admin
 */
router.get('/users', protect, adminCheck, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @desc    Update user role
 * @route   PATCH /api/auth/users/:id/role
 * @access  Private/Admin
 */
router.patch('/users/:id/role', protect, adminCheck, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.role = req.body.role;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
