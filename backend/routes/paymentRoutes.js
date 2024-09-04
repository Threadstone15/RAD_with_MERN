const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Payment = require('../models/Payment'); // Import the Payment model
const router = express.Router();

const MERCHANT_ID = '1227926'; // Replace with your actual Merchant ID
const MERCHANT_SECRET = 'MzIxNDM0NTYxNTIzMDQ1MzM5MjIyMTQzMDY3MjIyMzY5NzI0NTU4'; // Replace with your actual Merchant Secret

router.use(express.urlencoded({ extended: true }));

// Hash generation route
router.post('/generate-hash', (req, res) => {
    const { order_id, amount, currency } = req.body;

    console.log('Received data:', req.body); // Log the received data

    if (!order_id || !amount || !currency) {
        console.error('Missing required fields'); // Log missing fields error
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Ensure amount is formatted correctly (optional, based on your needs)
    const formattedAmount = parseFloat(amount).toFixed(2);

    const hash = crypto
        .createHash('md5')
        .update(
            MERCHANT_ID +
            order_id +
            formattedAmount +
            currency +
            crypto.createHash('md5').update(MERCHANT_SECRET).digest('hex').toUpperCase()
        )
        .digest('hex')
        .toUpperCase();

    console.log('Generated hash:', hash); // Log the generated hash

    res.json({ hash });
});

// Notify URL route to handle payment status updates from PayHere
router.post('/notify_app', async (req, res) => {
    const { studentID, classID, amount, date } = req.body;

    console.log('Received payment completion data:', req.body);

    try {
        // Validate the incoming data
        if (!studentID || !classID || !amount || !date) {
            return res.status(400).send('Missing required fields');
        }


        // Create a new payment record
        const newPayment = new Payment({
            studentID: studentID,
            classID: classID,
            amount: parseFloat(amount),
            date: new Date(date), // Convert the date string to a Date object
            month: new Date(date).getMonth() + 1,
        });

        // Save the payment record to the database
        await newPayment.save();

        console.log(`Payment for student ${studentID} and class ${classID} saved successfully.`);
        res.status(200).send('Payment notification processed and saved successfully.');
    } catch (error) {
        console.error('Error processing payment notification:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
