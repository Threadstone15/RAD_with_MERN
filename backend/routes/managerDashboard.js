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
const QRCode = require('qrcode');

// Apply middleware to all routes under /manager-dashboard
router.use(AuthMiddleware);
router.use(roleMiddleware(["manager"]));

const Payment = require("../models/Payment"); // Adjust the path as needed
const Feedback = require("../models/Feedback");

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
      monthlyIncome: totalAmountPaid,
      notPaid: numberOfStudentsWhoHaventPaid,
    };
  } catch (error) {
    console.error(
      "Error calculating payment statistics for the current month:",
      error
    );
  }
}

router.get("/", async (req, res) => {
  try {
    console.log("Got an http request to /manager-dashboard/");
    const StudentCount = await Student.countDocuments();
    const TeacherCount = await Teacher.countDocuments();
    const { monthlyIncome, notPaid } = await getPaymentStatisticsForCurrentMonth(StudentCount);
    res.json({
      StudentCount: StudentCount,
      TeacherCount: TeacherCount,
      monthlyIncome: monthlyIncome,
      notPaid: notPaid,
    });
  } catch (error) {
    res.status(500).json({ error: "Error getting statistics" });
  }
});

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

    // Update Class collection with the new student's Object ID
    const studentObjectId = newStudent._id;
    const classIds = student.classIds;

    console.log(
      `Updating classes with IDs: ${classIds} to include new student with ObjectId: ${studentObjectId}`
    );

    await Class.updateMany(
      { _id: { $in: classIds } },
      { $push: { studentIds: studentObjectId } }
    );

    console.log("Updated classes with new student's ObjectId");

    // Generate QR code with studentID
    const qrCodeBuffer = await QRCode.toBuffer(String(studentId), {
      scale: 10,
      width: 500,
    });

    // Send email with account details and QR code
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
      html: `<p>Hello ${student.name},</p>
             <p>Your student account has been created successfully. Here are your login details:</p>
             <p>Email: ${student.email}</p>
             <p>Password: ${password}</p>
             <p>Please keep this information safe.</p>
             <p>Best regards,<br>Your School</p>`,
      attachments: [
        {
          filename: 'studentID-' + studentId + '.png',
          content: qrCodeBuffer,
          contentType: 'image/png',
        },
      ],
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



// Utility function to introduce a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

