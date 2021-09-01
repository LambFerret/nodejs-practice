var express =require('express')
const cookieParser = require("cookie-parser")
const router = express.Router();

router.use(express.urlencoded({extended:false}))
router.use(cookieParser())