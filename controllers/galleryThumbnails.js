// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the GalleryThumbnail model
const { GalleryThumbnail } = require('../models');

// GET route for /galleryThumbnails
router.get('/', (req, res) => {
    GalleryThumbnail.find({})
        .then(galleryThumbnails => {
            if (galleryThumbnails) {
                return res.json({ galleryThumbnails: galleryThumbnails });
            } else {
                return res.json({ message: 'No galleryThumbnails exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// GET route for /galleryThumbnails/:id
router.get('/:id', (req, res) => {
    GalleryThumbnail.findById(req.params.id)
        .then(galleryThumbnail => {
            if (galleryThumbnail) {
                return res.json({ galleryThumbnail: galleryThumbnail });
            } else {
                return res.json({ message: 'No galleryThumbnail exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route for /galleryThumbnails/new
router.post('/new', (req, res) => {
    const newThumb = {
        url: req.body.url,
        eventEngName: req.body.eventEngName,
        eventKorName: req.body.eventKorName,
        eventDate: req.body.eventDate,
        together: req.body.eventEngName + req.body.eventKorName + req.body.eventDate
    };
    GalleryThumbnail.create(newThumb)
        .then(galleryThumbnail => {
            if (galleryThumbnail) {
                // console.log('new galleryThumbnail was created', galleryThumbnail);
                return res.json({ galleryThumbnail: galleryThumbnail });
            } else {
                return res.json({ message: 'No galleryThumbnail exists' });
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
    // check eventEngName
    if (req.body.eventEngName) {
        updateQuery.eventEngName = req.body.eventEngName;
    }
    // check eventKorName
    if (req.body.eventKorName) {
        updateQuery.eventKorName = req.body.eventKorName;
    }
    // check eventDate
    if (req.body.eventDate) {
        updateQuery.eventDate = req.body.eventDate;
    }

    GalleryThumbnail.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true })
        .then((galleryThumbnail) => {
            return res.json({ message: `the galleryThumbnail was updated`, galleryThumbnail: galleryThumbnail });
        })
        .catch((error) => {
            console.log('error inside PUT /users/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

router.delete('/:id', (req, res) => {
    GalleryThumbnail.findByIdAndDelete(req.params.id)
        .then((result) => {
            return res.json({ message: `galleryThumbnail at ${req.params.id} was delete` });
        })
        .catch((error) => {
            console.log('error inside DELETE /users/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

module.exports = router;