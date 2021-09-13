module.exports = function (app) {

    const passport = require("passport")
    const LocalStrategy = require("passport-local").Strategy
    const DB = require("../data/mariaDBdatabase")
    const crypt = require("bcrypt")


    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user.UserID);
    })
    passport.deserializeUser((id, done) => {
        console.log(id);
        done(null, id)
    })

    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pwd',
    }, (id, pwd, done) => {
        if (!id || !pwd) { return done(null, false, { message: 'All fields are required.' }); }
        DB.getConnection(function (conn) {
            conn.query("select * from USER where UserID = ?", [id]).then(async (rows) => {
                if (!rows.length) {
                    return done(null, false, { message: 'Invalid username.' });
                }
                var dbPassword = rows[0].UserPw;
                if (!await crypt.compare(pwd, dbPassword)) {
                    return done(null, false, { message: 'Invalid password.' });
                }
                return done(null, rows[0]);
            })
                .then((res) => {
                    conn.end();
                })
                .catch(err => {
                    //handle error
                    conn.end();
                    if (err) return done({ message: err });
                });
        });
    }
    ))
    return passport
}