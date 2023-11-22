const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    url: { type: String, required: true },
    show: { type: Boolean, required: true },
}, { timestamps: true });

// create model
const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
