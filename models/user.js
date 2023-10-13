const mongoose = require('mongoose');

// create the user schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// create model
const User = mongoose.model('User', userSchema);

// export the model to be used
module.exports = User;