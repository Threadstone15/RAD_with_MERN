const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Teacher = require("../models/Teacher");
const bcrypt = require('bcrypt');
const Class = require("../models/Class");

const AuthMiddleware = require("../middleware/AuthMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.use(AuthMiddleware);
router.use(roleMiddleware(["teacher"]));


router.post('/changeTeacherPassword', async (req, res) => {
  try {
    console.log(req.body);
    const { teacherID, currentPassword, newPassword } = req.body;
    const teacher = await Teacher.findById(teacherID);

    if (!teacher) {
      console.error(`Teacher with ID: ${teacherID} not found in database`);
      return res.status(404).json({ error: 'Teacher not found' });
    }

    if (!(await teacher.comparePassword(currentPassword))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    teacher.password = hashedPassword;
    teacher.save();
    res.status(200).json({ message: "Password changed Successfully" });
  } catch (error) {
    console.error('Server error changing Teacher password:', error);
    res.status(500).json({ error: 'Server error' });
  }
})

router.get('/fetchTutorData/:tutorID', async (req, res) => {
  console.log("Got a request to fetchTutorData");
  try {
    const { tutorID } = req.params;
    const tutorObjectId = new mongoose.Types.ObjectId(tutorID);

    console.log(`Fetching tutor with ID: ${tutorObjectId}`);

    const tutor = await Teacher.findById(tutorObjectId).populate("classIds");

    if (!tutor) {
      console.log(`Tutor with ID: ${tutorID} not found in database`);
      return res.status(404).json({ error: 'Tutor not found' });
    }

    console.log("Tutor  found:", tutor);
    res.json(tutor);
  } catch (error) {
    console.error("Error fetching tutor:", error);
  }

})

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




module.exports = router;