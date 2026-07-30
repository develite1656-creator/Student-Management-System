const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const facultyRoutes = require("./routes/facultyRoutes");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
// Home Route
app.get("/", (req, res) => {
    res.send("Student Management System Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});