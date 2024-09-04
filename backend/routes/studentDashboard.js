const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Student = require("../models/Student");
const Class = require("../models/Class");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.use(AuthMiddleware);
router.use(roleMiddleware(["student"]));

router.get('/fetchStudentData/:studentID', async (req, res) => {
    console.log("Got a request to fetchStudentData");
    try {
        const {studentID } = req.params;
        const studentObjectId = new mongoose.Types.ObjectId(studentID);

        console.log(`Fetching student with ID: ${studentObjectId}`);

        const student = await Student.findById(studentObjectId).populate("classIds");

        if (!student) {
            console.log(`Student with ID: ${studentID} not found in database`);
            return res.status(404).json({ error: 'Student not found' });
        }

        console.log("Student found:", student);
        res.json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
    }
    
})



router.get('/fetchStudentProfile/:studentID', async (req, res) => {
    console.log("Got a request to fetchStudentProfile");
    try {
        const {studentID } = req.params;
        const studentObjectId = new mongoose.Types.ObjectId(studentID);

        // Find the student by ObjectId and populate their classIds
        const student = await Student.findById(studentObjectId).populate("classIds");

        if (!student) {
            console.log(`Student with ID: ${studentID} not found in database`);
            return res.status(404).json({ error: 'Student not found' });
        }
        console.log(student);
        res.json({
            'profile':student.profile,
            'classes': student.classIds
        });
    } catch (error) {

    }
    
})

// Route to fetch classes by ObjectId
router.get('/fetchClasses_id/:studentID', async (req, res) => {
    try {
        const { studentID } = req.params;

        // Check if studentID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(studentID)) {
            console.log(`Invalid ObjectId: ${studentID}`);
            return res.status(400).json({ error: 'Invalid student ID format' });
        }

        // Convert studentID to ObjectId
        const studentObjectId = new mongoose.Types.ObjectId(studentID);

        // Find the student by ObjectId and populate their classIds
        const student = await Student.findById(studentObjectId).populate('classIds');

        if (!student) {
            console.log(`Student with ID: ${studentID} not found in database`);
            return res.status(404).json({ error: 'Student not found' });
        }

        // Fetch classes using the populated classIds
        const classes = student.classIds;


        res.json(classes);
    } catch (error) {
        console.error('Server error fetching classes:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
