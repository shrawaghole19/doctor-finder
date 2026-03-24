const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Doctor = require("./models/Doctor");

const app = express();

console.log("Starting server...");

// Middleware
app.use(cors());
app.use(express.json());

// ✅ CLEAN MongoDB connection (NO deprecated options)
mongoose.connect("mongodb://127.0.0.1:27017/doctorsDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Add doctor
app.post("/add-doctor", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.json({ message: "Doctor added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get doctors by location
app.get("/doctors", async (req, res) => {
  try {
    const location = req.query.location;

    const doctors = await Doctor.find({
      location: { $regex: location, $options: "i" }
    });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});