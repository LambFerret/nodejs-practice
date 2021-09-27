const router = require('express').Router();
const fs = require("fs")
const db = require("../data/mariaDBdatabase");
// image upload
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage, limits:{fileSize: 3*1024*1024 } })

router.get("/",(req, res)=>{
    res.render("mutl")
})

router.post("/", upload.single("image"), async (req, res) => {
    var id = 'asdfasdf'//req.body.id
    var origin = req.body.origin
    var convert = req.body.convert
    var dataset = `${origin}2${convert}`
    var filename = `${id}_${dataset}`
    // var filenumber =await db.getMaxCount()
    res.send({'asdf':'asdf'})
    console.log(req.file)
})
// --> image upload



router.get('/', function (req, res) {
    res.send({ hi: "HI" })
});

module.exports = router;
