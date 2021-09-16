const router = require('express').Router();
const config = require("../lib/partial").partialConfig
const db = require("../data/mariaDBdatabase")
const fs = require("fs")

router.get("*", (req, res, next) => {
  if (req.user) next()
  else res.redirect("/")
})

router.get("/", async (req, res) => {
  //rows = await db.getRows("Conv_Info","Conv_ID")
  config(req, res, "userprofile", { id: req.user.id })
})
router.get("/admin", async (req, res) => {
  rows = await db.useWisely(`
  
  show table status
  
  `)
  // insert into Posting values (2,"test2","2021-09-13 06:30:23","summer");

  // rows.forEach(element => {
  //   console.log(element);
  //   console.log("\n");
  // });
  var file = `public/images/1234321.json`

  console.log(rows);
  fs.writeFile(file, JSON.stringify(rows), 'utf-8', (err, fd) => {
    if (err) throw err;
  })
  res.render("admin", {
    data: rows,
  })
})
module.exports = router;
