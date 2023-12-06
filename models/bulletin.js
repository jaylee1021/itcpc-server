const mongoose = require('mongoose');

const bulletinSchema = new mongoose.Schema({
    title: { type: String, required: true },
    special_title: String,
    content: { type: String, required: true },
    date: { type: Date, required: true },
    kmEm: { type: String, required: true },
    count: Number
}, { timestamps: true });

// create model
const Bulletin = mongoose.model('Bulletin', bulletinSchema);

module.exports = Bulletin;
