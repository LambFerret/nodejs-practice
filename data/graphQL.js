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
                const row = conn.query(`select * from POSTING ORDER BY Post_Time DESC`)
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