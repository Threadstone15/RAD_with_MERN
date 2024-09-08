const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ManagerSchema = new mongoose.Schema({
    ManagerID: {
        type: String,
        required: true,
        index: true,
      },
      password: {
        type: String,
        required: true,
      },
      profile: {
        name: { 
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
}, {
  collection: 'managers' 
});


ManagerSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Manager = mongoose.model("Manager", ManagerSchema);

module.exports = Manager;
