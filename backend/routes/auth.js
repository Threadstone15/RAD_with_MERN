const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student'); // Importing the Student model
const Teacher = require('../models/Teacher');
const Manager = require('../models/Manager'); // Importing the Manager model
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Use environment variable for secret key

// Unified Login Route
router.post('/login', async (req, res) => {
  console.log('Login request received');
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Email or password is missing');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log('Searching for user in Student collection');
    let user = await Student.findOne({ 'profile.email': email });
    let userType = 'student'; // Default to student
    let userID = user?._id; // Get the user ID if found in students

    if (!user) {
      console.log('User not found in Student collection');
      // If not found, try to find the user in the teachers collection by email
      console.log('Searching for user in Teacher collection');
      user = await Teacher.findOne({ 'profile.email': email });
      if (user) {
        console.log('User found in Teacher collection');
        userType = 'teacher';
        userID = user._id; // Get the user ID if found in teachers
      } else {
        console.log('User not found in Teacher collection');
        // If not found, try to find the user in the managers collection by email
        console.log('Searching for user in Manager collection');
        user = await Manager.findOne({ 'profile.email': email });
        if (user) {
          console.log('User found in Manager collection');
          userType = 'manager';
          userID = user._id; // Get the user ID if found in managers
        }
      }
    }

    // If no user found or password does not match
    if (!user || !(await user.comparePassword(password))) {
      console.log('User not found or password does not match');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Generating JWT token');
    const token = jwt.sign(
      { id: userID, role: userType },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    console.log('Setting HTTP-only cookie with the token');
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });

    // Set the redirect URL based on user type
    let redirectUrl;
    if (userType === 'student') {
      redirectUrl = '/student-dashboard';
    } else if (userType === 'teacher') {
      redirectUrl = '/teacher-dashboard';
    } else if (userType === 'manager') {
      redirectUrl = '/manager-dashboard';
    }

    console.log('Sending response with user details');
    res.json({ message: 'Login successful', redirectUrl, userType, userID });

  } catch (error) {
    // General error handling
    console.error('Error during login:', error);
    res.status(400).json({ error: 'An error occurred during login' });
  }
});

module.exports = router;

