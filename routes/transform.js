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
        res.render("loadingImg")
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
        console.log(" 1 axios.get( ..... ");
        await axios.get(redUrl, {
            params: {
                dataset: dataset,
                imgname: realpaths,
                imgID: filename,
            }
        })
            .then((v) => {
                console.log("2  axios.get( ..... ");
                var convID = v.data.img_id
                db.insertRow("CONV_IMG", [convID.split('/')[1], filename])
                res.render("loading")
            }).then(async (v) => {
                console.log('3 axios');
                imageRows = await db.useWisely(`
                Select a.*, b.UserID
                from CONV_IMG a left outer join UPLOADIMG b
                on a.Up_Img_ID = b.Up_Img_Nm where UserID = '${id}'
                limit 1
                `)
                res.redirect('/transform/result')

            })
    })
// 위에 axios가 동기적으로 페이지 오픈하도록

// 쿼리문에 limit 1 이 최신꺼가 뜨던지 아니면 

router.get('/', (req, res) => {
    res.render('loadingImg')

});

router.get('/result', (req, res)=>{
    res.send("get")
})
router.get('/result', (req, res)=>{
    res.send("post")

})

    /*
    imageRows = await db.useWisely(`
    Select a.*, b.UserID
    from CONV_IMG a left outer join UPLOADIMG b
    on a.Up_Img_ID = b.Up_Img_Nm where UserID = '${req.user.id}'
    limit 1
    `)
    console.log(imageRows[0]);
    res.render("transform", {
        afterImgs: imageRows[0],
    })
    */

module.exports = router;