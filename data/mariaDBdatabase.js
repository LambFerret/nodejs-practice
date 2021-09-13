const mariadb = require("mariadb")
const info = require("./DBinfo.json")
const pool = mariadb.createPool({
    host: '34.64.143.233',
    port: '3306',
    user: 'jiha',
    password: 'qkrwlgk0102!',
    database: 'mysql',
    connectionLimit: 5,
})

exports.getConnection = function (callback) {
    pool.getConnection()
        .then(conn => {
            console.log("mariaDB connected!")
            callback(conn)
        }).catch(err => {
            console.log("this is mistake.. can't connect DB");
        })
}

exports.getConnectionAsync = async () => {
    try {
        let conn = await pool.getConnection()
        this.conn = conn
        return conn;
    } catch (err) { throw err; }
}

/**
 * 
 * @param {string} Table table name
 * @param {string} searchRow column name; usually PK
 * @param {string} searchID name you looking for
 * @returns rows
 */
exports.getRow = (Table, searchRow, searchID) => {
    return new Promise((resolve, reject)=>{
        this.getConnection((conn)=>{
            const row = conn.query(`SELECT * FROM ${Table} WHERE ${searchRow} = '${searchID}';`)
            resolve(row)
        })
    })
}
//여기는 getRow를 each돌릴까 아니면 getRows 메소드를 따로만들까?

exports.getMaxCount = (Table, searchID) => {
    return new Promise((resolve, reject)=>{
        this.getConnection((conn)=>{
            const rows = conn.query(`SELECT ${searchID} FROM ${Table} ORDER BY '${searchID}' DESC LIMIT 1;`)
            resolve(rows)
        })
    })
}

/**
 * 
 * @param {string} table table name
 * @param {Array} list array to be insert
 */
exports.insertRow = (table, list) => {
    this.getConnection(async (conn) => {
        var times = Array(list.length).fill('?').toString()
        var pstmt = `INSERT INTO ${table} VALUES (${times})`
        try {conn.query(pstmt, list)}
        catch (err) {console.log(err);}
        finally {if (conn) conn.release()}
    })
}

// 34.64.143.233
// jiha
// qkrwlgk0102!
//10.5.12
// conn.query(`SELECT PostID from Posting order by PostID desc limit 1`))