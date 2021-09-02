var mysql = require("mysql")
const mariadb = require("mariadb")


exports.register = async (id, name, email, pwd) => {
    const pool = mariadb.createPool({
        host: '34.64.143.233',
        port: '8080',
        user: 'jiha',
        password: 'qkrwlgk0102!',
        database: 'mysql',
        connectionLimit:5,
    })
    try {
        conn = await pool.getConnection().then(()=>{console.log('!!really connected!!');})
        await conn.query(`INSERT INTO USER (UserID, UserNM, UserPw, UserEmail) VALUES '${id}','${name},'${pwd}','${email}';`)
    } catch (err) { console.log(err); }
    finally { ;}
}
// 34.64.143.233
// jiha
// qkrwlgk0102!
//10.5.12