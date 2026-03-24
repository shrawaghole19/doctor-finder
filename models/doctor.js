const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: Number,
  rating: Number,
  location: String,
  fees: Number,
  about: String
});

module.exports = mongoose.model("Doctor", DoctorSchema);