import express from 'express';
import Product from '../models/Product.js';
import { protect, adminCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all products with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, sort, rating } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (rating && rating !== 'All') {
      query.rating = { $gte: Number(rating) };
    }

    let sortConfig = {};
    if (sort) {
      if (sort === 'price_asc') sortConfig.price = 1;
      else if (sort === 'price_desc') sortConfig.price = -1;
      else if (sort === 'rating_desc') sortConfig.rating = -1;
      else sortConfig.createdAt = -1;
    } else {
      sortConfig.createdAt = -1;
    }

    const products = await Product.find(query).sort(sortConfig);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Create product
router.post('/', protect, adminCheck, async (req, res) => {
  try {
    const { name, price, description, image, category, stock, brand, discountPrice } = req.body;
    const product = new Product({ name, price, description, image, category, stock, brand, discountPrice });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update product
router.patch('/:id', protect, adminCheck, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(product) res.json(product);
        else res.status(404).json({ message: 'Product not found' });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: Delete product
router.delete('/:id', protect, adminCheck, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(product) res.json({ message: 'Product removed' });
        else res.status(404).json({ message: 'Product not found' });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
