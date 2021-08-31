var mysql = require("mysql")

sqlInit = ()=>{
    var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root1234',
        database:'datas'
    })
    connection.connect(); 
}

exports.register = (id, email, pwd) => {
    sqlInit()
    connection.query(`INSERT INTO table1 (id, email, pwd) VALUES '${id}','${email}','${pwd}'`)
    connection.close()
}

