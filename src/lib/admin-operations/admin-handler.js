import joi from 'joi';
import boom from 'boom';
import lodash from 'lodash';
import validation from './validation';
import adminRepo from '../../db/admin-repo';
import {getDbInstance} from '../../db/db';

const db = getDbInstance();
const adminRepoInst = adminRepo(db);

const adminHandler = (request, reply) => ({
  addTransaction: (request, reply) => {
    try {

    } catch (ex) {
      request.log('usererror', ex);
      reply(boom.badImplementation('Unable to add transactions.'));
    }
  }
});

export default adminHandler;
