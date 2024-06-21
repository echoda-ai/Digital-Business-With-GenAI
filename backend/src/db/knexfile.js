const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = require("../constant");

module.exports = {
    client: "mysql2",
    connection: {
        host: DB_HOST,
        port: parseInt(DB_PORT),
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        timezone: "+00:00"
    },
    migrations: {
        directory: "./migrations",
    },
    seeds: {
        directory: "./seeds",
    }
};
