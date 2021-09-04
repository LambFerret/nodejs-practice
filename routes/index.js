var router = require('express').Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',
body: 'LoginPage' });
});

module.exports = router;
