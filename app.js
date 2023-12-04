const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('./config/passport')(passport);
// create app
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.get('/', (req, res) => {
    return res.json({ message: 'Welcome to my API' });
});

app.use('/sermons', require('./controllers/sermons'));
app.use('/users', require('./controllers/users'));
app.use('/photos', require('./controllers/photos'));
app.use('/bulletins', require('./controllers/bulletins'));
app.use('/boards', require('./controllers/boards'));
app.use('/histories', require('./controllers/histories'));
app.use('/missionGroups', require('./controllers/missionGroups'));
app.use('/galleryThumbnails', require('./controllers/galleryThumbnails'));
app.use('/scheduled', require('./controllers/scheduled'));
app.use('/banners', require('./controllers/banners'));
app.use('/globalMissions', require('./controllers/globalMissions'));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server connected to PORT: ${PORT}`);
});

module.exports = app;