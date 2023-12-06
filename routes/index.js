import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import { Router } from 'express';
import express from 'express';

const router = Router();

router.use(express.json());
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', AuthController.getMe);

module.exports = router;
