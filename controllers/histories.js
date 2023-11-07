require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

const { History } = require('../models');

router.get('/', (req, res) => {
    History.find({})
        .then(histories => {
            if (histories) {
                return res.json({ histories: histories });
            } else {
                return res.json({ message: 'No histories exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

router.get('/:order', (req, res) => {
    History.find({ order: req.params.order })
        .then(orders => {
            if (orders) {
                return res.json({ orders: orders });
            } else {
                return res.json({ message: 'No orders exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

router.get('/:id', (req, res) => {
    History.findById(req.params.id)
        .then(history => {
            if (history) {
                return res.json({ history: history });
            } else {
                return res.json({ message: 'No history exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route for /sermons/new
router.post('/new', (req, res) => {
    const newHistory = {
        date: req.body.date,
        event_description: req.body.event_description,
        order: req.body.order
    };
    History.create(newHistory)
        .then(history => {
            if (history) {
                console.log('new history was created', history);
                return res.json({ history: history });
            } else {
                return res.json({ message: 'No history exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

router.put('/:id', (req, res) => {
    const updateQuery = {};

    if (req.body.date) {
        updateQuery.date = req.body.date;
    }

    if (req.body.event_description) {
        updateQuery.event_description = req.body.event_description;
    }

    if (req.body.order) {
        updateQuery.order = req.body.order;
    }

    History.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true })
        .then((history) => {
            return res.json({ message: `the history was updated`, history: history });
        })
        .catch((error) => {
            console.log('error inside PUT /bulletins/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

router.delete('/:id', (req, res) => {
    History.findByIdAndDelete(req.params.id)
        .then((result) => {
            return res.json({ message: `history at ${req.params.id} was delete` });
        })
        .catch((error) => {
            console.log('error inside DELETE /bulletins/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

module.exports = router;