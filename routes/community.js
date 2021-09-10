const router = require('express').Router();
const db = require("../data/mariaDBdatabase");

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
    var title = req.body.title
    var content = req.body.content

    db.createPost(title, content)
    res.render("create",{
        title:req.body.title
    })
    //res.redirect("/community")
})

module.exports = router;
