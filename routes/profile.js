const router = require('express').Router();
const info = require("../data/DBinfo.json")

router.get('/', function(req, res) {

// 2011-08-21 04:41:09

  // if (!req.session.passport) res.redirect("/")
  res.render('userprofile', { 
    id : req.session.passport.user,
   });
   console.log(req.session);
});

router.post('/',(req, res)=>{
  res.render("userprofile", {
    origin:req.body.origin,
    convert:req.body.convert,
    image:req.body.imgArray,
  })
  var qwerqwer = req.body.imgArray
})

module.exports = router;
