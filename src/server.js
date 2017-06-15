import express from 'express';
import Http from 'http';

import config from './config/environment';
import configExpress from './config/express';
import configRoutes from './routes';

console.log(config);

const { port, mail, env } = config;
const app = express();
const server = Http.createServer(app);

configExpress(app);
configRoutes(app);

server.listen(port);
server.on('listening', () => {
  console.log(`Express server listening on ${port}, in ${env} mode`);
  console.log(`mailaddress->${mail}\n`);
  console.log(`port->${port}`);
});
