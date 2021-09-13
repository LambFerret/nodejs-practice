const router = require('express').Router();
const multer = require("multer")
const upload = multer({dest:'images/'})
//const model = require("../lib/transformModel")

var beforePic = "models/imgs/fall wallpaper4.jpg"

router.post('/',upload.single("imgArray"),(req, res)=>{
    res.json(req.file)
    console.log(req.file);

})
router.get('/', function (req, res) {
    if (!req.session.passport) res.redirect("/")
    // model.prediction(0, true, beforePic)
    //     .then((value, err) => (
            res.render('transform', {
                title: 'Transform',
                before: beforePic,
    id : req.session.passport.user,
    after: beforePic,
            })
//         ))
});

module.exports = router;
