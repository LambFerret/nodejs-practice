const router = require('express').Router();

router.get('/', function(req, res) {
  //  req.session.views = {"this":'is'}
  if (!req.session.passport) res.redirect("/")
  
  res.render('userprofile', { 
    title: "Profile",
    id : req.session.passport.user,
   });
});

module.exports = router;
