const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const StudentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    Name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    Medium: {
      type: String,
      required: true,
    },
    School: {
      type: String,
    },
    Address: {
      type: String,
      required: true,
    },
    PName: {
      type: String,
      required: true,
    },
    PContact: {
      type: String,
      required: true,
    },
  },
  classIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  paymentIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
});

// Compare password method
StudentSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
