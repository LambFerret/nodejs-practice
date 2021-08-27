const express = require('express')
const app = express()
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'this is register form' });
});

app.use(express.urlencoded({ extended: false}))
app.post('/process-contact',(req, res)=>{
    console.log(`-------------received ${req.body.name}`)
    res.send('hi')
})
module.exports = router;
