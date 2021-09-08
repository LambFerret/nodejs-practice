const router = require('express').Router();
const passport = require("../lib/pass")


// router.use(passport.initialize())
// router.use(passport.session())

router.get('/', function (req, res) {
  res.render('LoginPage', { title: 'login page' });
});

router.post('/', (req, res) => {
  passport.authenticate(
    'local',
    {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: false
    }
  )
})

module.exports = router;

// http://34.64.143.233:8080/
// id : adminad
// pwd : admin