const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ImageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  fieldname: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  },
  encoding: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = Images = mongoose.model('images', ImageSchema)
