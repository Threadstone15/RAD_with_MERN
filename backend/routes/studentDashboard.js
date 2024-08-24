const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Student = require("../models/Student");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.use(AuthMiddleware);
router.use(roleMiddleware(["student"]));

// Route to fetch classes by ObjectId
router.get('/fetchClasses_id/:studentID', async (req, res) => {
    console.log(`Received request to fetch classes for studentID: ${req.params.studentID}`);
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
        console.log(`Student with ID: ${studentID} found in database`);

        // Fetch classes using the populated classIds
        const classes = student.classIds;
        console.log(`Classes for student with ID: ${studentID} are: ${classes}`);

        res.json(classes);
    } catch (error) {
        console.error('Server error fetching classes:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
