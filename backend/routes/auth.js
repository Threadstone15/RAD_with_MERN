const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student'); 
const Teacher = require('../models/Teacher');
const Manager = require('../models/Manager'); 
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || 'w3f4f4w3f4w3f4'; 


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
    let userType = 'student'; 
    let userID = user?._id; 

    if (!user) {
      console.log('User not found in Student collection');

      console.log('Searching for user in Teacher collection');
      user = await Teacher.findOne({ 'profile.email': email });
      if (user) {
        console.log('User found in Teacher collection');
        userType = 'teacher';
        userID = user._id; 
      } else {
        console.log('User not found in Teacher collection');
        console.log('Searching for user in Manager collection');
        user = await Manager.findOne({ 'profile.email': email });
        if (user) {
          console.log('User found in Manager collection');
          userType = 'manager';
          userID = user._id; 
        }
      }
    }

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
      maxAge: 3600000, 
    });


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

    console.error('Error during login:', error);
    res.status(400).json({ error: 'An error occurred during login' });
  }
});

module.exports = router;

