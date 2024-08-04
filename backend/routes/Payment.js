const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getPaymentsByStudentId } = require('../controllers/paymentController');

// Route to get payment details by studentId
router.get('/:studentId', protect, getPaymentsByStudentId);

module.exports = router;
