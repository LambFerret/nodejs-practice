const router = require('express').Router();
const fs = require("fs")
//const model = require("../lib/transformModel")
const db = require("../data/mariaDBdatabase")

var beforePic = "models/imgs/fall wallpaper4.jpg"

router.post('/', (req, res) => {
    var date = new Date()
    var now = date.getTime()
    var imgArray = req.body.imgArray;
    var file = `public/images/${now}.txt`
    console.log(file);
    fs.writeFile(file,imgArray, 'utf-8',(err,fd)=>{
        if (err) throw err;
        console.log(file+"위치 확인 바람");
    })
    var origin = req.body.origin;
    var convert = req.body.convert;
    console.log(origin + convert);

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
