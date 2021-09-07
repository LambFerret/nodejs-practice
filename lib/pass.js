const router = require('express').Router();
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const session = require("express-session")
const store = require("express-mysql-session")(session)

router.use(session({
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
}))

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pwd',
},
    (username, password, done) => {
        console.log("LocalsT" + username + password);
        return done(null, false)
    }
))

passport.serializeUser((user, done) => {
    console.log("here.. we serialize you");
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    console.log(`hey! ${id} are back! with deserialize!`);
    done(null, { id: id, nickname: "test" })
})

module.exports = passport