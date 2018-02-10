module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '18.217.221.74',
      user: process.env.dbUser,
      database: process.env.dbName,
      password: process.env.dbPass
    },
    debug: true
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: process.env.dbUser,
      database: process.env.dbName,
      password: process.env.dbPass
    },
    debug: false
  }
};
