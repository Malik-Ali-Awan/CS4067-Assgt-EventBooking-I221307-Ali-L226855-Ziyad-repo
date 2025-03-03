const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/events");

const app = express();
const PORT = process.env.PORT || 5002;

require("dotenv").config();
// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Default Route for `/`
app.get("/", (req, res) => {
  res.send("Welcome to the Event Service API!");
});

// Routes
app.use("/events", eventRoutes);

// Start Server
app.listen(PORT, () => console.log(`🚀 Event Service running on http://localhost:${PORT}`));
