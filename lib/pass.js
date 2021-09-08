const session = require("../lib/session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

// check it again later
passport.session(session)

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