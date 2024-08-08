const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path if necessary

const dbUrl = 'mongodb+srv://admin:admin106@tutionmanagement.tmvutgf.mongodb.net/TutionManagement?retryWrites=true&w=majority&appName=TutionManagement';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  const testUsers = [
    {
      username: 'student1',
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
      username: 'student2',
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
      username: 'student3',
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
      username: 'student4',
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
      username: 'student5',
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
    await User.insertMany(testUsers);
    console.log('Test users added successfully');
  } catch (err) {
    console.error('Error adding test users:', err);
  } finally {
    mongoose.connection.close();
  }
});
