const mongoose = require('mongoose');

// order schema
const photoSchema = new mongoose.Schema({
    url: { type: String, required: true },
    event: { type: String, required: true },
    group: { type: String, required: true },
    date: { type: Date, required: true },
    title: String
}, { timestamps: true });

// create the model
const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;