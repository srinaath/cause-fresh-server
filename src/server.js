import express from 'express';
import registerServer from './register-server';
import chalk from 'chalk';
import registerServerHandlers from './register-server';
import path from 'path';

const app = express();
const serverUtils = registerServerHandlers(app);

serverUtils.setEnvVariables(process.env.NODE_ENV);

serverUtils.initExpressUtilities();
app.use('/', express.static('./public'));


app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
