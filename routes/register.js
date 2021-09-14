const express = require("express")
const router = express.Router()
const crypt = require("bcrypt")
const db = require("../data/mariaDBdatabase");
const config = require("../lib/partial").partialConfig

/*
//mongoDB Import
const mdb = require("../data/mongodatabase");
const User = require("../data/users")
*/
router.get("*", (req, res, next)=>{
  if (req.user) {res.redirect("/")}
  else next()
})

router.get("/",(req, res)=> config(req, res, "register",{isEmpty:true}, true) )

router.post('/', (req, res) => {
  var id = req.body.id
  var email = req.body.email
  var name = req.body.name
  var password = crypt.hashSync(req.body.pwd, 5)
  var list = [id, name, password, email]
  //maria db insert
  db.insertRow("USER", list)
  res.redirect("/login")

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

router.post("/idcheck", async (req, res) => {
  res.json(await db.getRow("USER","UserID",req.body.id))
})

module.exports = router;
