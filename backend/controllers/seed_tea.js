const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Teacher = require('../models/Teacher'); // Adjust the path as needed

const SECRET_KEY = 'your_secret_key'; // Use your actual secret key here
const MONGO_URI = 'mongodb+srv://admin:admin106@tutionmanagement.tmvutgf.mongodb.net/TutionManagement?retryWrites=true&w=majority&appName=TutionManagement';

// Test data
const teachers = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    password: 'password123', // Real password for reference
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    password: 'securePass456', // Real password for reference
  },
];

async function seedTeachers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear the collection
    await Teacher.deleteMany({});

    // Insert test data
    for (const teacher of teachers) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(teacher.password, 10);
      
      // Create a new teacher instance
      const newTeacher = new Teacher({
        profile: {
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          phone: teacher.phone,
        },
        password: hashedPassword,
      });

      // Save to the database
      await newTeacher.save();
    }

    console.log('Test data inserted successfully.');
  } catch (error) {
    console.error('Error inserting test data:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

seedTeachers();
