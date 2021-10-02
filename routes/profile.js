const router = require('express').Router();
const config = require("../lib/partial").partialConfig
const db = require("../data/mariaDBdatabase")
const axios = require('axios').default



router.get("*", (req, res, next) => {
  if (req.user) next()
  else res.redirect("/")
})

router.get('/', (req, res)=>{
  config(req, res, "userprofile")
})

router.get("/:id", async (req, res) => {
  var targetid = req.params.id
  var isUser = await db.getRow('USER', 'UserID', targetid)
  if (!(await isUser[0])) {
    config(req, res, "noprofile", { id: req.user.id })
  }
  else {
    if (targetid == req.user.id) {
    var imagesUserID = await db.getRow('UPLOADIMG', 'UserID', req.user.id)
    console.log();
      config(req, res, "userprofile", {
        beforeImgs: imagesUserID, 
        id: req.user.id, 

      })
    }
    else {
      config(req, res, "commonprofile", {
        id: targetid,
        name: req.user.id,
      })
    }
  }
})

router.post("/:id", async(req, res)=>{
  var imgsrc = req.body.before
  // redUrl = `http://localhost:9889/convert?dataset=${dataset}&imgname=${imgsrc}`



})
module.exports = router;
