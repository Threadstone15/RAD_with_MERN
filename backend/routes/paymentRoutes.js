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
router.post('/payhere/notify', async (req, res) => {
    console.log('Received payment notification:', req.body);

    const {
        merchant_id,
        order_id,
        payhere_amount,
        payhere_currency,
        status_code,
        md5sig,
        method,
        custom_1: studentID, // This will still be received but not validated
        custom_2: month
    } = req.body;

    // Check for missing required fields
    if (!merchant_id || !order_id || !payhere_amount || !payhere_currency || !status_code || !md5sig) {
        console.error('Missing required fields in notification:', req.body);
        return res.status(400).send('Missing required fields');
    }

    // Generate local md5sig for verification
    const local_md5sig = crypto.createHash('md5')
        .update(
            merchant_id +
            order_id +
            payhere_amount +
            payhere_currency +
            status_code +
            crypto.createHash('md5').update(MERCHANT_SECRET).digest('hex').toUpperCase()
        )
        .digest('hex')
        .toUpperCase();

    if (local_md5sig === md5sig && status_code === '2') {
        try {
            // Save the payment record to the database without validating studentID
            const paymentRecord = new Payment({
                studentID: 100001,
                amount: parseFloat(payhere_amount),
                date: new Date(),
                month: month,
                status: 'paid',
                method: method,
                order_id: order_id,
                currency: payhere_currency,
            });

            await paymentRecord.save();
            console.log(`Payment for order ${order_id} saved and updated successfully.`);
            console.log('Payment saved:', paymentRecord);
            res.status(200).send('Payment notification received, processed, and saved successfully.');
        } catch (error) {
            console.error('Error saving payment:', error);
            res.status(500).send('Internal server error');
        }
    } else {
        console.error('Payment verification failed or payment not successful');
        res.status(400).send('Invalid payment notification');
    }
});

module.exports = router;
