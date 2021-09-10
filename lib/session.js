var session = require('express-session')
var FileStore = require('session-file-store')(session)

sessionConfig = session({
  secret: 'hey i am secret!',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
})

module.exports = sessionConfig