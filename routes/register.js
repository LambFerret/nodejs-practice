const express = require('express');
const passport = require('passport');
const app = express()
const router = express.Router()
const User = require("../data/users")
const mdb = require("../data/mongodatabase");
const { collection } = require('../data/users');
router.get('/', function(req, res, next) {
  res.render('register', { title: 'this is register form' });
});

router.post('/',(req, res)=>{
  /*
    User.register(new User({
      id:req.body.id,
      email:req.body.email,
    }), req.body.password, (err,user)=>{
      if(err){
        res.render("register")
        return console.log(err);
      }
      passport.authenticate("local")(req,res,()=>{
        res.redirect("/login")
      })
    })

    db.createCollection("students", {
   validator: {
      $jsonSchema: {
          bsonType: "object",
          required: [ "name", "year", "major", "gpa", "address.city", "address.street" ],        
                    }
               }
     })
     
    */

    const collection = mdb.db("thisisnewname").collection("user")

    collection.insertOne({
      id:req.body.id,
      email:req.body.email,
      password:req.body.pwd,
  })
  .then(
    res.redirect("/login")
  )
    

})
 
module.exports = router;
