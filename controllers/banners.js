// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the Banner model
const { Banner } = require('../models');

// GET route for /banners
router.get('/', (req, res) => {
    Banner.find({})
        .then(banners => {
            if (banners) {
                return res.json({ banners: banners });
            } else {
                return res.json({ message: 'No banners exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

router.get('/show', (req, res) => {
    Banner.find({ show: true })
        .then(banners => {
            if (banners) {
                return res.json({ banners: banners });
            } else {
                return res.json({ message: 'No banners exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});


// GET route for /banners/:id
router.get('/:id', (req, res) => {
    Banner.findById(req.params.id)
        .then(banner => {
            if (banner) {
                return res.json({ banner: banner });
            } else {
                return res.json({ message: 'No banner exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route for /banners/new
router.post('/new', (req, res) => {
    const newBanner = {
        url: req.body.url,
        title: req.body.title,
        show: true
    };
    Banner.create(newBanner)
        .then(banner => {
            if (banner) {
                console.log('new banner was created', banner);
                return res.json({ banner: banner });
            } else {
                return res.json({ message: 'No banner exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Banner.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(banner => {
            if (banner) {
                return res.json({ message: 'updated', banner: banner });
            } else {
                return res.json({ message: 'No banner exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'There was an issue, please try again' });
        });
});

router.delete('/:id', (req, res) => {
    Banner.findByIdAndDelete(req.params.id)
        .then((result) => {
            return res.json({ message: `banner at ${req.params.id} was delete` });
        })
        .catch((error) => {
            console.log('error inside DELETE /bulletins/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

module.exports = router;