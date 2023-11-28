// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the Schedul model
const { Scheduled } = require('../models');

// GET route for /scheduleds
router.get('/', (req, res) => {
    Scheduled.find({})
        .then(scheduleds => {
            if (scheduleds) {
                return res.json({ scheduleds: scheduleds });
            } else {
                return res.json({ message: 'No scheduleds exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// GET route for /scheduleds/:id
router.get('/:id', (req, res) => {
    Scheduled.findById(req.params.id)
        .then(scheduled => {
            if (scheduled) {
                return res.json({ scheduled: scheduled });
            } else {
                return res.json({ message: 'No scheduled exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route for /scheduleds/new
router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newSchedule = {
        scheduled: true,
    };
    Scheduled.create(newSchedule)
        .then(scheduled => {
            if (scheduled) {
                console.log('new scheduled was created', scheduled);
                return res.json({ scheduled: scheduled });
            } else {
                return res.json({ message: 'No scheduled exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Scheduled.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(scheduled => {
            if (scheduled) {
                return res.json({ message: 'updated', scheduled: scheduled });
            } else {
                return res.json({ message: 'No scheduled exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'There was an issue, please try again' });
        });
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Scheduled.findByIdAndDelete(req.params.id)
        .then((result) => {
            return res.json({ message: `scheduled at ${req.params.id} was delete` });
        })
        .catch((error) => {
            console.log('error inside DELETE /bulletins/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

module.exports = router;