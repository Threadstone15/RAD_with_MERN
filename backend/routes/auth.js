const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
// routes/auth.js
router.post('/register', async (req, res) => {
  try {
    const { username, password, role, profile } = req.body;

    // Validate role
    if (!['student', 'teacher'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Create new user
    const user = new User({ username, password, role, profile });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' } // Token expiration time
    );

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Helps prevent XSS attacks
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // CSRF protection
      maxAge: 3600000 // 1 hour
    });
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// routes/user.js
router.put('/user/:userId/classes', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { classIds } = req.body;

    // Ensure the user is authenticated and authorized
    if (req.user._id.toString() !== userId.toString() && req.user.role !== 'manager') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update the user's classIds
    await User.findByIdAndUpdate(userId, { $set: { classIds } });
    res.json({ message: 'Classes updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = router;
