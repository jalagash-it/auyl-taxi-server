module.exports = {
    host: "localhost",
    user: "adm",
    password: "123qweASD",
    port: 33060,
    db: "taxi_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};