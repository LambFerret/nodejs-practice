const router = require('express').Router();
const fs = require("fs")
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
const upload = multer({ storage: storage, limits: { fileSize: 3 * 1024 * 1024 } })

router.post("/",
    upload.single("image"),
    async (req, res) => {
        console.log(req.body);
        console.log(req.file);
        var id = req.body.userInfo
        var origin = req.body.origin
        var convert = req.body.convert
        var dataset = `${origin}2${convert}`
        var count = await db.getCount("UPLOADIMG", dataset, id)
        console.log(count);
        count = count[0].ctd
        var filename = `${id}_${dataset}_${count}.jpg`
        var realpaths = req.file.originalname
        console.log(filename);
        redUrl = `http://localhost:9889/convert?dataset=${dataset}&imgname=${realpaths}`
        setTimeout(()=>{
            db.insertRow("UPLOADIMG", [count, id, filename, dataset, realpaths])
            axios.get(redUrl)
        }, 1500)



    })


router.get('/', function (req, res) {
    res.send({ hi: "HI" })
});

module.exports = router;
