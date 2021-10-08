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
        }).then((responseData) => {
            var convID = responseData.data.img_id
            convID = convID.split('/')[1]
            db.insertRow("CONV_IMG", [convID, filename])
        })
    })

router.get('/', (req, res) => {
    res.render('loadingImg')
});

router.get('/result', async (req, res) => {
    var id = req.user.id
    imageRows = await db.useWisely(`

                    Select a.*, b.UserID, b.realpath 
                    from CONV_IMG a left outer join UPLOADIMG b
                    on a.Up_Img_ID = b.Up_Img_Nm where UserID = '${id}'
                    order by left(Conv_Img_ID,8) desc
                    limit 1 
                    
                    `)
    var realpath = imageRows[0].realpath
    var Conv_Img_ID = imageRows[0].Conv_Img_ID
    var conv_season = Conv_Img_ID.split('_').reverse()[1].split('2')[1]
    var ori_season = Conv_Img_ID.split('_').reverse()[1].split('2')[0]
    res.render("transform", {
        realpath:realpath,
        Conv_Img_ID:Conv_Img_ID,
        ori_season:ori_season,
        conv_season:conv_season
    })
})


module.exports = router;