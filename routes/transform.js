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
const upload = multer({ storage: storage })

router.post("/", upload.single("image"), (req, res) => {
  var id = 'asdfasdf'//req.body.id
  var origin = req.body.origin
  var convert = req.body.convert
  console.log(req.file)
})
// --> image upload



router.get('/', function (req, res) {
    res.send({hi:"HI"})
});

module.exports = router;
