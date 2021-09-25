const router = require('express').Router();
const config = require("../lib/partial").partialConfig
const db = require("../data/mariaDBdatabase")

router.get('/convert',async (req, res)=>{
    username = req.query.user
    dataset = req.query.dataset
    result = await db.useWisely(`select Up_Img_ID from UPLOADIMG where UserID='${username}'`)
    res.send({"result":result})
})



module.exports = router;