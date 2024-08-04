const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  grade: {
    type: String,
    enum: ["A", "B", "C", "D", "F"],
    required: true,
  },
});

const Grade = mongoose.model("Grade", GradeSchema);

module.exports = Grade;
