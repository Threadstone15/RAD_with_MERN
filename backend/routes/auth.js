const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student'); // Importing the Student model
const Teacher = require('../models/Teacher'); // Importing the Teacher model
const router = express.Router();

const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key
const MANAGER_EMAIL = 'manager@tuition.com'; // Replace with your actual manager email

// Unified Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Student.findOne({ 'profile.email': email });
    let userType = 'student'; // Default to student
    let userID = user?._id; // Get the user ID if found in students

    if (!user) {
      // If not found, try to find the user in the teachers collection by email
      user = await Teacher.findOne({ 'profile.email': email });
      if (user) {
        if (user.profile.email === MANAGER_EMAIL) {
          userType = 'manager';
          userID = user._id; // Manager has no ID
        } else {
          userType = 'teacher';
          userID = user._id; // Get the user ID if found in teachers
        }
      }
    }

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: userID, role: userType },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });

    const cookies = res.getHeader('Set-Cookie');

    let redirectUrl;
    if (userType === 'student') {
      redirectUrl = '/student-dashboard';
    } else if (userType === 'teacher') {
      redirectUrl = '/teacher-dashboard';
    } else if (userType === 'manager') {
      redirectUrl = '/manager-dashboard';
    }

    res.json({ message: 'Login successful', redirectUrl, userType, userID });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
