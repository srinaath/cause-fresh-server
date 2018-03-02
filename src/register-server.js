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

  const validateUser = (decoded, request, callback) => {
    console.log(request);
    return callback(null, true);
  };

  const initServer = () => {
    try {
      serverObj.register(require('hapi-auth-cookie'), (err) => {
        if (err) {
          throw err;
        }

        serverObj.auth.strategy('session', 'cookie', {
          password: process.env.encryptionPassword,
          validateFunc: (request, session, callback) => {
            console.log('Request', request);
            return callback(null, true);
          },
          isSecure: false
        });
      });


      serverObj.register(require('bell'),  (err) => {
        if (err) {
          throw err;
        }

        serverObj.auth.strategy('twitter', 'bell', {
          provider: process.env.defaultProvider,
          password: process.env.encryptionPassword,
          clientId: process.env.twitterClientId,
          clientSecret: process.env.twitterClientSecret,
          isSecure: false
        });
        serverObj.route(require('./routes'));
      });

      serverObj.register({
        register: require('hapi-cors'),
        options: {
          methods: ['POST, GET, OPTIONS', 'PUT'],
          origins: ['http://localhost:3000']
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
