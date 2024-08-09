const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student'); // Importing the Student model
const Teacher = require('../models/Teacher'); // Importing the Teacher model
const router = express.Router();

const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

// Unified Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Log the incoming email and password
    console.log('Received email:', email);
    console.log('Received password:', password);

    // Try to find the user in the students collection by email
    let user = await Student.findOne({ 'profile.email': email });
    let userType = 'student'; // Default to student

    if (!user) {
      // If not found, try to find the user in the teachers collection by email
      user = await Teacher.findOne({ 'profile.email': email });
      userType = 'teacher';
    }

    // If user not found in either collection, return an error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials....' });
    }

    // Generate JWT token with user ID and role
    const token = jwt.sign(
      { id: user._id, role: userType },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    // Redirect based on user role
    if (userType === 'student') {
      res.json({ message: 'Login successful', redirectUrl: '/student-dashboard' });
    } else if (userType === 'teacher') {
      res.json({ message: 'Login successful', redirectUrl: '/teacher-dashboard' });
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
