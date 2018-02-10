global.__basePath = __dirname + '/src/';
import Hapi from 'hapi';
import inert from 'inert';
import path from 'path';
import registerServerHandler from './register-server';
const registerHandler = registerServerHandler();


registerHandler.setEnvVariables(process.env.NODE_ENV);

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, '/public')
      }
    }
  }
});

server.register(inert, (err) => {
  if (err) {
    throw err;
  }
});
server.connection({
  port: process.env.SERVER_PORT,
  routes: { log: true }
});

registerHandler.setServerObj(server);
registerHandler.initServer();

server.ext('onPreResponse',  (request, reply) => {
  if (request.getLog('appError').length > 0) {
    server.log(['error'], JSON.stringify(request.getLog('appError')[0].data));
  }
  reply.continue();
});

server.ext('onPostHandler', (request, reply) => {
  const response = request.response;
  if (response.output && response.output.statusCode === 404) {
    return reply.file(__dirname + '/public/index.html');
  }
  return reply.continue();
});

server.route(require('./routes'));

server.start( () => {
  console.log(`Starting server for cause watch ${process.env.SERVER_PORT}`);
});
