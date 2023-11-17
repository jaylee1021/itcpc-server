// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the Bulletin model
const { Bulletin } = require('../models');

// GET route for /bulletins
router.get('/', (req, res) => {
    Bulletin.find({})
        .then(bulletins => {
            if (bulletins) {
                return res.json({ bulletins: bulletins });
            } else {
                return res.json({ message: 'No bulletins exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// GET route for /bulletins/:id
router.get('/:id', (req, res) => {
    Bulletin.findById(req.params.id)
        .then(bulletin => {
            if (bulletin) {
                return res.json({ bulletin: bulletin });
            } else {
                return res.json({ message: 'No bulletin exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route for /bulletins/new
router.post('/new', (req, res) => {
    const newBulletin = {
        title: '주보',
        content: req.body.content,
        date: req.body.date
    };
    Bulletin.create(newBulletin)
        .then(bulletin => {
            if (bulletin) {
                console.log('new bulletin was created', bulletin);
                return res.json({ bulletin: bulletin });
            } else {
                return res.json({ message: 'No bulletin exists' });
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