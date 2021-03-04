const { Sequelize } = require('sequelize');
const conf = require('./env/config');

const sequelize = new Sequelize(conf.db.name, conf.db.user, conf.db.password, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = () => {
    return new Promise(async(resolve, reject) => {
        try {
            await sequelize.authenticate();
            resolve('Connection has been established successfully')
        } catch (error) {
            reject('Unable to connect to the database:', error);
        }
    });

}