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
