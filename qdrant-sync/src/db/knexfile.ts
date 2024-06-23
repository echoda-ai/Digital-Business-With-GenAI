import { Knex } from 'knex'
import path from 'path'
import config from '../core/config'
export const connectionOptions = {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
}
const knexConfig: Knex.Config = {
    client: 'mysql2',
    connection: {
        ...connectionOptions,
    },
    migrations: {
        tableName: '_migrations',
        directory: path.join(__dirname, 'migrations'),
        disableMigrationsListValidation: true,
    },
    seeds: {
        directory: path.join(__dirname, 'seeds'),
    },
}

export default knexConfig