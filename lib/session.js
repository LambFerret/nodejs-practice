var session = require('express-session')
// var FileStore = require('session-file-store')(session)

// sessionConfig = session({
//   secret: 'hey i am secret!',
//   resave: false,
//   saveUninitialized: true,
//   store: new FileStore()
// })
var FileStore = require("express-mysql-session")(session)
var options = {
  host: '34.64.143.233',
  port: 3306,
  user: 'jiha',
  password: 'qkrwlgk0102!',
  database: 'mysql',
};
var sessionstore = new FileStore(options)
sessionConfig = session({
  secret: 'hey i am secret!',
  resave: false,
  saveUninitialized: true,
  store: sessionstore
})
module.exports = sessionConfig