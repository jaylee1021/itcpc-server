const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    date: { type: String, required: true },
    event_description: { type: String, required: true },
    order: { type: Number, required: true }
}, { timestamps: true });

// create model
const History = mongoose.model('History', historySchema);

module.exports = History;
