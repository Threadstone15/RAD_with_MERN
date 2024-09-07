const jwt = require('jsonwebtoken');
const Student = require('../models/Student'); // Import Student model
const Teacher = require('../models/Teacher'); // Import Teacher model
const Manager = require('../models/Manager'); // Import Manager model

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Use environment variable for better security

module.exports = async (req, res, next) => {
  const token = req.cookies.token; // Read token from cookie

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    console.log('Verifying token...');
    // Verify token and extract payload
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const userRole = decoded.role; // Ensure 'role' is part of the JWT payload

    console.log(`User ID: ${userId}, User Role: ${userRole}`);

    let user;
    // Find user based on role
    if (userRole === 'student') {
      console.log('Finding student...');
      user = await Student.findById(userId);
    } else if (userRole === 'teacher') {
      console.log('Finding teacher...');
      user = await Teacher.findById(userId);
    } else if (userRole === 'manager') {
      console.log('Finding manager...');
      user = await Manager.findById(userId);
    } else {
      console.log('Invalid role in token');
      return res.status(401).json({ error: 'Invalid role in token' });
    }

    console.log('User found:', user);

    // If user is not found in the database
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach user details and role to request for further middleware or route handlers
    req.user = user;
    req.userRole = userRole;
    
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

