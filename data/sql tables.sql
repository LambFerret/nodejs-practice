CREATE TABLE USER ( 
    UserID varchar(30) UNIQUE NOT NULL,  
    UserNM varchar(50) NOT NULL,
    UserPw varchar(50) NOT NULL,
    UserEmail varchar(50) NOT NULL,
    PRIMARY KEY (UserID)
); 

CREATE TABLE UPLOADIMG (
    Up_Img_ID int
    UserID varchar(30) NOT NULL, 
    Up_Img_Nm varchar(50) NOT NULL,
    Up_Img_Method varchar(15) NOT NULL,
    PRIMARY KEY (Up_Img_Nm),
    FOREIGN KEY (UserID) REFERENCES USER(UserID)
); 

CREATE TABLE CONV_IMG (
    Conv_Img_ID varchar(50),  
    Up_Img_ID varchar(50)
    PRIMARY KEY (Conv_Img_ID),
    FOREIGN KEY (Up_Img_ID) REFERENCES UPLOADIMG(Up_Img_Nm)
);

CREATE TABLE POSTING (
    PostID varchar(50), 
    Post_Text varchar(255),
    Post_Time timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    Post_Type varchar(10) NOT NULL,
    UserID varchar(30) NOT NULL,
    View_Count int default 0,
    PostNum int AUTO_INCREMENT,
    PRIMARY KEY (PostID),
    FOREIGN KEY (PostID) REFERENCES CONV_IMG(Conv_Img_ID),
    FOREIGN KEY (UserID) REFERENCES USER(UserID)
);

CREATE TABLE POSTLIKE (
    Like_ID int AUTO_INCREMENT,
    UserID varchar(30) NOT NULL,
    PostID varchar(50) NOT NULL,
    PRIMARY KEY (Like_ID),
    FOREIGN KEY (UserID) REFERENCES USER(UserID),
    FOREIGN KEY (PostID) REFERENCES POSTING(PostID)
);

CREATE TABLE COMMENT (
    Comment_ID int AUTO_INCREMENT,
    UserID varchar(30) NOT NULL,
    PostID varchar(50) NOT NULL,
    Comment_Text varchar(255) NOT NULL,
    PRIMARY KEY (Comment_ID),
    FOREIGN KEY (UserID) REFERENCES USER(UserID),
    FOREIGN KEY (PostID) REFERENCES POSTING(PostID)
);