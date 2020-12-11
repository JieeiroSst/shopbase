module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "shopbase",
      user: "user",
      password: "pass",
      host: "db",
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};
