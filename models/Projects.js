const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    //TODO: Lidar com esse array input -> lá, ele vai receber uma lógica pra entender os valores separados por vírgula (skills) 
    specialNeeds: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    estimatedValue: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    pictureUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('projects', ProjectSchema);