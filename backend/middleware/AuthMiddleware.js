const jwt = require('jsonwebtoken');
const Student = require('../models/Student'); // Import Student model
const Teacher = require('../models/Teacher'); // Import Teacher model

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use an environment variable for better security

module.exports = async (req, res, next) => {
  const token = req.cookies.token; // Read token from cookie
  console.log(req.cookies)
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    const userId = decoded.id;
    const userRole = decoded.role; // Ensure you include 'role' in your JWT payload

    let user;
    if (userRole === 'student') {
      user = await Student.findById(userId);
    } else if (userRole === 'teacher' || userRole ==='manager') {
      user = await Teacher.findById(userId);
    } else {
      return res.status(401).json({ error: 'Invalid role in token' });
    }

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
