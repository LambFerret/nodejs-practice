const router = require('express').Router();
const fs = require("fs")
const db = require("../data/mariaDBdatabase");
const axios = require('axios')
const fetch = require("node-fetch")
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage, limits: { fileSize: 3 * 1024 * 1024 } })

router.get("/", async (req, res) => {
    var count = await db.getCount("UPLOADIMG", "dataset", "id")
    console.log(count[0].ctd);
})

router.post("/",
    upload.single("image"),
    async (req, res) => {
        console.log(req.body);
        console.log(req.file);
        var id = "asdfasdf"//req.body.userInfo
        var origin = req.body.origin
        var convert = req.body.convert
        var dataset = `${origin}2${convert}`
        var count = await db.getCount("UPLOADIMG", dataset, id)
        var filename = `${id}_${dataset}_${count[0].ctd}.jpg`
        var realpaths = req.file.originalname
        try{
            db.insertRow("UPLOADIMG", [count, id, filename, dataset, realpaths])
            fetch(`http://localhost:9889/convert?dataset=${dataset}&imgname=${realpaths}`, { method: "get" })
        } catch (e) {if (e) console.log(e);}
    })


router.get('/', function (req, res) {
    res.send({ hi: "HI" })
});

module.exports = router;
