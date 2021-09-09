module.exports = function (app) {

    const passport = require("passport")
    const LocalStrategy = require("passport-local").Strategy
    const DB = require("../data/mariaDBdatabase")

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        console.log("here.. we serialize you : user.." + user);
        done(null, user.id);
    })
    passport.deserializeUser((id, done) => {
        console.log(`hey! ${user} are back! with deserialize!`);
        done(null, user)
    })


    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pwd',
    }, (id, pwd, done) => {
        console.log(`here! you can see ... ${id}, ${pwd}`);
        if (!id || !pwd) { return done(null, false, { message: 'All fields are required.' }); }
        DB.getConnection(function (conn) {
            console.log('conn = ' + conn);
            conn.query("select * from USER where UserID = ?", [id]).then((rows) => {
                console.log("rows are... : "+rows);
                if (!rows.length) {
                    return done(null, false, { message: 'Invalid username.' });
                }
                var dbPassword = rows[0].password;
                if (!(dbPassword == password)) {
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
                    if (err) return done(req.flash('message', err));
                });
        });
    }

    ))
    return passport

}