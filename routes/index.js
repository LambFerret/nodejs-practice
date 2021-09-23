const router = require('express').Router();
const config = require("../lib/partial").partialConfig
const db = require("../data/mariaDBdatabase")
const fs = require("fs")

router.get("/",(req, res)=> config(req, res, "index",{}, true) )

router.get("/logout", (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get("/admin", async (req, res) => {
  var queryss = `


  
  ;`
  
  // select PostID, count(*) as commentCount from COMMENT group by PostID;
  // SELECT * FROM USER_CONS_COLUMNS WHERE TABLE_NAME = 'POSTING'; 
  // alter table POSTING modify PostNum auto_increment
  // insert into (select PostNum from POSTING where PostID = 1) values 1
  // alter table POSTING add PostNum int
  // insert into COMMENT(UserID, PostID, Comment_Text) VALUES("asdfasdf", 1, "nice picture dude hahaha")
  // insert into POSTLIKE(UserID,PostID) VALUES("qwerqwer", 4)
  // insert into POSTING values(4, null, null, "winter", "asdfasdf", null);
  // drop table COMMENT
  // CREATE TABLE COMMENT (    UserID varchar(30) NOT NULL,    PostID int NOT NULL,    Comment_Text varchar(255) NOT NULL, Comment_PK int AUTO_INCREMENT,    PRIMARY KEY (Comment_PK),    FOREIGN KEY (UserID) REFERENCES USER(UserID),    FOREIGN KEY (PostID) REFERENCES POSTING(PostID));
  // CREATE TABLE POSTLIKE (  UserID varchar(30) NOT NULL,    PostID int NOT NULL,   LikeNum int AUTO_INCREMENT,   PRIMARY KEY (LikeNum),    FOREIGN KEY (UserID) REFERENCES USER(UserID),    FOREIGN KEY (PostID) REFERENCES POSTING(PostID));
  // delete from UPLOADIMG where UserID="asdfasdf"
  //COMMENT, CONV_IMG, POSTING, POSTLIKE, UPLOADIMG, USER
  
  // select * from POSTING as A 
  // left outer join 
  // (select PostID as fkid FROM COMMENT)
  //  as B on A.UserID = B.fkid
  
  // rows.forEach(element => {
    //   console.log(element);
    //   console.log("\n");
    // });
    
    rows = await db.useWisely(queryss)
  var file = `1234321.json`
  fs.writeFile(file, JSON.stringify(rows), 'utf-8', (err, fd) => { if (err) throw err; })
  res.render("admin", {
    // data: rows,
  })
})

module.exports = router;