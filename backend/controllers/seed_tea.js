const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Teacher = require('../models/Teacher'); // Adjust the path as needed

const MONGO_URI = 'mongodb+srv://admin:admin106@tutionmanagement.tmvutgf.mongodb.net/TutionManagement?retryWrites=true&w=majority&appName=TutionManagement';

// Test data
const teachers = [
  {
    TeacherID: '100001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-123-7890',
    address: '123 Main St, Cityville',
    password: 'teacherPass123',
    subjects: 'Mathematics, Physics',
  },
  {
    TeacherID: '100002',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '555-987-6543',
    address: '456 Elm St, Townsville',
    password: 'anotherPass456',
    subjects: 'English, History',
  },
  {
    TeacherID: '100011',
    name: 'Manager Smith',
    email: 'manager@tuition.com',
    phone: '555-987-6543',
    address: '456 Elm St, Townsville',
    password: 'password123',
    subjects: 'English, History',
  },
  {
    TeacherID: '100003',
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    phone: '555-654-3210',
    address: '789 Pine St, Villageton',
    password: 'michaelPass789',
    subjects: 'Chemistry, Biology',
  },
  {
    TeacherID: '100004',
    name: 'Jessica Lee',
    email: 'jessica.lee@example.com',
    phone: '555-789-4561',
    address: '101 Maple Ave, Suburbia',
    password: 'jessicaPass321',
    subjects: 'Geography, Social Studies',
  },
  {
    TeacherID: '100005',
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '555-321-9876',
    address: '102 Cedar St, Metropolis',
    password: 'davidPass654',
    subjects: 'Physics, Computer Science',
  },
  {
    TeacherID: '100006',
    name: 'Laura Wilson',
    email: 'laura.wilson@example.com',
    phone: '555-654-7890',
    address: '103 Oak St, Urbanville',
    password: 'lauraPass456',
    subjects: 'English, Literature',
  },
  {
    TeacherID: '100007',
    name: 'Robert Martinez',
    email: 'robert.martinez@example.com',
    phone: '555-789-1234',
    address: '104 Birch St, Citytown',
    password: 'robertPass123',
    subjects: 'Mathematics, Statistics',
  },
  {
    TeacherID: '100008',
    name: 'Patricia Anderson',
    email: 'patricia.anderson@example.com',
    phone: '555-123-6547',
    address: '105 Walnut St, Uptown',
    password: 'patriciaPass789',
    subjects: 'History, Political Science',
  },
  {
    TeacherID: '100009',
    name: 'Christopher Clark',
    email: 'christopher.clark@example.com',
    phone: '555-987-3210',
    address: '106 Spruce St, Downtown',
    password: 'chrisPass321',
    subjects: 'Economics, Business Studies',
  },
  {
    TeacherID: '100010',
    name: 'Sarah Lewis',
    email: 'sarah.lewis@example.com',
    phone: '555-456-7891',
    address: '107 Poplar St, Riverside',
    password: 'sarahPass654',
    subjects: 'Art, Music',
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
        TeacherID: teacher.TeacherID,
        password: hashedPassword,
        profile: {
          name: teacher.name,
          email: teacher.email,
          phone: teacher.phone,
          address: teacher.address,
        },
        subjects: teacher.subjects,
        // classIds can be added here if needed, otherwise leave it empty
      });

      // Save to the database
      await newTeacher.save();
    }

    console.log('Teacher data inserted successfully.');
  } catch (error) {
    console.error('Error inserting teacher data:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

seedTeachers();
