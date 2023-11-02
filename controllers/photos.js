// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the Photo model
const { Photo } = require('../models');

// GET route for /photos
router.get('/', (req, res) => {
    Photo.find({})
        .then(photos => {
            if (photos) {
                return res.json({ photos: photos });
            } else {
                return res.json({ message: 'No photos exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// GET route for /photos/:id
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id)
        .then(photo => {
            if (photo) {
                return res.json({ photo: photo });
            } else {
                return res.json({ message: 'No photo exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route for /photos/new
router.post('/new', (req, res) => {
    const newPhoto = {
        url: req.body.url,
        event: req.body.event,
        snap: req.body.snap,
        group: req.body.group,
        date: req.body.date,
        title: req.body.title,
        together: req.body.event + req.body.group + req.body.date + req.body.title
    };
    Photo.create(newPhoto)
        .then(photo => {
            if (photo) {
                console.log('new photo was created', photo);
                return res.json({ photo: photo });
            } else {
                return res.json({ message: 'No photo exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

router.put('/:id', (req, res) => {
    const updateQuery = {};
    // check url
    if (req.body.url) {
        updateQuery.url = req.body.url;
    }
    // check event
    if (req.body.event) {
        updateQuery.event = req.body.event;
    }
    // check group
    if (req.body.group) {
        updateQuery.group = req.body.group;
    }
    // check date
    if (req.body.date) {
        updateQuery.date = req.body.date;
    }
    // check title
    if (req.body.title) {
        updateQuery.title = req.body.title;
    }

    Photo.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true })
        .then((photo) => {
            return res.json({ message: `the photo was updated`, photo: photo });
        })
        .catch((error) => {
            console.log('error inside PUT /users/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

router.delete('/:id', (req, res) => {
    Photo.findByIdAndDelete(req.params.id)
        .then((result) => {
            return res.json({ message: `photo at ${req.params.id} was delete` });
        })
        .catch((error) => {
            console.log('error inside DELETE /users/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

module.exports = router;