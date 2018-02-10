import cfg from './knexfile';

let knex;
if (process.env.NODE_ENV === 'production') {
  knex = require('knex')(cfg.production);
} else if (process.env.NODE_ENV === 'staging') {
  knex = require('knex')(cfg.staging);
} else {
  knex = require('knex')(cfg.development);
}

module.exports = knex;
