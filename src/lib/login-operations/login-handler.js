import joi from 'joi';
import boom from 'boom';
import lodash from 'lodash';
import validation from './validation';
import loginRepo from '../../db/login-repo';

const loginRepoInstance = loginRepo();

const loginHandler = () => ({
  createUser: (request, reply) => {
  }
});

export default loginHandler;
