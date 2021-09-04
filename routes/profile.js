var router = require('express').Router();

router.get('/', function(req, res) {
  res.render('userprofile', { title: 'Express' });
});

module.exports = router;
