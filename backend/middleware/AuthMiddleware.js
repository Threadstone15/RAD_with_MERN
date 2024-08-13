const jwt = require('jsonwebtoken');
const Student = require('../models/Student'); // Import Student model
const Teacher = require('../models/Teacher'); // Import Teacher model

const SECRET_KEY =  'your_secret_key'; // Use an environment variable for better security

module.exports = async (req, res, next) => {
  const token = req.cookies.token; // Read token from cookie
  

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
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

    req.user = userRole;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};
