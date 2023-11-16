const mongoose = require('mongoose');

const missionGroupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    president: { type: String, required: true },
    vicePresident: String,
    secretary: String,
    clerk: String,
    accounting: String,
    gender: String,
    together: String
}, { timestamps: true });

// create model
const MissionGroup = mongoose.model('MissionGroup', missionGroupSchema);

module.exports = MissionGroup;
