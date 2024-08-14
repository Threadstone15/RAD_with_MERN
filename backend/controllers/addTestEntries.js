const mongoose = require('mongoose');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');


const dbUrl = 'mongodb+srv://admin:admin106@tutionmanagement.tmvutgf.mongodb.net/TutionManagement?retryWrites=true&w=majority&appName=TutionManagement';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  const students = [
    {
      studentID: '123456',
      password: 'password1',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
      },
      classIds: [], // Add ObjectId references if available
      paymentIds: [], // Add ObjectId references if available
    },
    {
      studentID: '123457',
      password: 'password2',
      profile: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '2345678901',
      },
      classIds: [], 
      paymentIds: [],
    },
    {
      studentID: '123458',
      password: 'password3',
      profile: {
        firstName: 'Jim',
        lastName: 'Brown',
        email: 'jim.brown@example.com',
        phone: '3456789012',
      },
      classIds: [], 
      paymentIds: [],
    },
    {
      studentID: '123459',
      password: 'password4',
      profile: {
        firstName: 'Jake',
        lastName: 'White',
        email: 'jake.white@example.com',
        phone: '4567890123',
      },
      classIds: [], 
      paymentIds: [],
    },
    {
      studentID: '123450',
      password: 'password5',
      profile: {
        firstName: 'Jill',
        lastName: 'Black',
        email: 'jill.black@example.com',
        phone: '5678901234',
      },
      classIds: [], 
      paymentIds: [],
    },
  ];

  try {
    for (const student of students) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(student.password, 10);
      
      // Create a new teacher instance
      const newStudent = new Student({
        studentID: student.studentID,
        profile: {
          firstName: student.profile.firstName,
          lastName: student.profile.lastName,
          email: student.profile.email,
          phone: student.profile.phone,
        },
        password: hashedPassword,
      });

      // Save to the database
      await newStudent.save();
    }
  } catch (err) {
    console.error('Error adding test users:', err);
  } finally {
    mongoose.connection.close();
  }
});
