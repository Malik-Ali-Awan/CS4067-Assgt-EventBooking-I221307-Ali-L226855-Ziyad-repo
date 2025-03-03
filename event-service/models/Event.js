const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    total_tickets: { type: Number, required: true },
    available_tickets: { type: Number, required: true, default: 100 },
    price: { type: Number, required: true }
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
