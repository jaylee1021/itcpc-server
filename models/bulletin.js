const mongoose = require('mongoose');

const bulletinSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

// create model
const Bulletin = mongoose.model('Bulletin', bulletinSchema);

module.exports = Bulletin;
