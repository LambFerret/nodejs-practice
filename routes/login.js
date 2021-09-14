const { serializeUser } = require('passport');

module.exports = function (passport) {
  const router = require('express').Router();

  router.get("*", (req, res, next)=>{
    if (req.user) {res.redirect("/")}
    else next()
  })

  router.get('/', async function (req, res) {
    message = await req.flash("error")
    res.render('LoginPage', {
      isEmpty: true,
      title: 'login page',
      message: message
    });
  });

  router.post('/process',
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true,
    })
  )

  
  return router;
}

// http://34.64.143.233:8080/
// id : adminad
// pwd : admin