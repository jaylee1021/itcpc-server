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

router.get('/:event', (req, res) => {
    Photo.find({ event: req.params.event })
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
router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newPhoto = {
        url: req.body.url,
        event: req.body.event
    };
    Photo.create(newPhoto)
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

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const updateQuery = {};
    // check url
    if (req.body.url) {
        updateQuery.url = req.body.url;
    }
    // check event
    if (req.body.event) {
        updateQuery.event = req.body.event;
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

router.delete('/:event', passport.authenticate('jwt', { session: false }), (req, res) => {
    Photo.deleteMany({ event: req.params.event })
        .then((result) => {
            return res.json({ message: `photo at ${req.params.id} was delete` });
        })
        .catch((error) => {
            console.log('error inside DELETE /users/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
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