/*
var router = require('express').Router();
const pass = require("../data/pass")
const passport = require("passport")


router.get('/', function(req, res) {
  res.render('LoginPage', { title: 'login page in js title' });
});

router.post('/', function(req, res){
  passport.authenticate("local", (authError, user, info) => {
    return req.login(user, err => {
      if (err) {
        console.error(err);
      }
    });
  })(req, res);

  res.redirect("/success");

})

module.exports = router;
*/


const localStrategy = require("passport-local").Strategy;

module.exports = passport => {
  passport.use(
    new localStrategy(
      {
        usernameField: "id",
        passwordField: "pw"
      },
      (id, pw, done) => {
        const user = {
          id: "whwlsvy12",
          pw: "1234"
        };

        if (id === user.id && pw === user.pw) {
          done(null, user);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id); //  user.id가 session(req.session.passport.user)에 저장됨
  });

  // 메모리에 한번만 저장
  passport.deserializeUser((id, done) => {
    // 매개변수 id는 req.session.passport.user에 저장된 값

    done(null, id); // req.user에 idr값 저장
  });
};