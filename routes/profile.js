const router = require('express').Router();


router.get('/', function(req, res) {
  //  req.session.views = {"this":'is'}
  res.render('userprofile', { title: req.session });
});

module.exports = router;
