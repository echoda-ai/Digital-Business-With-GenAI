
module.exports = {
    client: "mysql2",
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'seanglay_user',
        password: 'seanglay_password',
        database: 'seanglay_db',
        timezone: "+00:00"
    },
    migrations: {
        directory: "./migrations",
    },
    seeds: {
        directory: "./seeds",
    }
};
