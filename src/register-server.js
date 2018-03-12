import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import passport from 'passport';
import expressValidator from 'express-validator';
import compression from 'compression';
import expressStatusMonitor from 'express-status-monitor';
import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';
import express from 'express';
import lusca from 'lusca';
import boom from 'express-boom';
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
    serverInstance.use(boom());
    serverInstance.use(lusca.xssProtection(true));
    setLogger();
    // Use passport for OAuth
    setPassport();

    // Load Routes
    const loadRoutes = require('./express-routes');
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

export default registerServerHandlers;
