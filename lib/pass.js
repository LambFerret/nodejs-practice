module.exports = function (app) {

    const passport = require("passport")
    const LocalStrategy = require("passport-local").Strategy
    const DB = require("../data/mariaDBdatabase")
    const crypt = require("bcrypt")


    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        console.log("here.. we serialize you : user.." + user);
        console.log(user);
        done(null, user.UserID);
    })
    passport.deserializeUser((id, done) => {
        console.log(`hey! ${id} are back! with deserialize!`);
        console.log(id);

        done(null, id)
    })


    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pwd',
    }, (id, pwd, done) => {
        console.log(`here! you can see ... ${id}, ${pwd}`);
        if (!id || !pwd) { return done(null, false, { message: 'All fields are required.' }); }
        DB.getConnection(function (conn) {
            console.log('conn = ' + conn);
            conn.query("select * from USER where UserID = ?", [id]).then(async(rows) => {
                console.log(rows[0]);
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
                    console.log('res = ' + res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
                    conn.end();
                })
                .catch(err => {
                    //handle error
                    console.log(err);
                    conn.end();
                    if (err) return done({ message: err });
                });
        });
    }

    ))
    return passport

}