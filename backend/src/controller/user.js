import express from 'express';
import service from '../service';

const router = express.Router();

router.get('/user-profile', async (req, res, next) => {
  res.send(await service.user.userProfile(req.headers));
});

router.get('/token', async (req, res, next) => {
  res.send(await service.user.token(req.headers));
});

router.post('/calculate-loan', async (req, res, next) => {
  res.send(await service.user.calculateLoan(req.headers, req.body));
});

router.get('/fetch-loan/:applicationId', async (req, res, next) => {
  res.send(await service.loan.fetchLoan(req.headers, req.params.applicationId));
});

export default router;
