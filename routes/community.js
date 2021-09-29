const router = require('express').Router();
const db = require("../data/mariaDBdatabase");
const config = require("../lib/partial").partialConfig
const { request } = require("graphql-request")
const endpoint = "http://localhost:8001/graphql"

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
    // var page = req.params.page
    query = `{POSTING {
        PostID
        Post_Text
        Post_Time
        Post_Type
        UserID
        View_Count
        Like_Count
        Comment_Count
      }}`
    rows = await request(endpoint, query)
    // like = await db.getMaxCount("POSTLIKE", searchID)
    // comment = await db.getMaxCount("COMMENT", searchID)
    var teapot = rows.POSTING
    config(req, res, "community", { 
        data: teapot,
     })
})

router.get("/post/:id", async (req, res) => {
    var isOwner
    var isLiked
    var searchID = req.params.id
    var currentUser = req.user.id
    var someLike = await db.useWisely(`select * from POSTLIKE where PostID='${searchID}' and UserID='${currentUser}' `)
    someLike = someLike[0]
    console.log(someLike);
    console.log("hi");
    if (someLike) {isLiked=true} else {isLiked=false}
    var like = await db.getMaxCount("POSTLIKE", searchID)
    try {like = like[0].commentCount}
    catch {like = 0}
    var comment = await db.useWisely(`SELECT * FROM COMMENT WHERE PostID='${searchID}' ORDER BY Comment_ID DESC`)
    var row = await db.getRow('POSTING', 'PostID', searchID)
    db.useWisely(`update POSTING set View_Count=View_Count+1 where PostID="${searchID}"`)
    var teapot = row[0]
    console.log(teapot);
    if (teapot.UserID == currentUser) {isOwner = true} else { isOwner = false}
    ls = {
        isLiked : isLiked,
        number: searchID,
        comment: comment,
        like: like,
        teapot: teapot,
        isOwner:isOwner,
        user:currentUser,
    }
    config(req, res, "post", ls)
})

router.post("/post/:id", (req, res) => {
    var selfuser = req.user.id
    var postid = req.params.id
    var text = req.body.comment
    var ls = [null, selfuser, postid, text]
    db.insertRow("COMMENT", ls)
    res.redirect(`/community/post/${postid}`)
})

router.get("/create", async (req, res) => {
    var imagesUserID = await db.getRow('UPLOADIMG', 'UserID', req.user.id)
    ls = {
        image:imagesUserID,
    }
    config(req, res, "create", ls)
})

router.post("/create", (req, res) => {
    var date = new Date()
    var now = dateFormat(date)
    var postid = "testtest"//req.body.Pictureid
    var content = req.body.content
    var user = req.user.id
    var type = "winter" //postid.split("2")[1].split('_')[0]
    console.log(type);
    db.insertRow("POSTING", [postid, content, now, type, user, 0, null])
    res.redirect("/community/page/1")
})



module.exports = router;