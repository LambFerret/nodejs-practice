const passport = require("passport")
const localStrategy = require("passport-local").Strategy


passport.use(new localStrategy({
    usernameField: "id",
    passwordField: "pwd"
},
    (id, password, done) => {
        const user = {
            id: "id????@123",
            password: "password???"
        };
        if (id === user.id && password === user.password) {
            done(null, user);
        }
    }))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    done(null, id)
})

module.exports = passport;
