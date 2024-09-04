const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  studentID: {
    type: String,  // Assuming the studentID is a string (like a unique student identifier)
    required: true,
  },
  classID: {
    type: String,  // Added this field to track which class the payment is for
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  month: {
    type: String,  // This field stores the month for which the payment is made (e.g., "September 2024")
    required: true,
  },

});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
