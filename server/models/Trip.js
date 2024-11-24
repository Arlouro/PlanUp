const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: String,
    time: String,
    upvotes: { type: Number, default: 0 },
    comments: [{ text: String, timestamp: { type: Date, default: Date.now } }]
});

const TripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    days: [[ActivitySchema]],
});

module.exports = mongoose.model('Trip', TripSchema);
