const mariadb = require("mariadb")


exports.waypoint = {
    host: '34.64.143.233',
    port: '3306',
    user: 'jiha',
    password: 'qkrwlgk0102!',
    database: 'mysql',
    connectionLimit: 5,
}

exports.pool = mariadb.createPool(this.waypoint)

exports.mongo = "mongodb+srv://root:root1234@cluster0.qcnmf.mongodb.net/thisisnewname?retryWrites=true&w=majority";

exports.sessionSecret = 'hey i am secret!'

