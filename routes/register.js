const express = require('express');
const app = express()
const router = express.Router()
const User = require("../data/users")
const mdb = require("../data/mongodatabase");
const sql = require("../data/mysqldatabase");


router.get('/', function (req, res) {
  res.render('register', { title: 'this is register form' });
});

router.post('/', (req, res) => {
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
  var id = req.body.id
  var email = req.body.email
  var password = req.body.pwd

  sql.register(id, email, password)


  //this is mongoDB insert
  /*
  const collection = mdb.db("thisisnewname").collection("user")
  collection.insertOne({
    id: id,
    email: email,
    password: password,
  }).then(res.redirect("/login"))
  */
})

module.exports = router;
