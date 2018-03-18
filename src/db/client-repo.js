const clientRepo = (db) => ({
  getUserDetails: (userId) => {
    return db('cf-user').where('id', userId).then();
  },
  getTransactionHistory: (userId) => {
    return db('cf-transaction').where('cf-transaction.userId', userId)
    .join('cf-causedetails', 'cf-causedetails.id', '=', 'cf-transaction.subCauseId')
    .then();
  },
  getCause: (causeId) => {
    return db('cf-cause').where('cf-cause.id', causeId)
    .join('cf-organization', 'cf-organization.id', '=', 'cf-cause.organizationId')
    .then();
  },
  getOrgs: () => {
    return db('cf-organization').where('cf-organization.id', 1).then();
  },
  getCauses: (causeId) => {
    return db('cf-cause').where('cf-cause.id', causeId).then();
  },
  getSubCauses: (causeId) => {
    return db('cf-causedetails').where('cf-causedetails.causeId', causeId).then();
  },
  addDonationToSubCause: (requestParams) => {
    let transactionobj = {
      userId: requestParams.userId,
      transactionValue: requestParams.transactionAmt,
      subCauseId: requestParams.subCauseId
    };
    return db('cf-transaction').insert(transactionobj, 'id').then();
  },
  deductUserBalance: (requestParams) => {
    return db('cf-user').where('id', requestParams.userId).then((result) => {
      if (result[0]) {
        let updatedBalance = Number(result[0].balance) - Number(requestParams.transactionAmt);
        let userObj = {
          balance: updatedBalance
        };

        return db('cf-user').where('id', requestParams.userId).update(userObj).then((result) => {
          return result;
        });
      }
    });
  }
});

module.exports = clientRepo;
