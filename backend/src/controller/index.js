import express from 'express';
import { version } from '../../package.json';
import user from './user';

const api = express.Router();

api.get('/', (req, res) => {
  res.json({ version });
});

api.use('/user', user);

export default api;
