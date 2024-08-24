const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class = require("../models/Class");
const Attendance = require("../models/Attendance");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Apply middleware to all routes under /manager-dashboard
router.use(AuthMiddleware);
router.use(roleMiddleware(["manager"]));

const Payment = require("../models/Payment"); // Adjust the path as needed

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
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalAmountPaid =
      paymentResult.length > 0 ? paymentResult[0].totalAmount : 0;

    const paidStudents = await Payment.distinct("studentId", {
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
    console.error(
      "Error calculating payment statistics for the current month:",
      error
    );
  }
}

const generateRandomId = () => {
  return Math.floor(100000 + Math.random() * 900000);
};


router.post("/Student", async (req, res) => {
  try {
    const student = req.body;

    // Checking if the email is already registered
    let user = await Student.findOne({ "profile.email": student.email });
    if (user) {
      return res
        .status(401)
        .json({ error: "This email is already registered as a Student" });
    }
    user = await Teacher.findOne({ "profile.email": student.email });
    if (user) {
      return res
        .status(401)
        .json({ error: "This email is already registered as a Teacher" });
    }

    const password = "STD_" + student.phone;
    const hashedPassword = await bcrypt.hash(password, 10);
    let studentId;
    let unique = false;

    while (!unique) {
      studentId = generateRandomId();
      const existingStudent = await Student.findOne({ studentID: studentId });
      if (!existingStudent) {
        unique = true;
      }
    }

    const newStudent = new Student({
      studentID: studentId,
      profile: {
        Name: student.name,
        email: student.email,
        phone: student.phone,
        DOB: student.dateOfBirth,
        Medium: student.medium,
        School: student.school,
        Address: student.address,
        PName: student.parentsName,
        PContact: student.parentsContact,
      },
      password: hashedPassword,
      classIds: student.classIds,
      PaymentIds: [],
    });

    await newStudent.save();

    // Send email with account details
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or another email service
      auth: {
        user: "udeepagallege@gmail.com", // your email
        pass: "onnhmfmbmkqpsuom", // your email password
      },
      timeout: 60000,

    });

    const mailOptions = {
      from: "amuthuewn@gmail.com", // or your email
      to: student.email,
      subject: "Your Student Account Details",
      text: `Hello ${student.name},

Your student account has been created successfully. Here are your login details:

Email: ${student.email}
Password: ${password}

Please keep this information safe.

Best regards,
Your School`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    res.status(201).json(newStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating Student" });
  }
});



router.post("/mark-attendance", async (req, res) => {
  try {
    const { studentID } = req.body;

    if (!studentID) {
      return res.status(400).json({ error: "Student ID is required" });
    }

    const student = await Student.findOne({ studentID });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

    const recentAttendance = await Attendance.findOne({
      studentID,
      date: { $gte: twoMinutesAgo }, // Check if there's a record within the last 2 minutes
    });

    if (recentAttendance) {
      return res
        .status(400)
        .json({ error: "Attendance already marked within the last 2 minutes" });
    }

    const newAttendance = new Attendance({
      studentID,
      date: new Date(),
      status: "present",
    });

    await newAttendance.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Attendance marked successfully",
        data: newAttendance,
      });
  } catch (err) {
    console.error("Error marking attendance:", err);
    res.status(500).json({ error: "Error marking attendance", details: err });
  }
});

router.post("/AddStudentToClass", async (req, res) => {
  try {
    const { StudentID, ClassName } = req.body;

    const student = await Student.findOne({
      StudentID: StudentID,
    });
    if (!student) {
      return res.status(401).json({ error: "Invalid Student Id" });
    }
    const class_ = await Class.findOne({
      ClassName: ClassName,
    });
    if (!class_) {
      return res.status(401).json({ error: "Invalid Class Name" });
    }

    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(500).json({ error: "Error creating Teacher" });
  }
});

//Manager Dashboard Fetch Routes

router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find(); 
    res.json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/students", async (req, res) => {
  try {
    const students = await Student.find(); 
    res.json(students);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/classes", async (req, res) => {
  try {
    const classes = await Class.find(); 
    res.json(classes);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/classes-with-teachers", async (req, res) => {
  try {
    const classes = await Class.find()
      .populate({
        path: "TeacherID",
        select: "profile.name",
      })
      .exec();

    res.json(classes);
  } catch (error) {
    console.error("Error fetching class details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/deleteTeacher", async (req, res) => {
  try {
    console.log(req.body.TeacherID);
    const Something = await Teacher.findOneAndDelete({
      TeacherID: req.body.TeacherID,
    });
  } catch (err) {
    console.log("couldn't delete teacher");
  }
});

router.get("/fetchClasses", async (req, res) => {
  try {
    const classes = await Class.find(); 
    res.json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
