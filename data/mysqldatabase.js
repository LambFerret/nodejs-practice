var mysql = require("mysql")
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root1234',
    database:'photyler'
})

connection.connect();
connection.query("SELECT 1+1 AS solution",(err, result, fields)=>{
    if (err) console.log(err)
console.log(result)
})

exports.register = (id, email, pwd) => {
    connection.query(`INSERT INTO table1 (id, email, pwd) VALUES '${id}','${email}','${pwd}'`)
}

