require('dotenv').config();

const { DATABASE_CLIENT, DATABASE_DB, POSTGRES_USER, POTGRES_PASSWORD, DATABASE_HOST, POSTGRES_PORT } = process.env;

module.exports = {
    development: {
        client: "pg",
        connection: {
            database: "shopbase",
            user: "root",
            password: "1234",
            host: "127.0.0.1",
            port: 5432,
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },
};