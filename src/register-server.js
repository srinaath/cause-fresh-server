const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const passport = require('passport');
const expressValidator = require('express-validator');
const compression = require('compression');
const expressStatusMonitor = require('express-status-monitor');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const express = require('express');
const lusca = require('lusca');
const loadRoutes = require('./express-routes');
// const passportConfiguration = require('./config/passport');


const registerServerHandlers = (serverInstance) => {

  const setEnvVariables = (nodeEnv) => {
    if (nodeEnv === 'production') {
      dotenv.config({ path: './env-config/.env.prod' });
    } else if (process.env.NODE_ENV === 'qa') {
      dotenv.config({ path: './env-config/.env.qa' });
    } else {
      dotenv.config({ path: './env-config/.env.dev' });
    }
  };


  const initExpressUtilities = () => {
    serverInstance.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
    serverInstance.set('port', process.env.SERVER_PORT || 8080);
    serverInstance.use(expressStatusMonitor());
    serverInstance.use(compression());
    serverInstance.use(bodyParser.json());
    serverInstance.use(bodyParser.urlencoded({ extended: true }));
    serverInstance.use(expressValidator());
    serverInstance.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
    serverInstance.use(lusca.xframe('SAMEORIGIN'));
    serverInstance.use(lusca.xssProtection(true));

    // Use passport for OAuth
    setPassport();

    // Load Routes
    loadRoutes(serverInstance);
  };

  const setLogger = () => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'qa') {
      const logDirectory = path.join(__dirname, 'logs');

      // ensure log directory exists
      fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

      // create a rotating write stream
      const accessLogStream = rfs('cause-fresh.log', {
        interval: '1d', // rotate daily
        path: logDirectory
      });
      // setup the logger
      serverInstance.use(logger('combined', {stream: accessLogStream}));
    } else {
      serverInstance.use(logger('dev'));
      serverInstance.use(errorHandler());
    }
  };


  const setPassport = () => {
    serverInstance.use(passport.initialize());
    // const passportConfig = passportConfiguration;
  };

  return {
    setEnvVariables : setEnvVariables,
    initExpressUtilities: initExpressUtilities
  };
};

module.exports = registerServerHandlers;
