const router = require('express').Router();
const info = require("../data/DBinfo.json")

router.get('/', function(req, res) {

// 2011-08-21 04:41:09

  // if (!req.session.passport) res.redirect("/")
  res.render('userprofile', { 
    title: hi,
    // id : req.session.passport.user,
   });
});

router.post('/',(req, res)=>{
  res.render("userprofile", {
    id:req.body.id
  })
})

module.exports = router;
