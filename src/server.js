const express = require('express');
const registerServer = require('./register-server');
const chalk = require('chalk');

const app = express();
const serverUtils = registerServer(app);

serverUtils.setEnvVariables(process.env.NODE_ENV);

serverUtils.initExpressUtilities();

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
