const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();




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


module.exports = router;
