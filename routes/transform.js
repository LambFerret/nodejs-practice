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
        global.oriID = realpaths
        redUrl = `http://localhost:9889/convert`
        db.insertRow("UPLOADIMG", [count, id, filename, dataset, realpaths])
        await axios.get(redUrl, {
            params: {
                dataset: dataset,
                imgname: realpaths,
                imgID: filename,
            }
        }).then((responseData) => {
            var convID = responseData.data.img_id
            global.convID = convID.split('/')[1]
            db.insertRow("CONV_IMG", [convID, filename])
        })
    })

router.get('/', (req, res) => {
    res.render('loadingImg')
});

// router.get('/result', (req, res) => {
//     var convID = req.query.img_id
// })


router.get('/result', async (req, res) => {
    var id = req.user.id
    imageRows = await db.useWisely(`
                    Select a.*, b.UserID
                    from CONV_IMG a left outer join UPLOADIMG b
                    on a.Up_Img_ID = b.Up_Img_Nm where UserID = '${id}'
                    limit 1
                    `)
    console.log(oriID);
    console.log(convID);
    res.render("transform",{
        beforeImg: oriID,
        afterImg: convID,
    })
})

/*

res.render("transform", {
    afterImgs: imageRows[0],
})
*/

module.exports = router;