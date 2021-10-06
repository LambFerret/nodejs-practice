const router = require('express').Router();
const db = require("../data/mariaDBdatabase")


router.delete('/member', (req, res) => {
    username = req.query.user
    if (username == req.user.id) {
        db.deleteRow('USER', 'UserID', username)
    }
    req.session.destroy()
})

router.get('/post/delete', async (req, res) => {
    username = req.query.user
    postID = req.query.postid
    if (username == req.user.id) {
        db.deleteRow('COMMENT', "postID", postID)
        db.deleteRow('POSTLIKE', "postID", postID)
    }
    if (username == req.user.id) db.deleteRow('POSTING', "postID", postID)
    res.redirect("/")
})

router.get("/post/like", async (req, res) => {
    var username = req.query.user
    var postID = req.query.postid
    var someLike = await db.useWisely(`select * from POSTLIKE where PostID='${postID}' and UserID='${username}' `)
    someLike = someLike[0]
    if (someLike) {
        db.useWisely(`delete from POSTLIKE where PostID='${postID}' and UserID="${username}"`)
        res.send(true)
    }
    else {
        db.insertRow("POSTLIKE", [null, username, postID])
        res.send(false)
    }
})

module.exports = router;
