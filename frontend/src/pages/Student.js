// StudentPage.js
import React from 'react';

const StudentPage = () => {
  // Example student data (would typically come from props or state)
  const student = {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    enrolledCourses: [
      { id: 1, name: 'Math 101' },
      { id: 2, name: 'Physics 201' },
    ],
    attendance: {
      'Math 101': '95%',
      'Physics 201': '90%',
    },
  };

  return (
    <div>
      <h1>Welcome, {student.name}</h1>
      <p>Email: {student.email}</p>

      <h2>Your Enrolled Courses</h2>
      <ul>
        {student.enrolledCourses.map(course => (
          <li key={course.id}>
            {course.name} - Attendance: {student.attendance[course.name]}
          </li>
        ))}
      </ul>

      {/* Add more functionalities like viewing grades, submitting assignments, etc. */}
    </div>
  );
};

export default StudentPage;
