const mongoose = require("mongoose");
const Class = require('../models/Class'); // Adjust the path to your Class model file

const MONGO_URI = 'mongodb+srv://admin:admin106@tutionmanagement.tmvutgf.mongodb.net/TutionManagement?retryWrites=true&w=majority&appName=TutionManagement';

// Generate random 6-digit IDs
const generateRandomId = () => {
  return new mongoose.Types.ObjectId(); // Generate a new ObjectId
};

const seedClasses = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await Class.deleteMany({});

    // Generate random student IDs and fetch existing teacher IDs
    const studentIds = Array.from({ length: 50 }, generateRandomId);
    const teacherIds = await mongoose.connection.db.collection('teachers').distinct('_id'); // Ensure teacher IDs are fetched correctly

    // Define class entries
    const classes = [
      {
        className: "Math 101",
        teacherId: teacherIds[0],
        studentIds: studentIds.slice(0, 10),
        schedule: {
          days: ["Monday", "Wednesday", "Friday"],
          time: "10:00 AM - 11:00 AM",
        },
      },
      {
        className: "Science 102",
        teacherId: teacherIds[1],
        studentIds: studentIds.slice(10, 20),
        schedule: {
          days: ["Tuesday", "Thursday"],
          time: "1:00 PM - 2:30 PM",
        },
      },
      {
        className: "History 201",
        teacherId: teacherIds[2],
        studentIds: studentIds.slice(20, 30),
        schedule: {
          days: ["Monday", "Wednesday"],
          time: "3:00 PM - 4:30 PM",
        },
      },
      {
        className: "English 202",
        teacherId: teacherIds[3],
        studentIds: studentIds.slice(30, 40),
        schedule: {
          days: ["Tuesday", "Thursday"],
          time: "9:00 AM - 10:30 AM",
        },
      },
      {
        className: "Art 303",
        teacherId: teacherIds[4],
        studentIds: studentIds.slice(40, 50),
        schedule: {
          days: ["Monday", "Friday"],
          time: "11:00 AM - 12:30 PM",
        },
      },
    ];

    // Insert class entries into the database
    await Class.insertMany(classes);

    console.log('Classes seeded successfully.');
  } catch (error) {
    console.error('Error seeding classes:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

seedClasses();
