const router = require('express').Router();

router.get('*', function (req, res, next) {
  if (req.session.passport) { 
    var name = req.session.passport.user
    var isLoggedIn = true
   }
  else { 
    var name = null
    isLoggedIn = false
   }
  userconfig = {
    id: "id",
    title: "name",
    isLoggedIn :isLoggedIn
  }
  next();
});

module.exports = router;