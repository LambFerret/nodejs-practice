const router = require('express').Router();
const config = require("../lib/partial").partialConfig
const db = require("../data/mariaDBdatabase")

router.get('/convert', async (req, res) => {
    username = req.query.user
    dataset = req.query.dataset
    result = await db.useWisely(`select Up_Img_ID from UPLOADIMG where UserID='${username}'`)
    res.send({ "result": result })
})

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

module.exports = router;
