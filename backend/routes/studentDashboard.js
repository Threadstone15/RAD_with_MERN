const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Class = require("../models/Class");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.use(AuthMiddleware);
router.use(roleMiddleware(["student"]));

// Route to fetch classes by studentID
router.get('/fetchClasses_id/:studentID', async (req, res) => {
    console.log(`Received request to fetch classes for studentID: ${req.params.studentID}`);
    try {
        const { studentID } = req.params; // Extract studentID from route parameters

        // Find the student and populate their classIds
        const student = await Student.findOne({ studentID }).populate('classIds');

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
