import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const StudentPage = () => {
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Dynamically load the PayHere script
    const script = document.createElement('script');
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchHash = async (order_id, amount, currency) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id, amount, currency }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the response text
        throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
      }

      const data = await response.json();
      setHash(data.hash); // Save hash to state
    } catch (error) {
      console.error('Error fetching hash:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (course) => {
    const order_id = `Order${course.id}`;
    const amount = course.amount;
    const currency = 'LKR';

    await fetchHash(order_id, amount, currency);

    if (!hash) {
      console.error('Hash not available');
      return;
    }

    const payment = {
      sandbox: true,
      merchant_id: "1227926",
      return_url: 'http://localhost:5000/return',
      cancel_url: 'http://localhost:5000/cancel',
      notify_url: 'http://localhost:5000/payhere/notify',
      order_id: order_id,
      items: course.name,
      amount: amount,
      currency: currency,
      hash: hash, // Use the hash from state
      first_name: student.name.split(' ')[0],
      last_name: student.name.split(' ')[1] || '',
      email: student.email,
      phone: student.phone,
      address: student.address,
      city: student.city,
      country: student.country,
    };

    if (window.payhere) {
      window.payhere.startPayment(payment);
    } else {
      console.error("PayHere script not loaded");
    }
  };

  const student = {
    name: 'Student',
    email: 'john.doe@example.com',
    phone: '0771234567',
    address: 'No.1, Galle Road',
    city: 'Colombo',
    country: 'Sri Lanka',
    courses: [
      { id: 1, name: 'Math 101', amount: 1000 },
      { id: 2, name: 'Physics 201', amount: 1500 },
    ],
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Welcome, {student.name}</h1>
        <p>Email: {student.email}</p>

        <h2>Your Courses</h2>
        <ul>
          {student.courses.map(course => (
            <li key={course.id}>
              {course.name} - LKR {course.amount}
              <button onClick={() => handlePayment(course)} disabled={loading}>
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentPage;
