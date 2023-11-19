require('dotenv').config();
const mongoose = require('mongoose');

// import all models
const Sermon = require('./sermon');
const Photo = require('./photo');
const Bulletin = require('./bulletin');
const User = require('./user');
const Board = require('./board');
const History = require('./history');
const MissionGroup = require('./missionGroup');
const GalleryThumbnail = require('./galleryThumbnail');
const Scheduled = require('./scheduled');

console.log('mongo uri =>', process.env.MONGO_URI);

// connect to the database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create connection object
const db = mongoose.connection;

// once the database opens
db.once('open', () => {
    console.log('Connected to MongoDB Database: Mongoose App at HOST: ', db.host, 'PORT: ', db.port);
});

// if there is a database error
db.on('error', (err) => {
    console.log(`Database error: `, err);
});

module.exports = {
    Sermon,
    Photo,
    Bulletin,
    User,
    Board,
    History,
    MissionGroup,
    GalleryThumbnail,
    Scheduled
};