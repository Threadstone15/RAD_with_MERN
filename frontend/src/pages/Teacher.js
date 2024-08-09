// TeacherPage.js
import React from 'react';

const TeacherPage = () => {
  // Example teacher data (would typically come from props or state)
  const teacher = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    courses: [
      { id: 1, name: 'Math 101' },
      { id: 2, name: 'Physics 201' },
    ],
  };

  return (
    <div>
      <h1>Welcome, {teacher.name}</h1>
      <p>Email: {teacher.email}</p>

      <h2>Your Courses</h2>
      <ul>
        {teacher.courses.map(course => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>

      {/* Add more functionalities like managing courses, checking attendance, etc. */}
    </div>
  );
};

export default TeacherPage; // Corrected export
