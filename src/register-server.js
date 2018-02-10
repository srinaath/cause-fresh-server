import dotenv from 'dotenv';

const registerServerHandlers = () => {
  let serverObj = null;

  const setEnvVariables = (nodeEnv) => {
    if (nodeEnv === 'production') {
      dotenv.config({ path: './env-config/.env.prod' });
    } else if (process.env.NODE_ENV === 'qa') {
      dotenv.config({ path: './env-config/.env.qa' });
    } else {
      dotenv.config({ path: './env-config/.env.dev' });
    }
  };

  const setServerObj = (servObj) => {
    serverObj = servObj;
  };

  const initServer = () => {
    try {
      serverObj.register({
        register: require('hapi-cors'),
        options: {
          methods: ['POST, GET, OPTIONS', 'PUT']
        }
      }, (err) => {
        if (err) {
          throw err;
        }
      });
    } catch (ex) {
      serverObj.log('appError', ex);
    }
  };

  return {
    setEnvVariables : setEnvVariables,
    initServer: initServer,
    setServerObj: setServerObj,
    getServerObj: () => { return serverObj; }
  };
};

export default registerServerHandlers;
