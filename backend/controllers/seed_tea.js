const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Teacher = require("../models/Teacher"); // Import your Teacher model
const connectDB = require("./db"); // Your DB connection file

const teachers = [
  {
    name: "Saman Perera",
    email: "saman.perera@gmail.com",
    phone: "0771234567",
    address: "Colombo",
    subjects: ["Mathematics", "Physics"],
  },
  {
    name: "Nimal Wickramasinghe",
    email: "nimal.wickramasinghe@gmail.com",
    phone: "0772234567",
    address: "Kandy",
    subjects: ["Biology", "Chemistry"],
  },
  {
    name: "Kumari Silva",
    email: "kumari.silva@gmail.com",
    phone: "0773234567",
    address: "Galle",
    subjects: ["History", "Sinhala"],
  },
  {
    name: "Upali Jayasundara",
    email: "upali.jayasundara@gmail.com",
    phone: "0774234567",
    address: "Matara",
    subjects: ["Mathematics", "IT"],
  },
  {
    name: "Indika Rathnayake",
    email: "indika.rathnayake@gmail.com",
    phone: "0775234567",
    address: "Jaffna",
    subjects: ["English", "Science"],
  },
  {
    name: "Ruwan Dissanayake",
    email: "ruwan.dissanayake@gmail.com",
    phone: "0776234567",
    address: "Negombo",
    subjects: ["Art", "Music"],
  },
  {
    name: "Sunil Fernando",
    email: "sunil.fernando@gmail.com",
    phone: "0777234567",
    address: "Kurunegala",
    subjects: ["Economics", "Business Studies"],
  },
  {
    name: "Mala Senanayake",
    email: "mala.senanayake@gmail.com",
    phone: "0778234567",
    address: "Anuradhapura",
    subjects: ["Geography", "Sinhala"],
  },
  {
    name: "Lakshmi Ekanayake",
    email: "lakshmi.ekanayake@gmail.com",
    phone: "0779234567",
    address: "Ratnapura",
    subjects: ["Science", "Mathematics"],
  },
  {
    name: "Amal Abeywickrama",
    email: "amal.abeywickrama@gmail.com",
    phone: "0776234987",
    address: "Badulla",
    subjects: ["Tamil", "English"],
  },
];

async function addTeachers() {
  try {
    await connectDB(); // Connect to the database

    let teacherIdStart = 100001;

    for (let teacher of teachers) {
      // Hash the password using the phone number
      const password = "TCHR_" + teacher.phone;
      const hashedPassword = await bcrypt.hash(password, 10);

      // Convert subjects array to a single string, e.g., "Mathematics, Physics"
      const subjectsAsString = teacher.subjects.join(", ");

      // Create a new teacher entry
      const newTeacher = new Teacher({
        TeacherID: teacherIdStart.toString(),
        password: hashedPassword,
        profile: {
          name: teacher.name,
          email: teacher.email,
          phone: teacher.phone,
          address: teacher.address,
        },
        subjects: subjectsAsString, // Save subjects as a string
        classIds: [], // Add relevant class IDs if necessary
      });

      // Save the teacher to the database
      await newTeacher.save();
      console.log(`Added teacher ${teacher.name} with ID: ${teacherIdStart}`);

      teacherIdStart++;
    }

    console.log("All teachers added successfully!");
    await mongoose.disconnect(); // Close the database connection
  } catch (error) {
    console.error("Error adding teachers:", error);
  }
}

addTeachers();
