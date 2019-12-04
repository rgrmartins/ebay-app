import { Router } from 'express';

import AlertController from './app/controllers/AlertController';

const routes = new Router();

routes.get('/', AlertController.index);
routes.post('/alerts', AlertController.store);

export default routes;
