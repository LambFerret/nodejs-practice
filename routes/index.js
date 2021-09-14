const router = require('express').Router();
const config = require("../lib/partial").partialConfig


router.get("/",(req, res)=> config(req, res, "index",{}, true) )

router.get("/logout", (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;