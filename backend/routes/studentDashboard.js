const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Student = require("../models/Student");
const Class = require("../models/Class");
const Payment = require("../models/Payment");
const Attendance = require("../models/Attendance");
const bcrypt = require('bcrypt');

const AuthMiddleware = require("../middleware/AuthMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.use(AuthMiddleware);
router.use(roleMiddleware(["student"]));

const getLastMonthRange = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1); // First day of last month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the current month

    return { startOfMonth, endOfMonth };
};


router.get('/fetchStudentData/:studentID', async (req, res) => {


    try {
        const { studentID } = req.params;
        const studentObjectId = new mongoose.Types.ObjectId(studentID);


        const student = await Student.findById(studentObjectId).populate("classIds");

        if (!student) {
            console.log(`Student with ID: ${studentID} not found in database`);
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
    }

})

router.get('/fetchPaymentData/:studentID', async (req, res) => {
    console.log(`Got a request to fetchPaymentData for studentID: ${req.params.studentID}`);

    try {
        const { studentID } = req.params;

        console.log(`Fetching payments for student with ID: ${studentID} from the database`);

        // Assuming studentID is a string
        const payments = await Payment.find({ studentID: studentID }).populate("classID");

        console.log(`Fetched payments: ${payments}`);

        res.json(payments);
    } catch (error) {
        console.error('Server error fetching Payments:', error);
        res.status(500).json({ error: 'Server error' });
    }
})





router.get('/fetchStudentProfile/:studentID', async (req, res) => {
    try {
        const { studentID } = req.params;
        const studentObjectId = new mongoose.Types.ObjectId(studentID);

        // Find the student by ObjectId and populate their classIds
        const student = await Student.findById(studentObjectId).populate("classIds");

        if (!student) {
            console.log(`Student with ID: ${studentID} not found in database`);
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({
            'profile': student.profile,
            'classes': student.classIds
        });
    } catch (error) {
        console.error('Server error fetching Student Profile:', error);
        res.status(500).json({ error: 'Server error' });
    }

})

router.post('/changeStudentPassword', async(req, res) => {
    console.log("Got a request to changeStudentPassword");
    try {
        console.log(req.body);
        const {studentID, currentPassword, newPassword} = req.body;
        const student = await Student.findById(studentID);
    
            if (!student) {
                console.log(`Student with ID: ${studentID} not found in database`);
                return res.status(404).json({ error: 'Student not found' });
            }
            
        if (!(await student.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
          console.log(newPassword);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        student.password = hashedPassword;
        student.save();
        res.status(200).json({message: "Password changed Successfully"});
    } catch (error) {
        console.error('Server error changing Student password:', error);
        res.status(500).json({ error: 'Server error' });
    }
})



router.get('/fetchStudentAttendance/:studentID', async (req, res) => {
    const { startOfMonth, endOfMonth } = getLastMonthRange();
    console.log("Requesting Attendance");
    try {
        const { studentID } = req.params;
        const studentObjectId = new mongoose.Types.ObjectId(studentID);

        // Find the student by ObjectId and populate their classIds
        const student = await Student.findById(studentObjectId).populate("classIds");

        if (!student) {
            console.log(`Student with ID: ${studentID} not found in database`);
            return res.status(404).json({ error: 'Student not found' });
        }
        console.log(student);
        
        const classData = await Promise.all(
            student.classIds.map(async (classObj) => {
              const count = await Attendance.countDocuments({
                studentID: studentID,
                classId: classObj._id,
                date: {
                  $gte: startOfMonth,
                  $lt: endOfMonth,
                },
              });
      
              return { name: classObj.className, value: count*25 };
            })
          );
          console.log(classData);
          res.json(classData);
        
    } catch (error) {
        console.error('Server error fetching classes:', error);
        res.status(500).json({ error: 'Server error' });
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
