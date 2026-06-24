const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

// We store cart as a simple in-memory approach via session.
// For simplicity, frontend manages cart in localStorage, this route
// can be used for syncing if needed.

// @route GET /api/cart - just returns 200 (cart is managed client-side)
router.get('/', protect, (req, res) => {
  res.json({ message: 'Cart is managed client-side via localStorage' });
});

module.exports = router;
