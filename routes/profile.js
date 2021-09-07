const router = require('express').Router();
const db = require("../data/mariaDBdatabase");

router.get('/', function(req, res) {
  db.IDcheck("testtest").then(val=>{
    res.render("userprofile",{id:val})
  })
  //res.render('userprofile', { title: 'Express' });
});

module.exports = router;
