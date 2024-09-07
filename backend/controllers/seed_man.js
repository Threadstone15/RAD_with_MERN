const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Manager = require('../models/Manager'); // Import your Manager model
const connectDB = require('./db'); // Your DB connection file

async function addManager() {
  try {
    await connectDB(); // Connect to the database

    // Manager details
    const managerProfile = {
      name: "John Doe",
      email: "manager@tuition.com",
      phone: "1234567890",
      address: "123 Main St, Anytown"
    };
    const managerPassword = "password123";
    const managerID = "999999"; // Use the given ManagerID

    // Hash the password
    const hashedPassword = await bcrypt.hash(managerPassword, 10);

    // Create a new manager entry
    const newManager = new Manager({
      ManagerID: managerID, // Use the specified ManagerID
      password: hashedPassword,
      profile: managerProfile // Include the profile details
    });

    // Save the manager to the database
    await newManager.save();
    console.log(`Added manager with ID: ${managerID}`);

    await mongoose.disconnect(); // Close the database connection
  } catch (error) {
    console.error("Error adding manager:", error);
  }
}

addManager();
