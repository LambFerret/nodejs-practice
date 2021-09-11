const router = require('express').Router();
const info = require("../data/DBinfo.json")

router.get('/', function(req, res) {
  // if (!req.session.passport) res.redirect("/")
  console.log(info.USER.toString());
  res.render('userprofile', { 
    
    title: "Profile",
    // id : req.session.passport.user,
   });
});

module.exports = router;
