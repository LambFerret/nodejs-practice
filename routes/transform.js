const router = require('express').Router();
const { rand } = require('@tensorflow/tfjs-core');
const multer = require("multer")
const upload = multer({ dest: 'images/' })
//const model = require("../lib/transformModel")
const db = require("../data/mariaDBdatabase")

var beforePic = "models/imgs/fall wallpaper4.jpg"

router.post('/', upload.single("imgArray"), (req, res) => {
    res.json(req.file)
    console.log(req.file);
    var date = new Date()
    var randn = date.getTime()
    var filename = 2
    var origin = req.body.origin;
    var convert = req.body.convert;
    var ls = [randn, origin, convert]
    db.insertRow("UploadImg", ls)

})
router.get('/', function (req, res) {
    // model.prediction(0, true, beforePic)
    //     .then((value, err) => (
    res.render('transform', {
        title: 'Transform',
        before: beforePic,
        id: req.user,
        after: beforePic,
    })
    //         ))
});

module.exports = router;
