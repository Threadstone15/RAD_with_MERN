const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Manager = require("../models/Manager");

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

module.exports = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    console.log("Verifying token...");
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const userRole = decoded.role;

    console.log(`User ID: ${userId}, User Role: ${userRole}`);

    let user;

    if (userRole === "student") {
      console.log("Finding student...");
      user = await Student.findById(userId);
    } else if (userRole === "teacher") {
      console.log("Finding teacher...");
      user = await Teacher.findById(userId);
    } else if (userRole === "manager") {
      console.log("Finding manager...");
      user = await Manager.findById(userId);
    } else {
      console.log("Invalid role in token");
      return res.status(401).json({ error: "Invalid role in token" });
    }

    console.log("User found");

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    req.userRole = userRole;

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
