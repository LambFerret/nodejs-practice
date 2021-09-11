const router = require('express').Router();
const db = require("../data/mariaDBdatabase");


var date = new Date();
var day = date.toLocaleDateString()
var hour = date.getHours()
var min = date.getMinutes()

var now = `${day} ${hour}:${min}`

// router.get("*",(req,res,next)=>{
//   if (!req.session.passport) res.redirect("/")
//     else next()
// })

router.get("/", (req, res) => {
    res.render("community", {
        title: "community",
        //id: req.session.passport.user,
    })
})

router.get("/post/:id", async (req, res)=>{
    var searchID = req.params.id
    var row = await db.getRow('Posting','PostID',searchID)
    res.render("post",{
        image:searchID,
        content:'content',
    })
})

router.get("/create", (req, res) => {
    res.render("create",{
        title: "create",
        //id: req.session.passport.user,
    })
})

router.post("/create",(req,res)=>{
    var content = req.body.content
    var type = 'winter' //req.query.type
    var list = [PostID, content, now, type]
    db.insertRow("Posting", list)
    res.render("create",{
        title:now
    })
    //res.redirect("/community")
})

module.exports = router;
