import clientHandler from './lib/client-operations/client-handler';
import adminHandler from './lib/admin-operations/admin-handler';

const clientHandlerInstance = clientHandler();
const adminHandlerInstance = adminHandler();

const Routes = [
  // All resources routes
  {
    method: 'GET',
    path: '/{param*}',
    config: {
      auth: false
    },
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  },
  {
    path: '/api/getTransactionDetails',
    method: 'GET',
    handler: clientHandlerInstance.getTransactionDetails
  }
];

module.exports = Routes;
