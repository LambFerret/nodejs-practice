const router = require('express').Router();
const config = require("../lib/partial").partialConfig
const db = require("../data/mariaDBdatabase");
const axios = require('axios').default
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
        count = count[0].ctd
        var filename = `${id}_${dataset}_${count}.jpg`
        var realpaths = req.file.originalname.split('.')[0]
        redUrl = `http://localhost:9889/convert`
        db.insertRow("UPLOADIMG", [count, id, filename, dataset, realpaths])
        await axios.get(redUrl, {
            params: {
                dataset: dataset,
                imgname: realpaths,
                imgID: filename,
            }
        })
            .then(async (v) => {
                var convID = v.data.img_id
                db.insertRow("CONV_IMG", [convID.split('/')[1], filename])
                imageRows = await db.useWisely(`select Conv_Img_ID,Up_Img_ID,UserID  from CONV_IMG conv left join (select UserID, Up_Img_ID as id_a from UPLOADIMG) ori on conv.Up_Img_ID = ori.id_a where UserID = '${req.user.id}' group by Up_Img_ID`)
                config(req, res, "transform", {
                    imgpath: "/webpy/converts/" + v.data.img_id,
                    afterImgs: imageRows[0],
                })
            })
    })


router.get('/', async (req, res) =>{
    imageRows = await db.useWisely(`select Conv_Img_ID,Up_Img_ID,UserID from CONV_IMG conv left join (select UserID, Up_Img_ID as id_a from UPLOADIMG) ori on conv.Up_Img_ID = ori.id_a where UserID = '${req.user.id}' group by Up_Img_ID`)
    console.log(imageRows[1]);
    config(req, res, "transform", {
        imgpath: "/webpy/converts/",
        afterImgs: imageRows,
    })
});
module.exports = router;
