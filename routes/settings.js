const router = require('express').Router();
const config = require("../lib/partial").partialConfig


router.get('/', (req, res)=>{
    config(req, res, "settings")
})
module.exports = router;

