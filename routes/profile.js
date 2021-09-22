const router = require('express').Router();
const config = require("../lib/partial").partialConfig
const db = require("../data/mariaDBdatabase")


router.get("*", (req, res, next) => {
  if (req.user) next()
  else res.redirect("/")
})

router.get("/:id", async (req, res) => {
  var targetid = req.params.id
  var isUser = await db.getRow('USER', 'UserID', targetid)
  if (!(await isUser[0])) {
    config(req, res, "noprofile", { id: req.user.id })
  }
  else {
    if (targetid == req.user.id) {
      config(req, res, "userprofile", { id: req.user.id })
    }
    else {
      config(req, res, "commonprofile", {
        id: targetid,
        master: targetid
      })
    }
  }
})

module.exports = router;
