import boom from 'boom';
import clientHandler from './lib/client-operations/client-handler';
import adminHandler from './lib/admin-operations/admin-handler';

const clientHandlerInstance = clientHandler();
const adminHandlerInstance = adminHandler();

const loadRoutes = (app) => {
  app.get('/api/getTransactionDetails', clientHandlerInstance.getTransactionDetails);
  app.get('/api/getDonationScreenData', clientHandlerInstance.getDonationScreenData);
  app.post('/api/addDonationToSubCause', clientHandlerInstance.addDonationToSubCause);

};

module.exports = loadRoutes;
