const router = require('express').Router();
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const session = require("express-session")
const store = require("express-mysql-session")(session)
const db = require("../data/mariaDBdatabase");

router.use(session({
  secret:"hey!ImjustSecret",
  resave:false,
  saveUninitialized:true,
  store:new store({
    host: '34.64.143.233',
    port: '3306',
    user: 'jiha',
    password: 'qkrwlgk0102!',
    database: 'mysql',
  })
}))
router.use(passport.initialize())
router.use(passport.session())

passport.use(new LocalStrategy((username, password, done)=>{
  db.IDcheck()
}))
passport.serializeUser((user, done)=>{
  console.log("here.. we serialize you");
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  console.log(`hey! ${id} are back! with deserialize!`);
  
  done(null, { id: id, nickname: "test"})
})

router.get('/', function (req, res) {
  res.render('LoginPage', { title: 'login page' });
});

router.post('/', (req, res) => {
 passport.authenticate(
   'local',
   {
     successRedirect:'/profile',
     failureRedirect:'/login',
     failureFlash:false
   }
 )
})

module.exports = router;