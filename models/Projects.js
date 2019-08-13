const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    userName: {
        type: Schema.Types.String,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    category: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    objective: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true,
        lowercase: true
    },
    specialNeeds: {
        type: Array,
        required: false
    },
    location: {
        type: String,
        required: true,
        lowercase: true
    },
    estimatedValue: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('projects', ProjectSchema);