const router = require('express').Router();
const db = require("../data/mariaDBdatabase");
const config = require("../lib/partial").partialConfig
const { request } = require("graphql-request")
const endpoint = "http://localhost:8001/graphql"

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
    if (someLike[0]) {isLiked=true} else {isLiked=false}
    var like = await db.getMaxCount("POSTLIKE", searchID)
    try {like = like[0].commentCount} catch {like = 0}
    var comment = await db.useWisely(`SELECT * FROM COMMENT WHERE PostID='${searchID}' ORDER BY Comment_ID ASC`)
    var row = await db.getRow('POSTING', 'PostID', searchID)
    db.useWisely(`update POSTING set View_Count=View_Count+1 where PostID="${searchID}"`)
    var teapot = row[0]
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
    imagesUserID = await db.useWisely(`
                Select a.*, b.UserID
                from CONV_IMG a left outer join UPLOADIMG b
                on a.Up_Img_ID = b.Up_Img_Nm where UserID = '${req.user.id}'
                `)  
    ls = {
        image:imagesUserID,
    }
    config(req, res, "create", ls)
})

router.post("/create", (req, res) => {
    var postid = req.body.Pictureid
    var content = req.body.content
    var user = req.user.id
    var type = postid.split('_')[1].split('2')[1]
    db.insertRow("POSTING", [postid, content, null, type, user, 0])
    res.redirect("/community/page/1")
})

router.post('/create/check',async (req, res)=>{
    try{
        var PostID = req.body.Pictureid
        count = await db.getRow("POSTING", "PostID", PostID)
        res.json(count[0].PostID);
    }catch (e) {
        if (e.name == "TypeError") {
            res.send("error")
        }
    }
})

module.exports = router;