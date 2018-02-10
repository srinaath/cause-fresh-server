import joi from 'joi';
import boom from 'boom';
import lodash from 'lodash';
import validation from './validation';
import clientRepo from '../../db/client-repo';

const clientRepoInst = clientRepo();

const clientHandler = () => ({
  getTransactionDetails: (request, reply) => {
    try {
      const userId = Number(request.query.userId);
      let promiseArr = [];
      promiseArr.push(clientRepoInst.getUserDetails(userId));
      promiseArr.push(clientRepoInst.getTransactionHistory(userId));
      promiseArr.push(clientRepoInst.getCause(1));
      Promise.all(promiseArr).then((values) => {
        let userDetails = values[0][0];
        let transactionHistory = values[1];
        let cause = values[2];

        let transactionObj = {
          userDetails : {
            balance: userDetails.balance,
            contractId: userDetails.contractId,
            userId: userDetails.id,
            userName: userDetails.username
          }
        };

        const historyObj = transactionHistory.map((transaction) => {
          return {
            causeDetailName: transaction.causeDetailName,
            transactionDate: transaction.transactionDate,
            transactionValue: transaction.trasactionValue,
            causeOrg: cause[0].orgName,
            causeName: cause[0].causeName,
            causeDesc: cause[0].causeDesc
          };
        });

        transactionObj.transactHistory = historyObj;
        reply(transactionObj).code(200);
      });

    } catch (ex) {
      request.log('usererror', ex);
      reply(boom.badImplementation('Unable to find any .'));
    }
  }
});

export default clientHandler;
