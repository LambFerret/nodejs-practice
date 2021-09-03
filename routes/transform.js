const router = require('express').Router();
const model = require("../lib/transformModel")
const spawn = require("child_process").spawn

var beforePic = "models/imgs/fall wallpaper4.jpg"

router.get('/', function (req, res) {
    model.prediction(0, true, beforePic)
        .then((value, err) => (
            res.render('transform', {
                title: 'Transform',
                before: beforePic,
                after: value,
            })
        ))
});

module.exports = router;
