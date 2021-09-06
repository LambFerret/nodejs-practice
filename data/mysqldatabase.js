const mariadb = require("mariadb")
const { conn } = require("./mariaDBdatabase")
const pool = mariadb.createPool({
    host: '34.64.143.233',
    port: '3306',
    user: 'jiha',
    password: 'qkrwlgk0102!',
    database: 'mysql',
    connectionLimit: 5,
})
console.log("connecting.. just wait..")

exports.register = async (id, name, pwd, email) => {
    let conn;
    try {
        conn = await pool.getConnection()
            .then((con) => {
                console.log('!!DB connected!!');
                con.query(`INSERT INTO USER(UserID, UserNM, UserPw, UserEmail) VALUES ('${id}','${name}','${pwd}','${email}');`)
            }).then(conn.end);
    }
    catch (err) { console.log(err); }
    finally { ; }
}

exports.IDcheck = async (id) => {
    try {
        conn = await pool.getConnection()
        qry = await conn.query(`select count(*) from user where UserID = ${id};`)
        
            // .then((con) => {
            //     console.log('!!DB connected!!');
            //     con.query(`select count(*) from user where UserID = ${id};`, (result)=>{
            //         return id
            //     })
            // }).then(conn.end);
    }
    catch (err) { console.log(err) }
    finally { ; }
}

exports.Login = async (id, pwd) => {
    try {
        conn = await pool.getConnection()
        .then((con)=>{
            console.log("??Is Login??");
            const res = await con.query(`select `)
        }).then(conn.end);
    }
    catch (err) { console.log(err) }
    finally { ; }
}


// 34.64.143.233
// jiha
// qkrwlgk0102!
//10.5.12