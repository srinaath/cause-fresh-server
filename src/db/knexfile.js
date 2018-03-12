module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '18.217.221.74',
      user: 'tolkien',
      database: 'CauseFresh',
      password: 'causeUserFresh123*!'
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
