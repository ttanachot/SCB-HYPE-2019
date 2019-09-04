import http from 'http';
import cors from 'cors';
import express from 'express';
import compression from 'compression';
import controller from './controller';
import config from './config';
import bodyParser from './middleware/body-parser';

const app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(compression());
app.use(bodyParser(config));
app.use('/api', controller);

app.server.listen(config.port, () => {
  console.log(`Server is started at ${app.server.address().port} on ${new Date().toLocaleString()}`);
});

export default app;
