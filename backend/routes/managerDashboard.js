const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const bcrypt = require('bcrypt');

// Apply middleware to all routes under /manager-dashboard
router.use(AuthMiddleware);
router.use(roleMiddleware(['manager']));

const Payment = require('../models/Payment'); // Adjust the path as needed


async function getPaymentStatisticsForCurrentMonth(totalStudents) {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

        const paymentResult = await Payment.aggregate([
            {
                $match: {
                    date: {
                        $gte: startOfMonth,
                        $lte: endOfMonth,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: '$amount',
                    },
                },
            },
        ]);

        const totalAmountPaid = paymentResult.length > 0 ? paymentResult[0].totalAmount : 0;

        const paidStudents = await Payment.distinct('studentId', {
            date: {
                $gte: startOfMonth,
                $lte: endOfMonth,
            },
        });

        const numberOfPaidStudents = paidStudents.length;

        const numberOfStudentsWhoHaventPaid = totalStudents - numberOfPaidStudents;

        return {
            totalAmountPaid,
            numberOfStudentsWhoHaventPaid,
        };
    } catch (error) {
        console.error('Error calculating payment statistics for the current month:', error);
    }
}

const generateRandomId = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

router.post('/Student', async (req, res) => {
    try {
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
        password = String(generateRandomId());
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
        console.log(student);
        const newStudent = new Student({
            studentID: studentId,
            profile: {
                Name: student.Name,
                email: student.Email,
                phone: student.CNumber,
                DOB: student.DOB,
                Medium: student.Medium,
                School: student.School,
                Address: student.Address,
                PName: student.PName,
                PContact: student.PContact

            },
            password: hashedPassword,
            classIds: [],
            PaymentIds: [],
        });


        await newStudent.save();
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error creating Student' });
    }
});

router.get('/', async (req, res) => {
    try {
        console.log("Got an http request to /manager-dashboard/")
        const StudentCount = await Student.countDocuments();
        const TeacherCount = await Teacher.countDocuments();
        const { monthlyIncome, notPaid } = getPaymentStatisticsForCurrentMonth();
        console.log(StudentCount , TeacherCount,monthlyIncome, notPaid);
        res.json({
            StudentCount: StudentCount,
            TeacherCount: TeacherCount,
            monthlyIncome: monthlyIncome,
            notPaid: notPaid,
        })

    } catch (error) {
        res.status(500).json({ error: 'Error getting statistics' });
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

        let TeacherId;
        let unique = false;

        while (!unique) {
            TeacherId = generateRandomId();
            const existingTeacher = await Teacher.findOne({ TeacherID: TeacherID });
            if (!existingTeacher) {
                unique = true;
            }
        }

        const newTeacher = new Teacher({
            TeacherID: TeacherId,
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

router.post('/AddStudentToClass', async (req, res) => {
    try {
        const { StudentID, ClassName } = req.body;

        const student = await Student.findOne({
            StudentID: StudentID,
        });
        if (!student) {
            return res.status(401).json({ error: 'Invalid Student Id' });
        }
        const class_ = await Class.findOne({
            ClassName: ClassName,
        });
        if (!class_) {
            return res.status(401).json({ error: 'Invalid Class Name' });
        }

        res.status(201).json(newAttendance);
    } catch (err) {
        res.status(500).json({ error: 'Error creating Teacher' });
    }
});
module.exports = router;