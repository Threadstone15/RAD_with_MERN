const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const TeacherSchema = new mongoose.Schema({
  TeacherID: {
    type: String,
    required: true,
    index:true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
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
});

// Compare password method
TeacherSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
