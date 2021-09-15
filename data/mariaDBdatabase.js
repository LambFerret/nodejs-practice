const mariadb = require("mariadb")
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
 * @returns row
 */
exports.getRow = (Table, searchRow, searchID) => {
    return new Promise((resolve, reject) => {
        this.getConnection((conn) => {
            try {
                const row = conn.query(`SELECT * FROM ${Table} WHERE ${searchRow} = '${searchID}';`)
                resolve(row)
            }
            catch (err) { console.log(err); }
            finally { if (conn) conn.release() }

        })
    })
}
/**
 * 
 * @param {string} Table table name
 * @param {string} searchRow column name; usually PK
 * @param {int} page where are you in
 * @param {int} showNumber how many
 * @returns rows
 */
exports.getRows = (Table, searchRow, page, showNumber) => {
    return new Promise((resolve, reject) => {
        this.getConnection((conn) => {
            var num = page * showNumber
            const query = `SELECT * FROM ${Table} ORDER BY ${searchRow} DESC LIMIT ${num} OFFSET ${num - showNumber};`
            try {
                const row = conn.query(query)
                resolve(row)
            }
            catch (err) { console.log(err); }
            finally { if (conn) conn.release() }
        })
    })
}

// getRows("Posting","PostID",10)

exports.getMaxCount = (Table, searchID) => {
    return new Promise((resolve, reject) => {
        this.getConnection((conn) => {
            try {
                const rows = conn.query(`SELECT ${searchID} FROM ${Table} ORDER BY '${searchID}' DESC LIMIT 1;`)
                resolve(row)
            }
            catch (err) { console.log(err); }
            finally { if (conn) conn.release() }
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
        try { conn.query(pstmt, list) }
        catch (err) { console.log(err); }
        finally { if (conn) conn.release() }
    })
}

// 34.64.143.233
// jiha
// qkrwlgk0102!
//10.5.12