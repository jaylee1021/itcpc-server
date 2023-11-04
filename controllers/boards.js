// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the Board model
const { Board } = require('../models');

// GET route for /boards
router.get('/', (req, res) => {
    Board.find({})
        .then(boards => {
            if (boards) {
                return res.json({ boards: boards });
            } else {
                return res.json({ message: 'No boards exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// GET route for /boards/:id
router.get('/:id', (req, res) => {
    Board.findById(req.params.id)
        .then(board => {
            if (board) {
                return res.json({ board: board });
            } else {
                return res.json({ message: 'No board exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route for /boards/new
router.post('/new', (req, res) => {
    const newBoard = {
        url: req.body.url,
        title: req.body.title,
        snap: req.body.snap,
        eventDate: req.body.date,
        count: 0
    };
    Board.create(newBoard)
        .then(board => {
            if (board) {
                console.log('new board was created', board);
                return res.json({ board: board });
            } else {
                return res.json({ message: 'No board exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

router.put('/:id', (req, res) => {
    Board.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(board => {
            if (board) {
                return res.json({ message: 'updated', board: board });
            } else {
                return res.json({ message: 'No board exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'There was an issue, please try again' });
        });
});

router.delete('/:id', (req, res) => {
    Board.findByIdAndDelete(req.params.id)
        .then((result) => {
            return res.json({ message: `board at ${req.params.id} was delete` });
        })
        .catch((error) => {
            console.log('error inside DELETE /bulletins/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

module.exports = router;