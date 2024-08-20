const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  studentID: {
    type: String,
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
  status: {
    type: String,
    enum: ["paid", "pending"],
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
