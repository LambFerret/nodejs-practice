var router = require('express').Router();
const passport =  require("passport")

router.get('/', function(req, res) {
  res.render('LoginPage', { title: 'login page in js title' });
});
router.post('/', passport.authenticate("local",{
  successRedirect:"/userprofile",
  failureRedirect:"/login"
}), (req,res)=>{
  console.log("something?")
})

module.exports = router;
