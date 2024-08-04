// routes/protectedRoutes.js
const express = require('express');
const roleMiddleware = require('../middleware/roleMiddleware'); // Assuming you have this
const authMiddleware = require('../middleware/AuthMiddleware'); // Assuming you have this

const router = express.Router();

// Example protected route
router.get('/profile', authMiddleware, (req, res) => {
  res.json(req.user.profile);
});

// Example route restricted to students
router.get('/student-dashboard', authMiddleware, roleMiddleware(['student']), (req, res) => {
  res.json({ message: 'Welcome to the student dashboard' });
});

// Example route restricted to teachers
router.get('/teacher-dashboard', authMiddleware, roleMiddleware(['teacher']), (req, res) => {
  res.json({ message: 'Welcome to the teacher dashboard' });
});

// Example route restricted to managers
router.get('/manager-dashboard', authMiddleware, roleMiddleware(['manager']), (req, res) => {
  res.json({ message: 'Welcome to the manager dashboard' });
});

module.exports = router;
