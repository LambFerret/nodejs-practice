const router = require('express').Router();
const config = require("../lib/partial").partialConfig

router.get("*", (req, res, next) => {
  if (req.user) next()
  else res.redirect("/")
})

router.get("/",(req, res)=> config(req, res, "userprofile", {id:req.user.id}) )

module.exports = router;
