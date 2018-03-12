const adminRepo = (db) => ({
  getUserDetails: (userId) => {
    return db('cf-user').where('id', userId).then();
  },
  getTransactionHistory: (userId) => {
    return db('cf-transaction').where('id', userId)
    .join('causedetails', 'causedetails.id', '=', 'cf-transaction.subCauseId')
    .then();
  }
});

module.exports = adminRepo;
