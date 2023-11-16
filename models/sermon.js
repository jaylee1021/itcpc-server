const mongoose = require('mongoose');

const sermonSchema = new mongoose.Schema({
    embed: { type: String, required: true, unique: true },
    preacher: { type: String, required: true },
    session: { type: String, required: true },
    snap: String,
    date: { type: Date, required: true },
    title: { type: String, required: true },
    passage: { type: String, required: true },
    together: { type: String }
}, { timestamps: true });

const Sermon = mongoose.model('Sermon', sermonSchema);

module.exports = Sermon;