const router = require('express').Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Express',
body: 'LoginPage' });
});

module.exports = router;