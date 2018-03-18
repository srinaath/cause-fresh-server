
import lodash from 'lodash';
import clientRepo from '../../db/client-repo';
import {getDbInstance} from '../../db/db';

const db = getDbInstance();
const clientRepoInst = clientRepo(db);

const clientHandler = () => ({
  testClientEndpoint: (request, reply) =>{
    reply.status(200).send({
      test: 'Success'
    });
  },
  getTransactionDetails: async(request, reply) => {
    // try {
    //   const userId = Number(request.query.userId);
    //   let promiseArr = [];
    //   promiseArr.push(clientRepoInst.getUserDetails(userId));
    //   promiseArr.push(clientRepoInst.getTransactionHistory(userId));
    //   promiseArr.push(clientRepoInst.getCause(1));
    //   const values = await Promise.all(promiseArr);
    //   let userDetails = values[0][0];
    //   let transactionHistory = values[1];
    //   let cause = values[2];

    //   let transactionObj = {
    //     userDetails : {
    //       balance: userDetails.balance,
    //       contractId: userDetails.contractId,
    //       userId: userDetails.id,
    //       userName: userDetails.username
    //     }
    //   };

    //   const historyObj = transactionHistory.map((transaction) => {
    //     return {
    //       causeDetailName: transaction.causeDetailName,
    //       transactionDate: transaction.transactionDate,
    //       transactionValue: transaction.transactionValue,
    //       causeOrg: cause[0].orgName,
    //       causeName: cause[0].causeName,
    //       causeDesc: cause[0].causeDesc,
    //       nodeEnv: process.env.NODE_ENV
    //     };
    //   });

    //   transactionObj.transactHistory = historyObj;
    //   reply.status(200).send(transactionObj);

    // } catch (ex) {
    //   reply.boom.badImplementation('Unable to find any transactions for the user.');
    // }
    reply.status(200).send({
      test: 'hello'
    });
  },
  getDonationScreenData: (request, reply) => {
    try {
      let promiseArr = [];
      promiseArr.push(clientRepoInst.getOrgs());
      promiseArr.push(clientRepoInst.getCauses(1));
      promiseArr.push(clientRepoInst.getSubCauses(1));

      Promise.all(promiseArr).then((donationData) => {
        let orgs = donationData[0];
        let causes = donationData[1];
        let subCauses = donationData[2];
        reply({orgs, causes, subCauses}).code(200);
      });
    } catch (ex) {
      request.log('usererror', ex);
      reply.boom.badImplementation('Unable to find any orgs, causes etc.');
    }
  },
  addDonationToSubCause: (request, reply) => {
    try {
      let payload = request.payload;
      if (typeof request.payload === 'string') {
        payload = JSON.parse(request.payload);
      }

      const requestParams = {
        subCauseId: payload.subCauseId,
        userId: payload.userId,
        causeId: payload.causeId,
        orgId : payload.orgId,
        transactionAmt: payload.transactionAmt
      };
      clientRepoInst.addDonationToSubCause(requestParams).then((addedId) => {
        clientRepoInst.deductUserBalance(requestParams).then((result) => {
          reply(addedId).code(201);
        });
      });
    } catch (ex) {
      reply.boom.badRequest('Unable to create transaction.', ex);
    }
  }
});

export default clientHandler;
