const { db } = require('./env/config');
var mysql = require('mysql');



module.exports = () => {
    return new Promise(async(resolve, reject) => {
        var connection = mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.name
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