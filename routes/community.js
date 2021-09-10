const router = require('express').Router();
const db = require("../data/mariaDBdatabase");


var date = new Date();
var day = date.toLocaleDateString()
var hour = date.getHours()
var min = date.getMinutes()

var now = `${day} ${hour}:${min}`

router.get("/", (req, res) => {
    if (!req.session.passport) res.redirect("/")

    res.render("community", {
        title: "community",
        id: req.session.passport.user,
    })
})

router.get("/create", (req, res) => {
    if (!req.session.passport) res.redirect("/")
    res.render("create",{
        title: "create",
        id: req.session.passport.user,
    })
})

router.post("/create",(req,res)=>{
    var content = req.body.content
    var type = req.body.type
    
    db.createPost(title, content)
    res.render("create",{
        title:now
    })
    //res.redirect("/community")
})

module.exports = router;
