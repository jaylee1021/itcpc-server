// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the Sermon model
const { Sermon } = require('../models');

// GET route for /sermons
router.get('/', (req, res) => {
    Sermon.find({})
        .then(sermons => {
            if (sermons) {
                return res.json({ sermons: sermons });
            } else {
                return res.json({ message: 'No sermons exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// GET route for /sermons
router.get('/:session', (req, res) => {
    let session;
    if (req.params.session === '1st') {
        session = '1부';
    } else if (req.params.session === '2nd') {
        session = '2부';
    } else if (req.params.session === '3rd') {
        session = '3부';
    }
    Sermon.find({ session: session })
        .then(sermons => {
            if (sermons) {
                return res.json({ sermons: sermons });
            } else {
                return res.json({ message: 'No sermons exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// GET route for /sermons/:id
router.get('/:id', (req, res) => {
    Sermon.findById(req.params.id)
        .then(sermon => {
            if (sermon) {
                return res.json({ sermon: sermon });
            } else {
                return res.json({ message: 'No sermon exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route for /sermons/new
router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newSermon = {
        embed: req.body.embed,
        preacher: req.body.preacher,
        session: req.body.session,
        date: req.body.date,
        snap: req.body.snap,
        title: req.body.title,
        passage: req.body.passage,
        count: 0,
        together: req.body.preacher + req.body.session + req.body.title + req.body.passage + req.body.date.split('T')[0]
    };
    Sermon.findOne({ embed: newSermon.embed })
        .then(sermon => {
            if (sermon) {
                return res.json({ message: 'sermon already exists' });
            } else {
                Sermon.create(newSermon)
                    .then(sermon => {
                        if (sermon) {
                            console.log('new sermon was created', sermon);
                            return res.json({ sermon: sermon });
                        } else {
                            return res.json({ message: 'No sermon exists' });
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
    Sermon.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(sermon => {
            if (sermon) {
                return res.json({ message: 'updated', sermon: sermon });
            } else {
                return res.json({ message: 'No sermon exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'There was an issue, please try again' });
        });
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Sermon.findByIdAndDelete(req.params.id)
        .then(sermon => {
            if (sermon) {
                return res.json({ message: 'deleted', sermon: sermon });
            } else {
                return res.json({ message: 'No sermon exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'There was an issue, please try again' });
        });
});

module.exports = router;