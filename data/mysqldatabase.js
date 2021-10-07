const {pool} = require("./poolConfig")
console.log("connecting.. just wait..")

exports.register = async (id, name, pwd, email) => {
    let conn;
    try {
        conn = await pool.getConnection()
            .then((con) => {
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
    }
    catch (err) { console.log(err) }
    finally { ; }
}

exports.Login = async (id, pwd) => {
    try {
        conn = await pool.getConnection()
        .then((con)=>{
            const res = await con.query(`select `)
        }).then(conn.end);
    }
    catch (err) { console.log(err) }
    finally { ; }
}

