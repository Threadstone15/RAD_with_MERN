const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Apply middleware to all routes under /manager-dashboard
router.use(AuthMiddleware);
router.use(roleMiddleware(['manager']));

const generateRandomId = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

router.post('/Student', async (req, res) => {
    try {
        console.log("Got an http request");
        const student = req.body;

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

        let studentId;
        let unique = false;

        while (!unique) {
            studentId = generateRandomId();
            const existingStudent = await Student.findOne({ student_id: studentId });
            if (!existingStudent) {
                unique = true;
            }
        }

        const newStudent = new Student({
            studentID: studentId,
            profile: {
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                phone: student.phone,
            },
            password: hashedPassword,
            classIds: [],
            PaymentIds: [],
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
        user = await Student.findOne({ 'profile.email': teacher.email });
        if (user) {
            return res.status(401).json({ error: 'This email is already registered as a Student' });
        }
        user = await Teacher.findOne({ 'profile.email': teacher.email });
        if (user) {
            return res.status(401).json({ error: 'This email is already registered as a Teacher' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newTeacher = new Teacher({
            profile: {
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                email: teacher.email,
                phone: teacher.phone,
            },
            password: hashedPassword,
            classIds: [],
        });


        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (err) {
        res.status(500).json({ error: 'Error creating Teacher' });
    }
});



router.post('/markAttendance', async (req, res) => {
    try {
        const { classID, studentID } = req.body;

        const student = await Student.findOne({
            studentID: studentID,
            classIds: classID
        });
        if (!student) {
            return res.status(401).json({ error: 'Student is not enrolled in Class' });
        }
        const today = new Date();
        const newAttendance = new Attendance({
            classId: classID,
            studentId: studentID,
            date: today,
            status: "present",
        });
        await newAttendance.save();
        res.status(201).json(newAttendance);
    } catch (err) {
        res.status(500).json({ error: 'Error creating Teacher' });
    }
});
module.exports = router;