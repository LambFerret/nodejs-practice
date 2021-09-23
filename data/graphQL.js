const { graphqlHTTP } = require("express-graphql")
const { buildSchema } =require("graphql")
const DB = require("./mariaDBdatabase")

var schema = buildSchema(`
    type Query {
       USER: [USER]
       UPLOADIMG: [UPLOADIMG]
       CONV_IMG: [CONV_IMG]
       COMMENT: [COMMENT]
       POSTLIKE: [POSTLIKE]
       POSTING(PostID:ID): [POSTING]
       communityBoard(PostID:ID): POSTING
    }

    type USER {
        UserID: ID
        UserNM : String
        UserPw:String
        UserEmail:String
    }
    type UPLOADIMG {
        Up_Img_ID : ID
        UserID : String
        Up_Img_Nm : String
    }
    type CONV_IMG {
        Conv_Img_ID : ID
        Up_Img_ID : Int
        Conv_Img_Nm : String
    }
    type POSTING {
        PostID : ID
        Post_Text : String
        Post_Time : String
        Post_Type : String
        UserID : String
        View_Count : Int
        Like_Count : Int
        Comment_Count : Int
}
    type COMMENT {
        UserID : String
        PostID : Int
        Comment_Text : String
        Comment_PK : ID
    }
    type POSTLIKE {
        UserID : String
        PostID : Int
        LikeNum : ID
    }

`)

var resolver = {
    USER: ()=>{
        return new Promise((resolve)=>{
            DB.getConnection((conn)=>{
                const row = conn.query(`select * from USER`)
                resolve(row)
                conn.release()
            })
        })
    },
    UPLOADIMG: ()=>{
        return new Promise((resolve)=>{
            DB.getConnection((conn)=>{
                const row = conn.query(`select * from UPLOADIMG`)
                resolve(row)
                conn.release()
            })
        })
    },
    CONV_IMG: ()=>{
        return new Promise((resolve)=>{
            DB.getConnection((conn)=>{
                const row = conn.query(`select * from CONV_IMG`)
                resolve(row)
                conn.release()
            })
        })
    },
    COMMENT: ()=>{
        return new Promise((resolve)=>{
            DB.getConnection((conn)=>{
                const row = conn.query(`select * from COMMENT`)
                resolve(row)
                conn.release()
            })
        })
    },
    POSTLIKE: ()=>{
        return new Promise((resolve)=>{
            DB.getConnection((conn)=>{
                const row = conn.query(`select * from POSTLIKE`)
                resolve(row)
                conn.release()
            })
        })
    },
    POSTING: ()=>{
        return new Promise((resolve)=>{
            DB.getConnection((conn)=>{
                const row = conn.query(`select PostID, Post_Text, Post_Time, Post_Type, UserID, View_Count, IFNULL(Like_Count,0) as Like_Count, IFNULL(Comment_Count,0) as Comment_Count
                from POSTING a left outer join (SELECT PostID as PostID1, count(*) as Like_Count from POSTLIKE group by PostID) b on a.PostID = b.PostID1 left outer join (SELECT PostID as PostID2, count(*) as Comment_Count from COMMENT group by PostID) c on a.PostID = c.PostID2
                group by a.PostID order by Post_Time desc
                
                `)
                resolve(row)
                conn.release()
            })
        })
    }
    
}

graphql = graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql:true
})

module.exports = graphql