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
    if (req.user) next()
    else res.redirect("/")
})

router.get("/page/:page", async (req, res) => {
    var page = req.params.page
    rows = await db.getRows("Posting", "PostID", page, 10)
    console.log(rows[0]);
    var teapot = rows[0]
    console.log(rows[0]);
    ls = {
        data:rows, 
        userid : "유저아이디",
        look :5,
        like : 1,
        comment:1,
    }
    config(req, res, "community", ls)
})

router.get("/post/:id", async (req, res) => {
    var searchID = req.params.id
    var row = await db.getRow('Posting', 'PostID', searchID)
    var teapot = row[0]
    ls = {
        image: searchID,
        content: teapot.Post_Text,
        time: teapot.Post_Time,
        type: teapot.PostBoard_Type,
    }
    config(req, res, "post", ls)
})

router.get("/create", (req, res) => config(req, res, "create"))

router.post("/create", (req, res) => {
    var date = new Date()
    var now = dateFormat(date)
    var content = req.body.content
    var Postnumber = 1
    var type = 'winter' //req.query.type
    var list = [Postnumber, content, now, type]
    db.insertRow("UploadImg", [2,'asdfasdf','sampleimgName22'])
    
    //db.insertRow("Posting", list)
    res.redirect("/community/post/"+Postnumber)
})

module.exports = router;
