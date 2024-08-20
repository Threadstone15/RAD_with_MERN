import axios from 'axios';

// Function to fetch the hash for payment
export const fetchHash = async (order_id, amount, currency) => {
  try {
    const response = await axios.post('http://localhost:5000/api/generate-hash', {
      order_id,
      amount,
      currency,
    });
    console.log('Hash received:', response.data.hash); // Log the hash
    return response.data.hash;
  } catch (error) {
    console.error('Error fetching hash:', error.response?.data || error.message);
    throw error;
  }
};


// Function to initiate the PayHere payment
export const startPayment = async (course, student, hash) => {
  const payment = {
    sandbox: true,
    merchant_id: "1227926",
    return_url: 'http://localhost:5000/return',
    cancel_url: 'http://localhost:5000/cancel',
    notify_url: 'https://33bd-2407-c00-e006-11ae-b07d-1b31-1026-290d.ngrok-free.app/api/payhere/notify',
    order_id: `Order${course.id}`,
    items: course.name,   
    amount: course.amount,
    currency: 'LKR',
    hash: hash,
    first_name: student.name.split(' ')[0],
    last_name: student.name.split(' ')[1] || '',
    email: student.email,
    phone: student.phone,
    address: student.address,
    city: student.city,
    country: student.country,
  };

  try {
    if (window.payhere) {
      window.payhere.startPayment(payment);
    } else {
      console.error("PayHere script not loaded");
    }
  } catch (error) {
    console.error('Error initiating payment:', error);
  }
};

