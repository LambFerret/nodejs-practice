const router = require('express').Router();
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy


passport.use(new LocalStrategy((id, pwd, done)=>{
  ;
}))
router.use(passport.initialize())
router.use(passport.session())

router.get('/', function (req, res) {
  res.render('LoginPage', { title: 'login page in js title' });
});

router.post('/', (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  })
})

module.exports = router;