const express = require('express');
const crypto = require('crypto');
<<<<<<< Udeepa
const Payment = require('../models/Payment'); // Import the Payment model
=======
>>>>>>> main
const router = express.Router();

const MERCHANT_ID = '1227926'; // Replace with your actual Merchant ID
const MERCHANT_SECRET = 'MzIxNDM0NTYxNTIzMDQ1MzM5MjIyMTQzMDY3MjIyMzY5NzI0NTU4'; // Replace with your actual Merchant Secret

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

<<<<<<< Udeepa
// Notify URL route to handle payment status updates from PayHere
router.post('/payhere/notify', async (req, res) => {
    const { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig, method } = req.body;

    // Verify the md5sig to ensure the notification is genuine
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
            // Update the Payment collection with payment status as 'paid'
            await Payment.findOneAndUpdate(
                { order_id: order_id },
                { status: 'paid', date: new Date() }
            );
            console.log(`Payment for order ${order_id} updated successfully.`);
            res.status(200).send('Payment notification received and processed successfully.');
        } catch (error) {
            console.error('Error updating payment:', error);
            res.status(500).send('Internal server error');
        }
    } else {
        console.error('Payment verification failed or payment not successful');
        res.status(400).send('Invalid payment notification');
    }
});

=======
>>>>>>> main
module.exports = router;
