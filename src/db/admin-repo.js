const db = require('./db');


const adminRepo = (userId) => ({
  getUserDetails: () => {
    return db('cf-user').where('id', userId).then();
  },
  getTransactionHistory: () => {
    return db('cf-transaction').where('id', userId)
    .join('causedetails', 'causedetails.id', '=', 'cf-transaction.subCauseId')
    .then();
  }
});

module.exports = adminRepo;
