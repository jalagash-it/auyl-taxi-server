const { db } = require('./env/config');
var mysql = require('mysql');

const mariadb = require('mariadb');


module.exports = () => {
    return testMariadb2();

}
const testMariadb2 = () => {
    return new Promise(async(resolve, reject) => {

        mariadb.createConnection({

            database: db.name,
            host: db.host,
            port: db.port,
            user: db.user,
            password: db.password,
            connectionLimit: 5,

        }).then((conn) => {
            conn.query("SELECT * from myTable").then(res => {

                resolve(res);
            }).catch(err => {
                reject({ msg: 'Unable to connect to the database:', err });
                conn.end();
                return;
            })
        }).catch(err => {
            reject({ msg: 'Unable to connect to the database:', err });
            conn.end();
            return;
        })
    });
}
const testMariadb = () => {
    return new Promise(async(resolve, reject) => {
        const pool = mariadb.createPool({
            debug: true,
            database: db.name,
            host: db.host,
            port: db.port,
            user: db.user,
            password: db.password,
            connectionLimit: 5,
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
                        reject({ msg: 'Unable to connect to the database1:', err });
                    })

            }).catch(err => {
                reject({ msg: 'Unable to connect to the database2:', err });
            });
    });
}
const testMysql = () => {
    return new Promise(async(resolve, reject) => {
        var connection = mysql.createConnection({
            debug: true,
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.name,
            // flags: '-SECURE_CONNECTION'
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