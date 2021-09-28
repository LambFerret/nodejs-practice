const pool = require("./poolConfig")

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
exports.getRows = (Table, searchRow,  page=1) => {
    return new Promise((resolve, reject) => {
        this.getConnection((conn) => {
            const query = `SELECT * FROM ${Table} ORDER BY ${searchRow} DESC`// LIMIT ${page*10} OFFSET ${(page-1)*10};`
            try {
                const row = conn.query(query)
                resolve(row)
            }
            catch (err) { console.log(err); }
            finally { if (conn) conn.release() }
        })
    })
}

exports.useWisely = (Table) => {
    return new Promise((resolve, reject) => {
        this.getConnection((conn) => {
            const query = `${Table};`
            var queryss = query.replace(/(?:\r\n|\r|\n)/g, ' ');
            // queryss = queryss.replace(/    /g,"")
            try {
                const row = conn.query(queryss)
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
                const rows = conn.query(`select PostID, count(*) as commentCount from ${Table} where PostID="${searchID}" group by PostID;`)
                resolve(rows)
            }
            catch (err) { console.log(err); }
            finally { if (conn) conn.release() }
        })
    })
}

exports.getCount = (Table, searchID, userID) => {
    return new Promise((resolve, reject) => {
        this.getConnection((conn) => {
            try {
                const rows = conn.query(`select count(*) as ctd from ${Table} where Up_Img_Method="${searchID}" and UserID="${userID}";`)
                resolve(rows)
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

/**
 * 
 * @param {string} table table name
 * @param {string} key key in table
 * @param {string} value Id
 */
exports.deleteRow = (table, key, value)=>{
    this.getConnection(async (conn)=>{
        query = `delete from ${table} where ${key} = '${value}'`
        try { conn.query(query) }
        catch (err) { console.log(err); }
        finally { if (conn) conn.release() } 
    })
}


// 34.64.143.233
// jiha
// qkrwlgk0102!
//10.5.12