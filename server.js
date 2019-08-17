const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const db = require('./config/db')
const keys = require('./config/keys')
const path =  require('path')
const users = require('./routes/api/users')
const projects = require('./routes/api/projects')

const app = express()

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

// Serve static assets if in production
if(proccess.env.NODE_ENV === 'production') {
  // Set a static folder
  app.user(express.static(client/build))

  app.get('*', (req, res => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  }))
}

// TODO: colocar isso em um .env
const port = process.env.PORT || 5000

app.use(express.static('public'))

app.listen(port, () => console.log(`Server running on port ${port}`))
