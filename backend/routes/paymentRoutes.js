const express = require('express');
const crypto = require('crypto');
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

module.exports = router;
