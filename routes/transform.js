const router = require('express').Router();
//const model = require("../lib/transformModel")

var beforePic = "models/imgs/fall wallpaper4.jpg"


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
