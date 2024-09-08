const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
  },
  classID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
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
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
