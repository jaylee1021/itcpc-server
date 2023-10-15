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
router.get('/firstSession', (req, res) => {
    Sermon.find({ session: 'first' })
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
router.post('/new', (req, res) => {
    const newSermon = {
        embed: req.body.embed,
        preacher: req.body.preacher,
        session: req.body.session,
        date: req.body.date,
        snap: req.body.snap,
        title: req.body.title,
        passage: req.body.passage
    };
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
});

router.put('/:id', (req, res) => {
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

// find the sermon
// find the comment
// update the comment
// print to see if it updated
// create a request in Postman
// if it's update, then need return as json

// PUT to update comment

// DELETE to remove comment

module.exports = router;