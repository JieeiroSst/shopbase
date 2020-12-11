module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "shopbase",
      user: "user",
      password: "pass",
      host: "0.0.0.0",
      port: 54322,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};
