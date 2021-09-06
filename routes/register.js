const express = require("express")
const router = express.Router()
const crypt = require("bcrypt")
const db = require("../data/mariaDBdatabase");
/*
//mongoDB Import
const mdb = require("../data/mongodatabase");
const User = require("../data/users")
*/

router.get('/', function (req, res) {
  res.render('register', { title: 'this is register form' });
});

router.post('/', (req, res) => {

  var id = req.body.id
  var email = req.body.email
  var name = req.body.name
  var password = crypt.hashSync(req.body.pwd, 5)

  //maria db insert
  db.register(id, name, password, email)
  
  //res.redirect("/login")
  /*
  //this is mongoDB insert
  const collection = mdb.db("thisisnewname").collection("user")
  collection.insertOne({
    id: id,
    email: email,
    password: password,
  }).then(res.redirect("/login"))
  */
})

module.exports = router;
