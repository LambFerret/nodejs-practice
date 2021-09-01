const router = require('express').Router();
const model = require("../lib/transformModel")
const fs = require("fs")
console.log('start')
var beforePic = "models/imgs/fall wallpaper4.jpg"

//fs.writeFile("/result.png",generated,(err)=>console.error(err))
/* GET home page. */
router.get('/', function (req, res) {
    model.prediction(0, true, beforePic)
        .then((value, err) => (
            res.render('transform', {
                title: 'Transform',
                before: beforePic,
                after: value
            })
        ))
});

module.exports = router;
