const express = require('express');
const passport = require('passport');
const app = express()
const router = express.Router()
const User = require("../data/users")

router.get('/', function(req, res, next) {
  res.render('register', { title: 'this is register form' });
});

app.post('/',(req, res)=>{
    User.register(new User({
      id:req.body.id,
      email:req.body.email,
    }), req.body.password, (err,user)=>{
      if(err){
        console.log(err);
        res.render("register")
      }
      passport.authenticate("local")(req,res,()=>{
        res.redirect("/login")
      })
    })
})
 
module.exports = router;
