const router = require('express').Router();
const config = require("../lib/partial").partialConfig
const db = require("../data/mariaDBdatabase")
const fs = require("fs")

router.get("*", (req, res, next) => {
  if (req.user) next()
  else res.redirect("/")
})

router.get("/", async (req, res) => {
  //rows = await db.getRows("Conv_Info","Conv_ID")
  config(req, res, "userprofile", { id: req.user.id })
})


router.get("/admin", async (req, res) => {
  var queryss = `
    
  ;`
  
  // select * from COMMENT
  // insert into COMMENT(UserID, PostID, Comment_Text) VALUES("asdfasdf", 1, "nice picture dude hahaha")
  // insert into POSTLIKE(UserID,PostID) VALUES("qwerqwer", 4)
  // insert into POSTING values(4, null, null, "winter", "asdfasdf", null);
  // drop table COMMENT
  // CREATE TABLE COMMENT (    UserID varchar(30) NOT NULL,    PostID int NOT NULL,    Comment_Text varchar(255) NOT NULL, Comment_PK int AUTO_INCREMENT,    PRIMARY KEY (Comment_PK),    FOREIGN KEY (UserID) REFERENCES USER(UserID),    FOREIGN KEY (PostID) REFERENCES POSTING(PostID));
  // CREATE TABLE POSTLIKE (  UserID varchar(30) NOT NULL,    PostID int NOT NULL,   LikeNum int AUTO_INCREMENT,   PRIMARY KEY (LikeNum),    FOREIGN KEY (UserID) REFERENCES USER(UserID),    FOREIGN KEY (PostID) REFERENCES POSTING(PostID));
  // delete from UPLOADIMG where UserID="asdfasdf"
  // rows = await db.useWisely(queryss)
  //COMMENT, CONV_IMG, POSTING, POSTLIKE, UPLOADIMG, USER

  // rows.forEach(element => {
  //   console.log(element);
  //   console.log("\n");
  // });
  // var file = `1234321.json`

  // console.log(rows);
  // fs.writeFile(file, JSON.stringify(rows), 'utf-8', (err, fd) => { if (err) throw err; })
  res.render("admin", {
    // data: rows,
  })
})
module.exports = router;
