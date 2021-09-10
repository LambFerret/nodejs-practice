const router = require('express').Router();

router.get('/', function (req, res) {
  var name = null
  if(req.session.passport) {name = req.session.passport.user}
  res.render('index', {
    title: 'Express',
    id: name,
  });
});

module.exports = router;