const mongoose = require('mongoose');

const missionGroupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    president: { type: String, required: true },
    vicePresident: { type: String, required: true },
    secretary: String,
    clerk: String,
    accounting: String
}, { timestamps: true });

// create model
const MissionGroup = mongoose.model('MissionGroup', missionGroupSchema);

module.exports = MissionGroup;
