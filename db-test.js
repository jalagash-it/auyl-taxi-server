const { Sequelize } = require('sequelize');
const conf = require('./env/config');

const sequelize = new Sequelize(`mysql://nurlan:qweQWE123@localhost:3306/p-317273_taxi_db`);
// const sequelize = new Sequelize(conf.db.name, conf.db.user, conf.db.password, {
//     host: conf.db.host,
//     dialect: conf.db.dialect
// });

module.exports = () => {
    return new Promise(async(resolve, reject) => {
        try {
            await sequelize.authenticate();
            resolve('Connection has been established successfully')
        } catch (error) {
            reject({ msg: 'Unable to connect to the database:', error });
        }
    });

}