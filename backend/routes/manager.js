const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Apply middleware to all routes under /manager-dashboard
router.use(AuthMiddleware);
router.use(roleMiddleware(['manager']));

router.post('/Student', async (req, res) => {
    console.log("Got an http request");
    try {
        const student = req.body;

        console.log(student);
        user = await Student.findOne({ 'profile.email': student.email });
        if (user) {
            return res.status(401).json({ error: 'This email is already registered as a Student' });
        }
        user = await Teacher.findOne({ 'profile.email': student.email });
        if (user) {
            return res.status(401).json({ error: 'This email is already registered as a Teacher' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Must be an error here");

        const newStudent = new Student({
            profile: {
              firstName: student.firstName,
              lastName: student.lastName,
              email: student.email,
              phone: student.phone,
            },
            password: hashedPassword,
            classIds:[],
            PaymentIds:[],
          });
    

        await newStudent.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error creating Student' });
    }
});

router.post('/Teacher', async (req, res) => {
    try {
        const teacher = req.body;

        // Checking if the email is already registered
        user = await Student.findOne({ 'profile.email': student.email });
        if (user) {
            return res.status(401).json({ error: 'This email is already registered as a Student' });
        }
        user = await Teacher.findOne({ 'profile.email': student.email });
        if (user) {
            return res.status(401).json({ error: 'This email is already registered as a Teacher' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newTeacher = new Teacher({
            profile: {
              firstName: student.firstName,
              lastName: student.lastName,
              email: student.email,
              phone: student.phone,
            },
            password: hashedPassword,
            classIds:[],
          });
    

        await newStudent.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error creating Teacher' });
    }
});

module.exports = router;