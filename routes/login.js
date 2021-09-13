module.exports = function (passport) {
  const router = require('express').Router();


  router.get('/', function (req, res) {
    res.render('LoginPage', {
      title: 'login page',
      message: req.flash("error")
    });
  });

  router.post('/process',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    })
  )

  router.get("/logout", (req, res) => {
    req.session.destroy()
    console.log("!!LOGOUT!!");
    res.redirect('/')
  })
  return router;
}

// http://34.64.143.233:8080/
// id : adminad
// pwd : admin