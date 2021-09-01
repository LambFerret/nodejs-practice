const passport = require("passport")
const localStrategy = require("passport-local").Strategy


passport.use(new localStrategy({
    usernameField: 'id',
    passwordField: 'pwd'
},
    (id, password, done) => {
        var sql = 'SELECT * FROM USER WHERE ID=? AND PWD=?';
        mysql.query(sql, [id, password], (err, result) => {
            if (err) console.log("sql errored")
            if (result.length === 0) {
                console.log("no result")
                return done(null, false, { message: "incorrect" })
            } else {
                console.log(result)
                var json = JSOn.stringify(result[0])
                var userinfo = JSON.parse(json)
                console.log("userinfo : " + userinfo)
                return done(null, userinfo)
            }
        })

    }))



passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    console.log("deserializeUser id ", id)
    var userinfo;
    var sql = 'SELECT * FROM USER WHERE ID=?';
    mysql.query(sql , [id], function (err, result) {
      if(err) console.log('mysql 에러');     
     
      console.log("deserializeUser mysql result : " , result);
      var json = JSON.stringify(result[0]);
      userinfo = JSON.parse(json);
      done(null, userinfo);
    })    
});

module.exports = passport;
