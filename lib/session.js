var session = require('express-session')
var FileStore = require("express-mysql-session")(session)
var secrets = require('../data/poolConfig')

var sessionstore = new FileStore(secrets.waypoint)
sessionConfig = session({
  secret: secrets.sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: sessionstore
})
module.exports = sessionConfig