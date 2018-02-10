import joi from 'joi';
import boom from 'boom';
import lodash from 'lodash';
import validation from './validation';
import clientRepo from '../../db/client-repo';

const clientRepoInst = clientRepo();

const clientHandler = () => ({
  getUserDetails: (request, reply) => {
    try {
      const userId = Number(request.query.userId);
      clientRepoInst.getUserDetails(userId).then((result) => {
        reply(result).code(200);
      });
    } catch (ex) {
      request.log('usererror', ex);
      reply(boom.badImplementation('Unable to find any iterations for the project.'));
    }
  }
});

export default clientHandler;
