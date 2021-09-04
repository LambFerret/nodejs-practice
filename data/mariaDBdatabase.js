const mariadb = require("mariadb")
const pool = mariadb.createPool({
    host: '34.64.143.233',
    port: '3306',
    user: 'jiha',
    password: 'qkrwlgk0102!',
    database: 'mysql',
    connectionLimit:5,
})
console.log("connecting mariaDB.. just wait..")

exports.register = async (id, name, email, pwd) => {
    try {
        
        conn = await pool.getConnection()
        .then((con)=>{
            console.log('!!mariaDB connected!!');
            con.query(`INSERT INTO USER VALUES ('${id}','${name}','${pwd}','${email}');`)
    })

    } catch (err) { console.error(err); }
    finally { ;}
}

exports.IDcheck = async (id) =>{
    try{
        conn = await pool.getConnection()
        .then((con)=>{
            console.log('!!markaDB connected!!');
            con.query(`select * from user where user.id = ${id};`)
    })
}
    catch (err) {console.error(err)}
}


// 34.64.143.233
// jiha
// qkrwlgk0102!
//10.5.12