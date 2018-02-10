import db from './db';


const clientRepo = (userId) => ({
  getUserDetails: () => {
    return db('cf-user').where('id', 1).then();
  }
});

export default clientRepo;
