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
  },
  getOrgs: () => {
    return db('cf-organization').where('cf-organization.id', 1).then();
  },
  getCauses: (causeId) => {
    return db('cf-cause').where('cf-cause.id', causeId).then();
  },
  getSubCauses: (causeId) => {
    return db('cf-causedetails').where('cf-causedetails.causeId', causeId).then();
  }
});

export default clientRepo;
