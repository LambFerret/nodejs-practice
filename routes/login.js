const router = require('express').Router();
const pass = require("../lib/pass")
const passport = require("passport")
const express = require('express');
const app = express();

const session = require("express-session")
app.use(session({ secret: "hi" }))
app.use(passport.initialize())
app.use(passport.session())

router.get('/', function (req, res) {
  res.render('LoginPage', { title: 'login page in js title' });
});

router.post('/', (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  })
})

module.exports = router;