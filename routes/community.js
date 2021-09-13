const router = require('express').Router();
const db = require("../data/mariaDBdatabase");


function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}



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
    console.log(row);
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
    var date = new Date()
    var now = dateFormat(date)
    var content = req.body.content
    var type = 'winter' //req.query.type
    var list = [content, now, type]
    db.insertRow("Posting", list)
    res.render("create",{
        title:now
    })
    //res.redirect("/community")
})

module.exports = router;
