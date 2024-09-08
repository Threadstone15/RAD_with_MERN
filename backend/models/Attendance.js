const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: false,
  },
  studentID: {
    type: String,
    ref: "Student",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;
