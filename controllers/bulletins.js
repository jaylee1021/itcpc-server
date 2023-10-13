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
        url: req.body.url,
        preacher: req.body.preacher,
        date: req.body.date,
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
            return res.json({ message: 'this is an issue, please try again' });
        });
});

router.put('/:id', (req, res) => {
    const updateQuery = {};
    // check title
    if (req.body.title) {
        updateQuery.title = req.body.title;
    }
    // check content
    if (req.body.content) {
        updateQuery.content = req.body.content;
    }
    // check date
    if (req.body.date) {
        updateQuery.date = req.body.date;
    }

    Bulletin.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true })
        .then((bulletin) => {
            return res.json({ message: `the bulletin was updated`, bulletin: bulletin });
        })
        .catch((error) => {
            console.log('error inside PUT /bulletins/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

router.delete('/:id', (req, res) => {
    Bulletin.findByIdAndDelete(req.params.id)
        .then((result) => {
            return res.json({ message: `bulletin at ${req.params.id} was delete` });
        })
        .catch((error) => {
            console.log('error inside DELETE /bulletins/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

module.exports = router;