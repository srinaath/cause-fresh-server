import cfg from './knexfile';

const db = () => {
  let instance;
  const init = () => {
    if (process.env.NODE_ENV === 'production') {
      return require('knex')(cfg.production);
    } else if (process.env.NODE_ENV === 'staging') {
      return require('knex')(cfg.staging);
    } else {
      return require('knex')(cfg.development);
    }
  };

  return {
    getDbInstance: () => {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
};
module.exports = db();