router.post("/mark-attendance", async (req, res) => {
  try {
    console.log("Received request to mark attendance:", req.body);

    const { studentID, classId } = req.body;

    if (!studentID || !classId) {
      console.error("Student ID and Class ID are required");
      return res.status(400).json({ error: "Student ID and Class ID are required" });
    }

    const student = await Student.findOne({ studentID });
    if (!student) {
      console.error("Student not found with ID:", studentID);
      return res.status(404).json({ error: "Student not found" });
    }

    console.log("Student found:", student);

    const isEnrolled = student.classIds.includes(classId);
    if (!isEnrolled) {
      console.error("Student is not enrolled in this class:", classId);
      return res.status(400).json({ error: "Student is not enrolled in this class" });
    }

    console.log("Student is enrolled in the class:", classId);

    const classExists = await Class.findById(classId);
    if (!classExists) {
      console.error("Class not found with ID:", classId);
      return res.status(404).json({ error: "Class not found" });
    }

    console.log("Class found:", classExists);

    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    console.log("Waiting for 1 second before saving to ensure recent attendance is not overwritten...");
    await delay(1000); 
    console.log("Saving attendance record...");

    const recentAttendance = await Attendance.findOne({
      studentID,
      classId,
      date: { $gte: twoMinutesAgo },
    });

    if (recentAttendance) {
      console.error("Attendance already marked within the last 2 minutes for this class:", classId);
      return res.status(400).json({
        error: "Attendance already marked within the last 2 minutes for this class",
      });
    }

    const newAttendance = new Attendance({
      studentID,
      classId,
      date: new Date(),
    });

    await newAttendance.save();
    console.log("Attendance record saved:", newAttendance);

    const savedAttendance = await Attendance.findOne({
      studentID,
      classId,
      date: newAttendance.date, 
    });

    if (savedAttendance) {
      console.log("Attendance record verified:", savedAttendance);
      res.status(201).json({
        success: true,
        message: "Attendance marked successfully",
        data: savedAttendance,
      });
    } else {
      console.error("Failed to verify attendance record after saving");
      res.status(500).json({
        error: "Failed to verify attendance record after saving",
      });
    }
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
    console.error("Error fetching Students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); 
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
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
      .populate("TeacherID")
      .exec();
    res.json(classes);
  } catch (error) {
    console.error("Error fetching class details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Manager Dashboard Update Routes

router.post("/updateTeacher", async (req, res) => {
  try {
    const Something = await Teacher.findOneAndUpdate(
      {
        TeacherID: req.body.TeacherID,
      },
      req.body
    );
  } catch (err) {
    console.log("couldn't update teacher");
  }
});


//Manager Dashboard ADD Routes

router.post("/addTeacher", async (req, res) => {
  console.log("Got a request to add a new teacher");
  try {
    const teacher = req.body;

    console.log("Teacher data:", teacher);

    let user = await Teacher.findOne({ "profile.email": teacher.email });
    if (user) {
      console.log("Teacher with email already exists");
      return res
        .status(400)
        .json({ error: "This email is already registered as a Teacher" });
    }
    user = await Student.findOne({ "profile.email": teacher.email });
    if (user) {
      console.log("Student with email already exists");
      return res
        .status(400)
        .json({ error: "This email is already registered as a Student" });
    }

    const password = "TCHR_" + teacher.phone;
    const hashedPassword = await bcrypt.hash(password, 10);

    let teacherId;
    let unique = false;

    while (!unique) {
      teacherId = generateRandomId();
      const existingTeacher = await Teacher.findOne({ TeacherID: teacherId });
      if (!existingTeacher) {
        unique = true;
      }
    }

    const newTeacher = new Teacher({
      TeacherID: teacherId,
      profile: {
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        address: teacher.address,
      },
      password: hashedPassword,
      subjects: teacher.subjects,
      classIds: teacher.classIds,
    });

    await newTeacher.save();

    // Send email with account details
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "udeepagallege@gmail.com",
        pass: "onnhmfmbmkqpsuom",
      },
      timeout: 60000,
    });

    const mailOptions = {
      from: "udeepagallege@gmail.com",
      to: teacher.email,
      subject: "Your Teacher Account Details",
      text: `Hello ${teacher.name},

Your teacher account has been created successfully. Here are your login details:

Email: ${teacher.email}
Password: ${password}

Please keep this information safe.

Best regards,
The Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Teacher added successfully" });
  } catch (error) {
    console.error("Error adding teacher:", error.message);
    res.status(500).json({ error: "An error occurred while adding the teacher" });
  }
});



//Manager Dashboard UPDATE Routes

router.put("/Teacher_update/:id", async (req, res) => {
  try {
    const teacherId = req.params.id;
    console.log("Trying to update teacher with ID:", teacherId);
    
    // Ensure the request body contains the necessary fields
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }
    
    // Update the teacher details
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { TeacherID: teacherId },
      {
        profile: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
        },
        subjects: req.body.subjects
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );
    
    if (!updatedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    console.log("Updated teacher:", updatedTeacher);
    res.status(200).json(updatedTeacher); // Return the updated teacher
  } catch (err) {
    console.error("Error updating teacher:", err);
    res.status(500).json({ error: "Internal server error" }); // Return server error status
  }
});

router.put("/Student_update/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log("Trying to update student with ID:", studentId);
    
    // Ensure the request body contains the necessary fields
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }
    
    // Update the teacher details
    const updatedStudent = await Student.findOneAndUpdate(
      { studentID: studentId },
      {
        profile: {
          Name: req.body.name,
          email: req.body.email,
          DOB: req.body.DOB,
          phone: req.body.phone,
          Medium: req.body.medium,
          School: req.body.school,
          Address: req.body.address,
          PName: req.body.parentsName,
          PContact: req.body.parentsContact,
        },
        classIds: req.body.classIds
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );
    
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(updatedStudent); // Return the updated teacher
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ error: "Internal server error" }); // Return server error status
  }
});

router.post("/deleteTeacher", async (req, res) => {
  try {
    const Something = await Teacher.findOneAndDelete({
      TeacherID: req.body.TeacherID,
    });
    res.status(200).json({message: "Successfully Deleted teacher"});
  } catch (err) {
    console.log("couldn't delete teacher");
    res.status(500).json({error: "Error Deleting teacher"});
  }
});

router.post("/deleteStudent", async (req, res) => {
  try {
    const Something = await Student.findOneAndDelete({
      studentID: req.body.studentID,
    });
    res.status(200).json({message: "Successfully Deleted student"})
  } catch (err) {
    console.log("couldn't delete student");
    res.status(500).json({error: "Error Deleting teacher"});

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

router.get("/fetchTeachers", async (req, res) => {
  try {
    const teachers = await Teacher.find(); 
    res.json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/addClass', async (req, res) => {
  try {
    const { className, classId, fee, TeacherID, scheduleDays, scheduleTime } = req.body;

    console.log('Adding new class: ', className, classId, fee, TeacherID, scheduleDays, scheduleTime);

    const teacherExists = await Teacher.findById(TeacherID);
    if (!teacherExists) {
      console.log('Teacher not found');
      return res.status(404).json({ error: 'Teacher not found' });
    }

    console.log('Teacher found, creating new class');
    const newClass = new Class({
      className,
      classId,
      fee,
      TeacherID,
      schedule: {
        days: scheduleDays,
        time: scheduleTime,
      },
    });

    console.log('Saving new class');
    await newClass.save();

    console.log('Adding class to teacher');
    teacherExists.classIds.push(newClass._id);
    await teacherExists.save();

    console.log('Class added successfully');
    res.status(201).json({ message: 'Class added successfully', class: newClass });
  } catch (error) {
    console.error('Error adding class:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/deleteClass/:ClassID', async (req, res) => {
  try {
    const { ClassID } = req.params;

    console.log(`Received request to delete class with ClassID: ${ClassID}`);

    const classToDelete = await Class.findById(ClassID);
    if (!classToDelete) {
      console.log(`Class with ClassID: ${ClassID} not found`);
      return res.status(404).json({ error: 'Class not found' });
    }

    console.log(`Class with ClassID: ${ClassID} found, updating teacher`);

    await Teacher.updateOne(
      { _id: classToDelete.TeacherID },
      { $pull: { classIds: ClassID } }
    );

    console.log(`Updated teacher, deleting class`);

    await Class.findByIdAndDelete(ClassID);

    console.log(`Class deleted successfully`);

    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/updateClass/:_id', async (req, res) => {
  const { _id } = req.params;
  const { className, fee, TeacherID, scheduleDays, scheduleTime } = req.body;

  try {
    const updatedClass = await Class.findOneAndUpdate(
      { _id: _id },
      {
        className,
        fee,
        TeacherID,
        schedule: {
          days: scheduleDays,
          time: scheduleTime,
        },
      },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    console.error(`Failed to update class: ${error.message}`);
    console.error(`Error stack: ${error.stack}`);
    res.status(500).json({ message: `Failed to update class: ${error.message}` });
  }
});

router.get('/fetchAllPayments', async (req, res) => {

  try {
    console.log('Received request to fetch all payment data');
    // Fetch all payments
    const payments = await Payment.find({})
    .populate('classID','className')
    .populate('studentID','profile.Name');

    console.log(`Fetched payments: ${payments}`);

    // Return the payments as JSON
    res.json(payments);
  } catch (error) {
    console.error('Server error fetching all payments:', error);
    res.status(500).json({ error: 'Server error' });
  }
});






module.exports = router;
