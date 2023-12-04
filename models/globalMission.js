const mongoose = require('mongoose');

const globalMissionSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    teamLead: String,
    member: String
}, { timestamps: true });

// create model
const GlobalMission = mongoose.model('GlobalMission', globalMissionSchema);

module.exports = GlobalMission;
