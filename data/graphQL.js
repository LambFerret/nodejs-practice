const {graphqlHTTP } = require("express-graphql")
const { buildSchema } =require("graphql")
const DB = require("./mariaDBdatabase")

var schema = buildSchema(`
    type Query {
        getRows(table:String!): [USER]
    }

    type USER {
        UserID: ID
        UserNM : String
        UserPw:String
        UserEmail:String
    }
`)

var resolver = {
    hello: (table)=>{
        return new Promise((resolve)=>{
            DB.getConnection((conn)=>{
                const row = conn.query(`select * from ${table}`)
                resolve(row)
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