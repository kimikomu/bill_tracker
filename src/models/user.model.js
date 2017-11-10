'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true 
    },
    password: {
        type: String,
        required: true
    }
});
const User = mongoose.model('User', UserSchema);
mondel.exports = User;