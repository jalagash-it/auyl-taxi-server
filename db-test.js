const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('p-317273_taxi_db', 'root', 'qweQWE123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = async() => {
    return new Promise(async(resolve, reject) => {
        try {
            await sequelize.authenticate();
            resolve('Connection has been established successfully')
        } catch (error) {
            reject('Unable to connect to the database:', error);
        }
    });

}