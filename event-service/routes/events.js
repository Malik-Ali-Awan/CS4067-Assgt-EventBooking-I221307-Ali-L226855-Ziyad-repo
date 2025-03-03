const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// 🔹 Get all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error("❌ Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

// 🔹 Get Event Availability (For Booking Service)
router.get("/:event_id/availability", async (req, res) => {
    const { event_id } = req.params;

    try {
        const event = await Event.findById(event_id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json({ available_tickets: event.available_tickets });
    } catch (error) {
        console.error("❌ Error fetching event availability:", error);
        res.status(500).json({ error: "Failed to fetch event availability" });
    }
});

module.exports = router;
