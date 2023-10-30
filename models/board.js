const mongoose = require('mongoose');

// order schema
const boardSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    snap: { type: String, required: true }
}, { timestamps: true });

// create the model
const Board = mongoose.model('Board', boardSchema);

module.exports = Board;