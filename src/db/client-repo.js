import db from './db';


const clientRepo = () => ({
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
  }
});

export default clientRepo;
