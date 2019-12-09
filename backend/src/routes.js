import { Router } from 'express';

import AlertController from './app/controllers/AlertController';

const routes = new Router();

routes.get('/', AlertController.index);
routes.post('/alerts', AlertController.store);
routes.delete('/alerts/:id', AlertController.delete);
routes.put('/alerts/:id', AlertController.update);

export default routes;
