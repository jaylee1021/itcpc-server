// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the MissionGroup model
const { MissionGroup } = require('../models');

// GET route for /missionGroups
router.get('/', (req, res) => {
    MissionGroup.find({})
        .then(missionGroups => {
            if (missionGroups) {
                return res.json({ missionGroups: missionGroups });
            } else {
                return res.json({ message: 'No missionGroups exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// GET route for /missionGroups
router.get('/:missionGroup', (req, res) => {
    MissionGroup.find({ missionGroup: missionGroup })
        .then(missionGroups => {
            if (missionGroups) {
                return res.json({ missionGroups: missionGroups });
            } else {
                return res.json({ message: 'No missionGroups exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// GET route for /missionGroups/:id
router.get('/:id', (req, res) => {
    MissionGroup.findById(req.params.id)
        .then(missionGroup => {
            if (missionGroup) {
                return res.json({ missionGroup: missionGroup });
            } else {
                return res.json({ message: 'No missionGroup exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route for /missionGroups/new
router.post('/new', (req, res) => {
    const newSermon = {
        embed: req.body.embed,
        preacher: req.body.preacher,
        missionGroup: req.body.missionGroup,
        date: req.body.date,
        snap: req.body.snap,
        title: req.body.title,
        passage: req.body.passage,
        together: req.body.preacher + req.body.missionGroup + req.body.title + req.body.passage + req.body.date.split('T')[0]
    };
    MissionGroup.findOne({ embed: newSermon.embed })
        .then(missionGroup => {
            if (missionGroup) {
                return res.json({ message: 'missionGroup already exists' });
            } else {
                MissionGroup.create(newSermon)
                    .then(missionGroup => {
                        if (missionGroup) {
                            console.log('new missionGroup was created', missionGroup);
                            return res.json({ missionGroup: missionGroup });
                        } else {
                            return res.json({ message: 'No missionGroup exists' });
                        }
                    })
                    .catch(error => {
                        console.log('error', error);
                        return res.json({ message: 'there is an issue, please try again' });
                    });
            }
        });
});

router.put('/:id', (req, res) => {
    MissionGroup.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(missionGroup => {
            if (missionGroup) {
                return res.json({ message: 'updated', missionGroup: missionGroup });
            } else {
                return res.json({ message: 'No missionGroup exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'There was an issue, please try again' });
        });
});

router.delete('/:id', (req, res) => {
    MissionGroup.findByIdAndDelete(req.params.id)
        .then(missionGroup => {
            if (missionGroup) {
                return res.json({ message: 'deleted', missionGroup: missionGroup });
            } else {
                return res.json({ message: 'No missionGroup exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'There was an issue, please try again' });
        });
});

// find the missionGroup
// find the comment
// update the comment
// print to see if it updated
// create a request in Postman
// if it's update, then need return as json

// PUT to update comment

// DELETE to remove comment

module.exports = router;