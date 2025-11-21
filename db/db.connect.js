const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌍 Cloud MongoDB Connected");
  } catch (err) {
    console.error("❌ Cloud DB Connection Error:", err);
  }
};

module.exports = connectDB;
