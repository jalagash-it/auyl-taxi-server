const { db } = require('./env/config');
var mysql = require('mysql');

const mariadb = require('mariadb');


module.exports = () => {
    return testMysql();

}
const testMariadb = () => {
    return new Promise(async(resolve, reject) => {
        const pool = mariadb.createPool({
            database: db.name,
            host: db.host,
            port: db.port,
            user: db.user,
            password: db.password,
            connectionLimit: 5,
            flags: '-SECURE_CONNECTION'
        });
        pool.getConnection()
            .then(conn => {

                conn.query("SELECT 1 as val")
                    .then((rows) => {
                        console.log(rows); //[ {val: 1}, meta: ... ]
                        //Table must have been created before 
                        // " CREATE TABLE myTable (id int, val varchar(255)) "
                        return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
                    })
                    .then((res) => {
                        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
                        conn.end();
                        resolve("good");
                    })
                    .catch(err => {
                        //handle error
                        console.log(err);
                        conn.end();
                        reject({ msg: 'Unable to connect to the database:', err });
                    })

            }).catch(err => {
                reject({ msg: 'Unable to connect to the database:', err });
            });
    });
}
const testMysql = () => {
    return new Promise(async(resolve, reject) => {
        var connection = mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.name,
            flags: '-SECURE_CONNECTION'
        });
        connection.connect();

        connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
            if (error) {
                reject({ msg: 'Unable to connect to the database:', error });
                connection.end();
                return;
            }
            resolve('Connection has been established successfully')
        });

        connection.end();

    });
}