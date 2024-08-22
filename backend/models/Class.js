const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  TeacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  studentIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  schedule: {
    days: {
      type: [String],
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
});

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
