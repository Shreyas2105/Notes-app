const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// --- Middleware ---
app.use(cors());           // Allow requests from our React frontend
app.use(express.json());   // Parse incoming JSON request bodies

// --- Routes ---
// All note-related routes are handled in /routes/notes.js
app.use("/api/notes", require("./routes/notes"));

// --- Root test route ---
app.get("/", (req, res) => {
  res.send("Notes API is running!");
});

// --- Connect to MongoDB and start server ---
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));
