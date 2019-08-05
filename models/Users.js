const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    currentField: {
        type: String,
        required: true
    },
    socialNumber: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        unique: true,
    },
    resetPasswordExpires: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model('users', UserSchema);