const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const TeacherSchema = new mongoose.Schema({
  TeacherID: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    name: { // Keep name as a single string
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
    address: {
      type: String,
      required: true,
    },
  },
  subjects: {
    type: String,
    required: false,
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
