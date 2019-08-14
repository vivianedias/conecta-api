const mongoose = require('mongoose');
const keys = require('./keys');

const MONGO_USERNAME = 'abebeconecta';
const MONGO_PASSWORD = keys.dbPassword;
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'abebeconecta';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// Connect to MongoDB
mongoose
	.connect(url, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));