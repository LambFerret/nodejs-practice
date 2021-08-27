var router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'this is register form' });
});

module.exports = router;
