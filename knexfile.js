require('dotenv').config();

const { DATABASE_CLIENT, DATABASE_DB, POSTGRES_USER, POTGRES_PASSWORD, DATABASE_HOST, POSTGRES_PORT } = process.env;

module.exports = {
    development: {
        client: DATABASE_CLIENT,
        connection: {
            database: DATABASE_DB,
            user: POSTGRES_USER,
            password: POTGRES_PASSWORD,
            host: DATABASE_HOST,
            port: POSTGRES_PORT,
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },
};