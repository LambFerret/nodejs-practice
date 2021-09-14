const router = require('express').Router();
const db = require("../data/mariaDBdatabase");
const config = require("../lib/partial").partialConfig

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


router.get("*", (req, res, next) => {
    if (req.user) {
        next()
        // 여기에 
        // var location = req.originalUrl.replace("/","in ")
        // res.render("footer or header",{
        //     isLoggined:true,
        //     title:location,
        //     name:req.user.name,
        // }) 
        // 이렇게 넣고싶어요 
    }
    else res.redirect("/")
})

router.get("/",(req, res)=>{config(req, res, "community")})


//  (req, res) => {
//     var location = req.originalUrl.replace("/","in ")
//         res.render("community",{
//             isLoggedIn:true,
//             title:location,
//             name:req.user.name,
//         }) 
// })

router.get("/post/:id", async (req, res) => {
    var location = req.originalUrl.replace("/","in ")

    var searchID = req.params.id
    var row = await db.getRow('Posting', 'PostID', searchID)
    var teapot = row[0]
    var content = teapot.Post_Text
    var time = teapot.Post_Time
    var type = teapot.PostBoard_Type
    res.render("post", {
        image: searchID,
        content: content,
        time: time,
        type:type,
        isLoggedIn:true,
        title:location,
        name:req.user.name,
    })
})

router.get("/create", (req, res) => {
    var location = req.originalUrl.replace("/","in ")
    res.render("create", {
        isLoggedIn:true,
        title:location,
        name:req.user.name,
    })
})

router.post("/create", (req, res) => {
    var date = new Date()
    var now = dateFormat(date)
    var content = req.body.content
    var type = 'winter' //req.query.type
    var list = [content, now, type]
    db.insertRow("Posting", list)
    res.render("create", {
        title: now
    })
    res.redirect("/community")
})

module.exports = router;
