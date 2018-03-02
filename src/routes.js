import boom from 'boom';
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
      handler: {
        directory: {
          path: 'public'
        }
      }
    }
  },
  {
    path: '/api/getTransactionDetails',
    method: 'GET',
    config: {
      handler: clientHandlerInstance.getTransactionDetails
    }
  },
  {
    config: {
      auth: 'session',
      handler: clientHandlerInstance.getDonationScreenData
    },
    path: '/api/getDonationScreenData',
    method: 'GET'
  },
  {
    path: '/api/addDonationToSubCause',
    method: 'POST',
    handler: clientHandlerInstance.addDonationToSubCause
  },
  {
    method: 'GET',
    path: '/api/login',
    config: {
      auth: 'twitter',
      handler: function (request, reply) {
        if (!request.auth.isAuthenticated) {
          return reply('Authentication failed due to: ' + request.auth.error.message);
        }
        const profile = request.auth.credentials.profile;

        request.cookieAuth.set({
          twitterId: profile.id,
          username: profile.username,
          displayName: profile.displayName
        });
        return reply.redirect('/');
      }
    }
  }
];

module.exports = Routes;
