const mariadb = require("mariadb")

const pool = mariadb.createPool({
    host: '34.64.143.233',
    port: '3306',
    user: 'jiha',
    password: 'qkrwlgk0102!',
    database: 'mysql',
    connectionLimit: 5,
})
console.log("connecting mariaDB.. just wait..")



exports.getConnection = function (callback) {
    pool.getConnection()
        .then(conn => {
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

exports.register = async (id, name, pwd, email) => {
    getConnection((conn) => {
        conn.query(`INSERT INTO USER(UserID, UserNM, UserPw, UserEmail) VALUES ('${id}','${name}','${pwd}','${email}');`)

    })
}
exports.IDcheck =async (id) => {
    temp1 =await this.getConnectionAsync(async (conn) => {
        temp = await conn.query(`select count(*) cnt from USER where UserID LIKE '${id}';`)
            .then((value) => {
                result = value[0].cnt
                //console.log(result);
                return result
            })
        console.log(temp + " temp ");
        return temp
    })
    console.log(temp1 + "temp1");
    return temp1

}



// 34.64.143.233
// jiha
// qkrwlgk0102!
//10.5.12