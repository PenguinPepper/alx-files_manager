import { Router } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../ontrollers/AuthController';
import UsersController from '../controllers/UsersController';

const routes = Router();

routes.get('/status', AppController.getStatus);
routes.get('/stats', AppController.getStats);
routes.post('/users', UsersController.postNew);
routes.get('/connect', AuthController.getConnect);
routes.get('/disconnect', AuthController.getDisconnect);
routes.get('/users/me', UserController.getMe);

export default routes;
