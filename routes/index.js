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

  Select a.*, b.UserID, b.realpath
from CONV_IMG a left outer join UPLOADIMG b
on a.Up_Img_ID = b.Up_Img_Nm where UserID = 'asdfasdf'
order by left(Conv_Img_ID,8) asc
limit 1;
  
  ;`
  

  rows = await db.useWisely(queryss)
  res.send(JSON.stringify(rows, null, /\n/))
})

module.exports = router;
