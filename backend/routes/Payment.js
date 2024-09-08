const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getPaymentsByStudentId } = require("../controllers/paymentController");
const Feedback = require("../models/Feedback");

// Route to get payment details by studentId
router.get("/:studentId", protect, getPaymentsByStudentId);

router.post("/sendFeedback", async (req, res) => {
  try {
    console.log("Got a feedback");
    const { name, email, message } = req.body;
    const newFeedback = Feedback(name, email, message);
    newFeedback.save();
  } catch (error) {
    res.status(500).json({ error: "Error sending feedback" });
  }
});

module.exports = router;
