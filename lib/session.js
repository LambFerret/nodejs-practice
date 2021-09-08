const session = require("express-session")
const store = require("express-mysql-session")(session)

session({
  secret: "hey!ImjustSecret",
  resave: false,
  saveUninitialized: true,
  store: new store({
      host: '34.64.143.233',
      port: '3306',
      user: 'jiha',
      password: 'qkrwlgk0102!',
      database: 'mysql',
  })
})

module.exports = session