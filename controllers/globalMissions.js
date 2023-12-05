// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the GlobalMission model
const { GlobalMission } = require('../models');

// GET route for /globalMissions
router.get('/', (req, res) => {
    GlobalMission.find({})
        .then(globalMissions => {
            if (globalMissions) {
                return res.json({ globalMissions: globalMissions });
            } else {
                return res.json({ message: 'No globalMissions exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// GET route for /globalMissions/:id
router.get('/:id', (req, res) => {
    GlobalMission.findById(req.params.id)
        .then(globalMission => {
            if (globalMission) {
                return res.json({ globalMission: globalMission });
            } else {
                return res.json({ message: 'No globalMission exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route for /globalMissions/new
router.post('/new', (req, res) => {
    const newMissionGroup = {
        groupName: req.body.groupName,
        globalMissionsLeader: req.body.globalMissionsLeader,
        secretary: req.body.secretary,
        treasurer: req.body.treasurer,
        teamLead: req.body.teamLead,
        member: req.body.member
    };
    GlobalMission.findOne({ groupName: newMissionGroup.groupName })
        .then(globalMission => {
            if (globalMission) {
                return res.json({ message: 'globalMission already exists' });
            } else {
                GlobalMission.create(newMissionGroup)
                    .then(globalMission => {
                        if (globalMission) {
                            console.log('new globalMission was created', globalMission);
                            return res.json({ globalMission: globalMission });
                        } else {
                            return res.json({ message: 'No globalMission exists' });
                        }
                    })
                    .catch(error => {
                        console.log('error', error);
                        return res.json({ message: 'there is an issue, please try again' });
                    });
            }
        });
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    GlobalMission.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(globalMission => {
            if (globalMission) {
                return res.json({ message: 'updated', globalMission: globalMission });
            } else {
                return res.json({ message: 'No globalMission exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'There was an issue, please try again' });
        });
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    GlobalMission.findByIdAndDelete(req.params.id)
        .then(globalMission => {
            if (globalMission) {
                return res.json({ message: 'deleted', globalMission: globalMission });
            } else {
                return res.json({ message: 'No globalMission exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'There was an issue, please try again' });
        });
});

module.exports = router;