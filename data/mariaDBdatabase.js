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


function DB(){
    this.getConnection = function(callback) {
        pool.getConnection()
        .then(conn => {
            callback(conn)
        }).catch(err =>{
            console.log("this is mistake.. can't connect DB");
        })
    }

    this.getConnectionAsync = async ()=>{
        try{
            let conn = await pool.getConnection()
            this.conn = conn
            return conn;
        } catch (err){ throw err;} 
    }
    
    this.register = (id, name, email, pwd) =>{
        this.getConnection((conn)=>{
            conn.query(`INSERT INTO USER VALUES ('${id}','${name}','${pwd}','${email}');`)
        })
    }
    this.IDcheck = (id) =>{
        this.getConnection((conn)=>{
            conn.query(`SELECT COUNT (UserID) FROM USER WHERE ${id} == UserID`)
        }) 
    }
}
module.exports = new DB();

// 34.64.143.233
// jiha
// qkrwlgk0102!
//10.5.12