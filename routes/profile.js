var router = require('express').Router();
const db = require("../data/mysqldatabase")
/* GET home page. */
router.get('/', function(req, res) {
  res.render('userprofile', { title: 'Express' });
  db.register('123','3234234','123123@123','3123')
});

module.exports = router;
