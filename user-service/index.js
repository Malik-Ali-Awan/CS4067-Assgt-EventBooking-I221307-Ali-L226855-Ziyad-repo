const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios"); // For making REST API calls
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Get all events from Event Service
app.get("/events", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:5002/events");
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching events:", error.message);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

// Book an event via Booking Service
app.post("/book", async (req, res) => {
    try {
        const { user_id, event_id, tickets } = req.body;
        const response = await axios.post("http://localhost:5003/bookings", {
            user_id,
            event_id,
            tickets,
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error booking event:", error.message);
        res.status(500).json({ error: "Failed to book event" });
    }
});

app.listen(PORT, () => console.log(`🚀 User Service running on http://localhost:${PORT}`));
