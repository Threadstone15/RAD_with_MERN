const mongoose = require("mongoose");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const Student = require("../models/Student");

// MongoDB Connection
const dbUrl =
  "mongodb+srv://admin:admin106@tutionmanagement.tmvutgf.mongodb.net/TutionManagement?retryWrites=true&w=majority&appName=TutionManagement";

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    const students = await Student.find().exec(); // Fetch all students

    // Create a directory for QR codes if it doesn't exist
    const qrCodesDir = path.join(__dirname, "qr_codes");
    if (!fs.existsSync(qrCodesDir)) {
      fs.mkdirSync(qrCodesDir);
    }

    // Generate and save QR codes for each student
    for (const student of students) {
      const qrData = JSON.stringify({
        studentID: student.studentID,
        email: student.profile.email,
      });

      const qrCodePath = path.join(qrCodesDir, `${student.studentID}.png`);
      await QRCode.toFile(qrCodePath, qrData);

      console.log(`QR Code generated for Student ID: ${student.studentID}`);
    }

    console.log("All QR codes have been generated.");
  } catch (error) {
    console.error("Error generating QR codes:", error);
  } finally {
    mongoose.connection.close(); // Close the MongoDB connection
  }
});
