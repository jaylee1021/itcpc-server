const mongoose = require('mongoose');

// order schema
const galleryThumbnailSchema = new mongoose.Schema({
    url: { type: String, required: true },
    eventEngName: { type: String, required: true },
    eventKorName: { type: String, required: true },
    eventDate: String,
    together: String
}, { timestamps: true });

// create the model
const GalleryThumbnail = mongoose.model('GalleryThumbnail', galleryThumbnailSchema);

module.exports = GalleryThumbnail;