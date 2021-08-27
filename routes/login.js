var router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('LoginPage', { title: 'login page in js title' });
});

module.exports = router;
