// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure path is correct

const SECRET_KEY = 'your_jwt_secret_key'; // Use an environment variable for better security

module.exports = async (req, res, next) => {
  const token = req.cookies.token; // Read token from cookie

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
