module.exports = function (passport) {
  const router = require('express').Router();
  const config = require("../lib/partial").partialConfig

  router.get("/", (req, res) => {
    if (req.user) {res.redirect("/")} // 로그인상태에서 로그인창 들오면 나가게함

    message = req.flash("error")
    console.log(message);
    config(req, res, "LoginPage", {
      isEmpty: true,
      message: message,
    }, true)
  })

  router.get("/temp",(req, res)=>{
    res.render("loadingScreen",{layout:"empty"})
    res.redirect("/login")

  }
  )

  router.post('/process',
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login/temp',
      failureFlash: true,
    })
  )

  return router;
}

// http://34.64.143.233:8080/
// UserID : test01
// UserNM : test
// UserEmail : test@naver.com
// UserPw : jiha0102
// Up_Img_ID : 1
// Up_Img_Nm : test1
// Conv_Img_ID : 1
// Conv_Img_Nm : conv_test1
// PostID : 1
// Post_Text : test
// Post_Time : 2021-09-13 15:30:23
// PostBoard_Type : winter