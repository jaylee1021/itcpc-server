const mongoose = require('mongoose');

// order schema
const photoSchema = new mongoose.Schema({
    url: { type: String, required: true },
    event: { type: String, required: true }
}, { timestamps: true });

// create the model
const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;