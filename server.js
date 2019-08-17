const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const db = require('./config/db')
const firebase = require('firebase')
const keys = require('./config/keys')
const users = require('./routes/api/users')
const projects = require('./routes/api/projects')

const app = express()

const firebaseConfig = {
  apiKey: keys.firebase.apiKey,
  authDomain: keys.firebase.authDomain,
  databaseURL: keys.firebase.databaseURL,
  projectId: keys.firebase.projectId,
  storageBucket: keys.firebase.storageBucket,
  messagingSenderId: keys.firebase.messagingSenderId,
  appId: keys.firebase.appId
}

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB Config - Atlas MongoDb
// const db = require('./config/keys').mongoURI;
// // Connect to MongoDB - Atlas MongoDb
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use Routes
app.use('/api/users', users)
app.use('/api/projects', projects)

// TODO: colocar isso em um .env
const port = process.env.PORT || 5000

app.use(express.static('public'))
firebase.initializeApp(firebaseConfig)

app.listen(port, () => console.log(`Server running on port ${port}`))
