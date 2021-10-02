const router = require('express').Router();
const config = require("../lib/partial").partialConfig
const db = require("../data/mariaDBdatabase");
const axios = require('axios').default
const fetch = require("node-fetch")
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'webpy/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } })

router.post("/",
    upload.single("image"),
    async (req, res) => {
        var id = req.body.userInfo
        var origin = req.body.origin
        var convert = req.body.convert
        var dataset = `${origin}2${convert}`
        dataset = dataset.toLowerCase()
        var count = await db.getCount("UPLOADIMG", dataset, id)
        var date = new Date()
        var now = date.getTime()

        count = count[0].ctd
        var filename = `${id}_${dataset}_${count}.jpg`
        var realpaths = req.file.originalname.split('.')[0]
        redUrl = `http://localhost:9889/convert?dataset=${dataset}&imgname=${realpaths}`
        setTimeout(()=>{
            db.insertRow("UPLOADIMG", [count, id, filename, dataset, realpaths])
            db.insertRow("CONV_IMG", [now+filename,filename])
            await axios.get(redUrl)
            .then((v)=>{
                console.log(v);
            })
            config(req, res, "transform", {
                imgpath:"/webpy/converts/"+realpaths
            })
        }, 1500)



    })


router.get('/', function (req, res) {
    res.render('transform')
});
// http://localhost:9889/convert?dataset=Spring2Autumn&imgname=cropped357621109953827379
module.exports = router;
