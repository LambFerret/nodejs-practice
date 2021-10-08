const router = require('express').Router();
const config = require("../lib/partial").partialConfig
const db = require("../data/mariaDBdatabase")

router.get("/", (req, res) => config(req, res, "index", {}, true))

router.get("/logout", (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get("/admin", async (req, res) => {
  var queryss = `

  select * from USER
  
  ;`
  

  rows = await db.useWisely(queryss)
  res.send(JSON.stringify(rows, null, /\n/))
})

module.exports = router;
