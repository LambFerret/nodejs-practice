const router = require('express').Router();

router.get('*', function (req, res, next) {
  if (req.session.passport) { var name = req.session.passport.user }
  else { var name = null }
  userconfig = {
    id: "id",
    title: "name"
  }
  next();
});

module.exports = router;