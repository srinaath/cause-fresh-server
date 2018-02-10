import joi from 'joi';
import boom from 'boom';
import lodash from 'lodash';
import validation from './validation';
import adminRepo from '../../db/admin-repo';

const adminRepoInst = adminRepo();

const adminHandler = (request, reply) => ({
});

export default adminHandler;
