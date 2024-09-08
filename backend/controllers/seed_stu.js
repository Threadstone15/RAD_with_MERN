const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Student = require("../models/Student"); // Adjust the path as needed

const MONGO_URI =
  "mongodb+srv://admin:admin106@tutionmanagement.tmvutgf.mongodb.net/TutionManagement?retryWrites=true&w=majority&appName=TutionManagement";

// Test data
const students = [
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    phone: "555-123-4567",
    password: "studentPass123", // Real password for reference
  },
  {
    firstName: "Bob",
    lastName: "Williams",
    email: "bob.williams@example.com",
    phone: "555-987-6543",
    password: "anotherPass456", // Real password for reference
  },
];

async function seedStudents() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear the collection
    await Student.deleteMany({});

    // Insert test data
    for (const student of students) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(student.password, 10);

      // Create a new student instance
      const newStudent = new Student({
        profile: {
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          phone: student.phone,
        },
        password: hashedPassword,
      });

      // Save to the database
      await newStudent.save();
    }

    console.log("Student data inserted successfully.");
  } catch (error) {
    console.error("Error inserting student data:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

seedStudents();
