const Payment = require('../models/Payment');

// Controller function to get payments by studentId
exports.getPaymentsByStudentId = async (req, res) => {
  try {
    const payments = await Payment.find({ studentId: req.params.studentId });

    if (!payments) {
      return res.status(404).json({ message: 'No payments found for this student' });
    }

    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
