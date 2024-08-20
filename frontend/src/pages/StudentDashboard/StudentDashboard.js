import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { fetchHash, startPayment } from './paymentService';

const StudentPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (course) => {
    const student = {
      name: 'Student',
      email: 'john.doe@example.com',
      phone: '0771234567',
      address: 'No.1, Galle Road',
      city: 'Colombo',
      country: 'Sri Lanka',
    };

    setLoading(true);
    try {
      const hash = await fetchHash(`Order${course.id}`, course.amount, 'LKR');
      await startPayment(course, student, hash);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
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
