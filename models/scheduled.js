const mongoose = require('mongoose');

// order schema
const scheduledSchema = new mongoose.Schema({
    scheduled: { type: Boolean, required: true },
}, { timestamps: true });

// create the model
const Scheduled = mongoose.model('Scheduled', scheduledSchema);

module.exports = Scheduled;