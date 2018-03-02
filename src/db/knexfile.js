module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.dbHost,
      user: process.env.dbUser,
      database: process.env.dbName,
      password: process.env.dbPass
    },
    debug: true
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.dbHost,
      user: process.env.dbUser,
      database: process.env.dbName,
      password: process.env.dbPass
    },
    debug: false
  }
};
