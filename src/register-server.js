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
      const options = {
        ops: {
          interval: 1000
        },
        reporters: {
          myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
              log: '*',
              events: { log: 'error' },
              response: '*'
            }]
          }, {
            module: 'good-console'
          }, 'stdout'],
          myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
              response: '*',
              log: '*'
            }]
          }, {
            module: 'good-squeeze',
            name: 'SafeJson'
          }, {
            module: 'good-file',
            args: [process.env.logFilePath]
          }]
        }
      };

      serverObj.register({
        register: require( 'good'),
        options
      }, (err) => {
        if (err) {
          throw err;
        }
      });

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
