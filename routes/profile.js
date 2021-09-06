const router = require('express').Router();
const db = require("../data/mariaDBdatabase");

router.get('/', function(req, res) {

  r = db.IDcheck("tettest")
  console.log( r + "   ---------");

  res.render("userprofile",{id:'result'})

  //res.render('userprofile', { title: 'Express' });
});

module.exports = router;
